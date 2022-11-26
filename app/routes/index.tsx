import { Application, Assets } from "pixi.js";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import useCallbackRef from "~/hooks/useCallbackRef";
import { createStage } from "~/systems/render";
import FontFaceObserver from "fontfaceobserver";
import store from "~/systems/store";
import type { ResolverManifest, ResolverBundle } from "pixi.js";
import type { State } from "~/systems/store";
import type { Entity } from "~/systems/render";

import * as Start from "~/scenes/Start";
import * as Main from "~/scenes/Main";

export function loader() {
  return json({
    bundles: [
      {
        name: "shared",
        assets: [
          // button
          {
            name: "btn_back",
            srcs: require("~/assets/start/btn_back.png"),
          },
          {
            name: "btn_front",
            srcs: require("~/assets/start/btn_front.png"),
          },
        ],
      },
      Start.bundle,
      Main.bundle,
    ],
  } as ResolverManifest);
}

export default function Index() {
  const manifest = useLoaderData<typeof loader>();

  const ref = useCallbackRef((ref: HTMLDivElement | null) => {
    if (!ref) return;

    let app: Application | undefined;

    Promise.resolve()
      .then(() => {
        // load
        Assets.init({ manifest });
        Assets.backgroundLoadBundle([
          "shared",
          Start.bundle.name,
          Main.bundle.name,
        ]);

        const font = new FontFaceObserver("Gen Jyuu Gothic P Regular");
        return font.load();
      })
      .then(() => Assets.loadBundle("shared"))
      .then(() => {
        // application
        app = new Application({ resizeTo: ref });
        ref.appendChild(app.view as HTMLCanvasElement);
        return app;
      })
      .then((app) => {
        interface Scene {
          bundle?: ResolverBundle;
          entities: Entity;
          create?: (app: Application) => void;
        }
        const routes: Record<string, Scene> = {
          Start,
          Main,
        };
        const loaded = new Map();

        async function init({ current }: State) {
          if (!(current in routes)) return;

          const module = routes[current];
          app.stage.removeChildren();

          if (!loaded.has(module.bundle) && module.bundle) {
            const assets = await Assets.loadBundle(module.bundle.name);
            loaded.set(module.bundle, assets);
          }

          const traverse = createStage(app);

          app.stage.addChild(traverse(module.entities));

          requestAnimationFrame(() => {
            module.create?.(app);
          });
        }

        store.on("router/change", init);
      })
      .then(() => {
        store.dispatch("router/nav", "Main");
      });

    // resize
    const resize = () => {
      if (!app) return;
      app.resize();
      app.renderer.render(app.stage);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <div className="root" ref={ref} />;
}
