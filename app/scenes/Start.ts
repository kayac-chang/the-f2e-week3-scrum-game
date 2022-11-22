import { Assets } from "pixi.js";
import type { Entity } from "~/systems/render";

export function load() {
  return Assets.loadBundle("game-screen");
}

export const entities: Entity = {
  type: "container",
  children: [
    // background
    {
      type: "container",
      children: [
        {
          type: "sprite",
          texture: "bg_leafDark_4_t",
          position: { x: "50%", y: 0 },
          anchor: { x: 0.5, y: 0 },
        },
        {
          type: "sprite",
          texture: "bg_leafDark_3_r",
          position: { x: "100%", y: 0 },
          anchor: { x: 1, y: 0 },
        },
        {
          type: "sprite",
          texture: "bg_leafDark_2_b",
          position: { x: "50%", y: "100%" },
          anchor: { x: 0.5, y: 1 },
        },
        {
          type: "sprite",
          texture: "bg_leafDark_1_l",
          position: { x: 0, y: "50%" },
          anchor: { x: 0, y: 0.5 },
        },
        {
          type: "sprite",
          texture: "bg_leafTint_4_rb",
          position: { x: "100%", y: "100%" },
          anchor: { x: 1, y: 1 },
        },
        {
          type: "sprite",
          texture: "bg_leafTint_3_t",
          position: { x: "60%", y: 0 },
          anchor: { x: 0.5, y: 0 },
        },
        {
          type: "sprite",
          texture: "bg_leafTint_2_lb",
          position: { x: 0, y: "100%" },
          anchor: { x: 0, y: 1 },
        },
        {
          type: "sprite",
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
        {
          type: "container",
          position: { x: 0, y: 170 },
          children: [
            {
              type: "sprite",
              texture: "btn_back",
              position: { x: 0, y: 6 },
              anchor: { x: 0.5, y: 0.5 },
            },
            {
              type: "sprite",
              texture: "btn_front",
              anchor: { x: 0.5, y: 0.5 },
            },
            {
              type: "text",
              text: "進入村莊",
              style: {
                fill: 0xffffff,
                fontSize: 20,
                fontWeight: "700",
                fontFamily: "Gen Jyuu Gothic P Regular",
              },
              anchor: { x: 0.5, y: 0.5 },
            },
          ],
        },
      ],
    },
  ],
};
