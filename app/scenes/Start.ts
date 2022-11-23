import type { Application, Container } from "pixi.js";
import type { Entity, Vec2 } from "~/systems/render";
import gsap from "gsap";

type ButtonProps = {
  name?: string;
  position?: Vec2<string | number>;
  text: string;
};
function Button(props: ButtonProps): Entity {
  return {
    type: "container",
    name: props.name,
    position: props.position,
    interactive: true,
    onPointerEnter: ({ currentTarget }) => {
      const enter = currentTarget as Container;
      const front = enter.getChildByName("btn_front");
      const text = enter.getChildByName("text");

      gsap.to(front, { y: 4 });
      gsap.to(text, { y: 4 });
    },
    onPointerLeave: ({ currentTarget }) => {
      const enter = currentTarget as Container;
      const front = enter.getChildByName("btn_front");
      const text = enter.getChildByName("text");

      gsap.to(front, { y: 0 });
      gsap.to(text, { y: 0 });
    },
    children: [
      {
        type: "sprite",
        name: "btn_back",
        texture: "btn_back",
        position: { x: 0, y: 6 },
        anchor: { x: 0.5, y: 0.5 },
      },
      {
        type: "sprite",
        name: "btn_front",
        texture: "btn_front",
        anchor: { x: 0.5, y: 0.5 },
      },

      {
        type: "text",
        name: "text",
        text: props.text,
        style: {
          fill: 0xffffff,
          fontSize: 20,
          fontWeight: "700",
          fontFamily: "Gen Jyuu Gothic P Regular",
        },
        anchor: { x: 0.5, y: 0.5 },
      },
    ],
  };
}

export const bundle = "game-screen";

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
          text: "© 2022 The F2E | UI Design - EG | F2E - OOO",
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
          text: "深入敏捷の村一探究竟",
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
          text: "進入村莊",
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
        {
          type: "text",
          text: "（謎之音）",
          style: {
            fill: 0x0a0d14,
            fontSize: 24,
            fontFamily: "Gen Jyuu Gothic P Regular",
          },
          position: { x: -380, y: -150 },
          anchor: { x: 0.5, y: 0.5 },
        },
        {
          type: "container",
          position: { x: -360, y: -70 },
          children: [
            {
              type: "text",
              text: `呦呼 ， 歡迎進入`,
              style: {
                fill: 0xffffff,
                fontSize: 24,
                fontFamily: "Gen Jyuu Gothic P Regular",
              },
            },
            {
              type: "text",
              text: `「SCRUM 新手村」`,
              style: {
                fill: 0x00ffe0,
                fontSize: 24,
                fontFamily: "Gen Jyuu Gothic P Regular",
              },
              position: { x: 170, y: 0 },
            },
            {
              type: "text",
              text: `， 在正式加入專案開發之前 ，`,
              style: {
                fill: 0xffffff,
                fontSize: 24,
                fontFamily: "Gen Jyuu Gothic P Regular",
              },
              position: { x: 360, y: 0 },
            },
            {
              type: "text",
              text: `需要請你先了解 Scrum 的流程與精神 ！`,
              style: {
                fill: 0xffffff,
                fontSize: 24,
                fontFamily: "Gen Jyuu Gothic P Regular",
              },
              position: { x: 0, y: 24 * 1.75 },
            },
            {
              type: "text",
              text: `請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～`,
              style: {
                fill: 0xffffff,
                fontSize: 24,
                fontFamily: "Gen Jyuu Gothic P Regular",
              },
              position: { x: 0, y: 24 * 1.75 * 3 },
            },
          ],
        },

        // button
        Button({
          position: { x: 0, y: 280 },
          name: "accept",
          text: `接受挑戰`,
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
