import { Application, Assets } from "pixi.js";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import useCallbackRef from "~/hooks/useCallbackRef";
import { createStage } from "~/systems/render";
import type { ResolverManifest } from "pixi.js";
import FontFaceObserver from "fontfaceobserver";

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
      .then((app) =>
        import("~/scenes/Start")
          //
          .then(async (module) => {
            const assets = await module.load();

            const traverse = createStage(app, assets);

            app.stage.addChild(traverse(module.entities));
          })
      );

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
