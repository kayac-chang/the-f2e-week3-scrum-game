import { Application, Assets } from "pixi.js";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import useCallbackRef from "~/hooks/useCallbackRef";
import { createStage } from "~/systems/render";
import FontFaceObserver from "fontfaceobserver";
import store from "~/systems/store";
import type { ResolverManifest } from "pixi.js";
import type { State } from "~/systems/store";
import type { Entity } from "~/systems/render";

import * as Start from "~/scenes/Start";

export function loader() {
  return json({
    bundles: [
      {
        name: "game-screen",
        assets: [
          // background
          {
            name: "bg_leafDark_1_l",
            srcs: require("~/assets/game-screen/bg_leafDark_1_l.png"),
          },
          {
            name: "bg_leafDark_2_b",
            srcs: require("~/assets/game-screen/bg_leafDark_2_b.png"),
          },
          {
            name: "bg_leafDark_3_r",
            srcs: require("~/assets/game-screen/bg_leafDark_3_r.png"),
          },
          {
            name: "bg_leafDark_4_t",
            srcs: require("~/assets/game-screen/bg_leafDark_4_t.png"),
          },
          {
            name: "bg_leafTint_1_lt",
            srcs: require("~/assets/game-screen/bg_leafTint_1_lt.png"),
          },
          {
            name: "bg_leafTint_2_lb",
            srcs: require("~/assets/game-screen/bg_leafTint_2_lb.png"),
          },
          {
            name: "bg_leafTint_3_t",
            srcs: require("~/assets/game-screen/bg_leafTint_3_t.png"),
          },
          {
            name: "bg_leafTint_4_rb",
            srcs: require("~/assets/game-screen/bg_leafTint_4_rb.png"),
          },

          // dot
          {
            name: "logo_dot_blue",
            srcs: require("~/assets/game-screen/logo_dot_blue.png"),
          },
          {
            name: "logo_dot_purple",
            srcs: require("~/assets/game-screen/logo_dot_purple.png"),
          },
          {
            name: "logo_dot_red",
            srcs: require("~/assets/game-screen/logo_dot_red.png"),
          },
          {
            name: "logo_dot_yellow",
            srcs: require("~/assets/game-screen/logo_dot_yellow.png"),
          },

          // logo
          {
            name: "logo_hole_txt",
            srcs: require("~/assets/game-screen/logo_hole_txt.png"),
          },

          // button
          {
            name: "btn_back",
            srcs: require("~/assets/game-screen/btn_back.png"),
          },
          {
            name: "btn_front",
            srcs: require("~/assets/game-screen/btn_front.png"),
          },
        ],
      },
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
        Assets.backgroundLoadBundle(["game-screen"]);

        const font = new FontFaceObserver("Gen Jyuu Gothic P Regular");
        return font.load();
      })
      .then(() => {
        // application
        app = new Application({ resizeTo: ref });
        ref.appendChild(app.view as HTMLCanvasElement);
        return app;
      })
      .then((app) => {
        interface Scene {
          bundle: string;
          entities: Entity;
        }
        const routes: Record<string, Scene> = {
          Start,
        };
        const loaded = new Map();

        const init = async ({ current }: State) => {
          if (!(current in routes)) return;

          const module = routes[current];
          app.stage.removeChildren();

          if (!loaded.has(module.bundle)) {
            const assets = await Assets.loadBundle(module.bundle);
            loaded.set(module.bundle, assets);
          }

          const assets = loaded.get(module.bundle);
          const traverse = createStage(app, assets);

          app.stage.addChild(traverse(module.entities));
        };

        store.on("router/change", init);
      })
      .then(() => {
        store.dispatch("router/nav", "Start");
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
