import type { Application, Container } from "pixi.js";
import type { Entity } from "~/systems/render";
import gsap from "gsap";
import DialogText from "~/entities/DialogText";
import Button from "~/entities/Button";

export const bundle = {
  name: "start",
  assets: [
    // background
    {
      name: "bg_leafDark_1_l",
      srcs: require("~/assets/start/bg_leafDark_1_l.png"),
    },
    {
      name: "bg_leafDark_2_b",
      srcs: require("~/assets/start/bg_leafDark_2_b.png"),
    },
    {
      name: "bg_leafDark_3_r",
      srcs: require("~/assets/start/bg_leafDark_3_r.png"),
    },
    {
      name: "bg_leafDark_4_t",
      srcs: require("~/assets/start/bg_leafDark_4_t.png"),
    },
    {
      name: "bg_leafTint_1_lt",
      srcs: require("~/assets/start/bg_leafTint_1_lt.png"),
    },
    {
      name: "bg_leafTint_2_lb",
      srcs: require("~/assets/start/bg_leafTint_2_lb.png"),
    },
    {
      name: "bg_leafTint_3_t",
      srcs: require("~/assets/start/bg_leafTint_3_t.png"),
    },
    {
      name: "bg_leafTint_4_rb",
      srcs: require("~/assets/start/bg_leafTint_4_rb.png"),
    },

    // dot
    {
      name: "logo_dot_blue",
      srcs: require("~/assets/start/logo_dot_blue.png"),
    },
    {
      name: "logo_dot_purple",
      srcs: require("~/assets/start/logo_dot_purple.png"),
    },
    {
      name: "logo_dot_red",
      srcs: require("~/assets/start/logo_dot_red.png"),
    },
    {
      name: "logo_dot_yellow",
      srcs: require("~/assets/start/logo_dot_yellow.png"),
    },

    // logo
    {
      name: "logo_hole_txt",
      srcs: require("~/assets/start/logo_hole_txt.png"),
    },

    // dialog
    {
      name: "dialog_lg",
      srcs: require("~/assets/start/dialog_lg.png"),
    },
  ],
};

export const entities: Entity = {
  type: "container",
  children: [
    // background
    {
      type: "container",
      children: [
        {
          type: "sprite",
          name: "leaf-b-1",
          texture: "bg_leafDark_4_t",
          position: { x: "50%", y: 0 },
          anchor: { x: 0.5, y: 0 },
        },
        {
          type: "sprite",
          name: "leaf-b-2",
          texture: "bg_leafDark_3_r",
          position: { x: "100%", y: 0 },
          anchor: { x: 1, y: 0 },
        },
        {
          type: "sprite",
          name: "leaf-b-3",
          texture: "bg_leafDark_2_b",
          position: { x: "50%", y: "100%" },
          anchor: { x: 0.5, y: 1 },
        },
        {
          type: "sprite",
          name: "leaf-b-4",
          texture: "bg_leafDark_1_l",
          position: { x: 0, y: "50%" },
          anchor: { x: 0, y: 0.5 },
        },

        {
          type: "sprite",
          name: "leaf-1",
          texture: "bg_leafTint_4_rb",
          position: { x: "100%", y: "100%" },
          anchor: { x: 1, y: 1 },
        },
        {
          type: "sprite",
          name: "leaf-2",
          texture: "bg_leafTint_3_t",
          position: { x: "60%", y: 0 },
          anchor: { x: 0.5, y: 0 },
        },
        {
          type: "sprite",
          name: "leaf-3",
          texture: "bg_leafTint_2_lb",
          position: { x: 0, y: "100%" },
          anchor: { x: 0, y: 1 },
        },
        {
          type: "sprite",
          name: "leaf-4",
          texture: "bg_leafTint_1_lt",
          position: { x: 0, y: 0 },
          anchor: { x: 0, y: 0 },
        },
      ],
    },
    // footer
    {
      type: "container",
      children: [
        {
          type: "graphics",
          fill: { color: 0x00000, alpha: 0.8 },
          position: { x: 0, y: "100%" },
          anchor: { x: 0, y: 1 },
          draw: { type: "rect", width: "100%", height: 44 },
        },
        {
          type: "text",
          text: "?? 2022 The F2E | UI Design - EG | F2E - OOO",
          style: {
            fill: 0x008d96,
            fontSize: 14,
            fontWeight: "700",
            fontFamily: "Gen Jyuu Gothic P Regular",
          },
          position: { x: "50%", y: "98%" },
          anchor: { x: 0.5, y: 0.5 },
        },
      ],
    },
    // logo
    {
      type: "container",
      name: "logo",
      position: { x: "50%", y: "50%" },
      children: [
        {
          type: "sprite",
          texture: "logo_hole_txt",
          position: { x: 0, y: -100 },
          anchor: { x: 0.5, y: 0.5 },
        },

        // dots
        {
          type: "sprite",
          texture: "logo_dot_blue",
          position: { x: 0, y: 70 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_blue",
          position: { x: 130, y: 120 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_blue",
          position: { x: -180, y: 75 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_blue",
          position: { x: 210, y: -40 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_blue",
          position: { x: -240, y: -160 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_red",
          position: { x: -420, y: -120 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_red",
          position: { x: 360, y: -230 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_purple",
          position: { x: 450, y: -200 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_purple",
          position: { x: -320, y: -270 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_yellow",
          position: { x: -320, y: -80 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "logo_dot_yellow",
          position: { x: 340, y: -100 },
          anchor: { x: 0.5, y: 0.5 },
        },

        // title
        {
          type: "text",
          text: "??????????????????????????????",
          style: {
            fill: 0xffffff,
            fontSize: 32,
            fontWeight: "700",
            fontFamily: "Gen Jyuu Gothic P Regular",
          },
          position: { x: 0, y: 80 },
          anchor: { x: 0.5, y: 0.5 },
        },

        // button
        Button({
          name: "enter",
          position: { x: 0, y: 150 },
          text: "????????????",
        }),
      ],
    },

    // dialog
    {
      type: "container",
      name: "dialog",
      visible: false,
      position: { x: "50%", y: "40%" },
      children: [
        {
          type: "graphics",
          fill: { color: 0x000, alpha: 0.5 },
          draw: { type: "rounded-rect", width: 903, height: 430, radii: 80 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "dialog_lg",
          anchor: { x: 0.5, y: 0.5 },
        },
        DialogText({
          text: "???????????????",
          color: "dark",
          position: { x: -380, y: -150 },
          anchor: { x: 0.5, y: 0.5 },
        }),
        {
          type: "container",
          position: { x: -360, y: -70 },
          children: [
            DialogText({
              text: `?????? ??? ????????????`,
              color: "white",
            }),
            DialogText({
              text: `???SCRUM ????????????`,
              color: "blue",
              position: { x: 170, y: 0 },
            }),
            DialogText({
              text: `??? ????????????????????????????????? ???`,
              color: "white",
              position: { x: 360, y: 0 },
            }),
            DialogText({
              text: `????????????????????? Scrum ?????????????????? ???`,
              color: "white",
              position: { x: 0, y: 24 * 1.75 },
            }),
            DialogText({
              text: `????????????????????? ??? ???????????? Scrum ??????????????????????????????`,
              color: "white",
              position: { x: 0, y: 24 * 1.75 * 3 },
            }),
          ],
        },

        // button
        Button({
          position: { x: 0, y: 280 },
          name: "accept",
          text: `????????????`,
        }),
      ],
    },
  ],
};

export function create(app: Application) {
  const dialog = app.stage.getChildByName("dialog", true);
  const logo = app.stage.getChildByName("logo", true);

  const enter = app.stage.getChildByName<Container>("enter", true);
  enter.addEventListener("click", () => {
    const leaf1 = app.stage.getChildByName("leaf-1", true);
    const leaf2 = app.stage.getChildByName("leaf-2", true);
    const leaf3 = app.stage.getChildByName("leaf-3", true);
    const leaf4 = app.stage.getChildByName("leaf-4", true);

    const offset = 600;
    gsap
      .timeline()
      .to(logo, { alpha: 0, duration: 0.3 })
      .add(
        gsap
          .timeline()
          .to(leaf1, { x: "+=" + offset, y: "+=" + offset }, "leaf")
          .to(leaf2, { y: "-=" + offset }, "leaf")
          .to(leaf3, { x: "-=" + offset, y: "+=" + offset }, "leaf")
          .to(leaf4, { x: "-=" + offset, y: "-=" + offset }, "leaf")
          .duration(1),
        "<0.5"
      )
      .fromTo(dialog, { alpha: 0, visible: true }, { alpha: 1, duration: 0.3 });
  });

  const accept = app.stage.getChildByName<Container>("accept", true);
  accept.addEventListener("click", () => {
    const leaf1 = app.stage.getChildByName("leaf-b-1", true);
    const leaf2 = app.stage.getChildByName("leaf-b-2", true);
    const leaf3 = app.stage.getChildByName("leaf-b-3", true);
    const leaf4 = app.stage.getChildByName("leaf-b-4", true);

    const offset = 800;

    gsap
      .timeline()
      .to(dialog, { alpha: 0, duration: 0.3 })
      .add(
        gsap
          .timeline()
          .to(leaf1, { y: "-=" + offset }, "leaf")
          .to(leaf2, { x: "+=" + offset }, "leaf")
          .to(leaf3, { y: "+=" + offset }, "leaf")
          .to(leaf4, { x: "-=" + offset }, "leaf")
          .duration(1),
        "<0.5"
      );
  });
}
