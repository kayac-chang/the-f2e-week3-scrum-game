import type { Application, DisplayObject, Container } from "pixi.js";
import { LINE_CAP } from "pixi.js";
import type { Entity, Vec2 } from "~/systems/render";
import Dialog from "~/entities/Dialog";
import DialogText from "~/entities/DialogText";
import Role from "~/entities/Role";
import Button from "~/entities/Button";

type ItemProps = {
  position: Vec2<string | number>;
  width: number;
  height: number;
  radii: number;
  border: number;
  children?: Entity[];
};
function Item(props: ItemProps): Entity {
  return {
    type: "container",
    position: props.position,
    children: [
      {
        type: "graphics",
        fill: { color: 0x000, alpha: 0.5 },
        anchor: { x: 0.5, y: 0.5 },
        draw: {
          type: "rounded-rect",
          width: props.width,
          height: props.height,
          radii: props.radii,
        },
      },
      {
        type: "graphics",
        line: { color: 0x00ffe0, width: props.border },
        anchor: { x: 0.5, y: 0.5 },
        draw: {
          type: "rounded-rect",
          width: props.width,
          height: props.height,
          radii: props.radii,
        },
      },
      {
        type: "container",
        position: {
          x: (-1 * props.width) / 2 + 16,
          y: (-1 * props.height) / 2 + 14,
        },
        children: props.children || [],
      },
    ],
  };
}

export const bundle = {
  name: "main",
  assets: [
    // background
    {
      name: "bg_village",
      srcs: require("~/assets/main/bg_village.png"),
    },

    // hole
    {
      name: "hole",
      srcs: require("~/assets/main/hole.png"),
    },

    // role
    {
      name: "role_po",
      srcs: require("~/assets/main/role_po.png"),
    },
    {
      name: "role_sm",
      srcs: require("~/assets/main/role_sm.png"),
    },
    {
      name: "role_team1",
      srcs: require("~/assets/main/role_team1.png"),
    },
    {
      name: "role_team2",
      srcs: require("~/assets/main/role_team2.png"),
    },

    // role light
    {
      name: "role_po_light",
      srcs: require("~/assets/main/role_po_light.png"),
    },
    {
      name: "role_sm_light",
      srcs: require("~/assets/main/role_sm_light.png"),
    },
    {
      name: "role_team1_light",
      srcs: require("~/assets/main/role_team1_light.png"),
    },
    {
      name: "role_team2_light",
      srcs: require("~/assets/main/role_team2_light.png"),
    },

    // dialog
    {
      name: "dialog_sm",
      srcs: require("~/assets/main/dialog_sm.png"),
    },

    // continue
    {
      name: "ic_continue_po",
      srcs: require("~/assets/main/ic_continue_po.png"),
    },
    {
      name: "ic_continue_sm",
      srcs: require("~/assets/main/ic_continue_sm.png"),
    },
    {
      name: "ic_continue_team1",
      srcs: require("~/assets/main/ic_continue_team1.png"),
    },
    {
      name: "ic_continue_team2",
      srcs: require("~/assets/main/ic_continue_team2.png"),
    },

    // JIRA
    {
      name: "jira_w",
      srcs: require("~/assets/main/jira_w.png"),
    },

    // list
    {
      name: "list",
      srcs: require("~/assets/main/list.png"),
    },

    // hand
    {
      name: "hand-finger",
      srcs: require("~/assets/main/hand-finger.png"),
    },
  ],
};

export const entities: Entity = {
  type: "container",
  children: [
    // background
    {
      type: "sprite",
      texture: "bg_village",
    },

    // dialog top
    {
      type: "container",
      position: { x: 200, y: 40 },
      children: [
        // role
        Role(),

        // dialog
        Dialog({
          name: "dialog",
          position: { x: 700, y: 110 },
          children: [
            // first
            {
              type: "container",
              name: "first",
              visible: false,
              position: { x: -400, y: -70 },
              children: [
                DialogText({
                  text: `\\ 碰 /`,
                  color: "blue",
                  fontSize: 20,
                }),
                DialogText({
                  text: `我是短衝小精靈 ， 開發 A 組的 PO 。`,
                  color: "white",
                  position: { x: 24 * 2 + 5, y: 0 },
                  fontSize: 20,
                }),
                DialogText({
                  text: `PO 也就是產品負責人（Product Owner）`,
                  color: "blue",
                  position: { x: 0, y: 24 * 1.75 * 1 },
                  fontSize: 20,
                }),
                DialogText({
                  text: `，產品負責人會負責評估產品待辦清單的價值`,
                  color: "white",
                  position: { x: 24 * 15, y: 24 * 1.75 * 1 },
                  fontSize: 20,
                }),
                DialogText({
                  text: `與重要性，依序排列要執行的優先順序，對齊產品目標。最後排出產品待辦清單`,
                  color: "white",
                  position: { x: 0, y: 24 * 1.75 * 2 },
                  fontSize: 20,
                }),
                DialogText({
                  text: `（Product Backlog）唷！`,
                  color: "white",
                  position: { x: 0, y: 24 * 1.75 * 3 },
                  fontSize: 20,
                }),
              ],
            },

            // second
            {
              type: "container",
              name: "second",
              visible: false,
              position: { x: -400, y: -70 },
              children: [
                DialogText({
                  text: `剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了 `,
                  color: "white",
                  fontSize: 20,
                }),
                DialogText({
                  text: `「 產品需求清單 」`,
                  color: "blue",
                  fontSize: 20,
                  position: { x: 24 * 23.5, y: 0 },
                }),
                DialogText({
                  text: `。`,
                  color: "white",
                  fontSize: 20,
                  position: { x: 24 * 30, y: 0 },
                }),
                DialogText({
                  text: `既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！`,
                  color: "white",
                  fontSize: 20,
                  position: { x: 0, y: 24 * 1.75 },
                }),
              ],
            },

            // third
            {
              type: "container",
              name: "third",
              visible: true,
              position: { x: -400, y: -70 },
              children: [
                DialogText({
                  text: `在這階段我們要把需求放進產品待辦清單 ， 並調整其優先順序 。`,
                  color: "white",
                  fontSize: 20,
                }),
                DialogText({
                  text: `對了 ！ 我們公司也推薦使用 `,
                  color: "white",
                  fontSize: 20,
                  position: { x: 0, y: 24 * 1.75 },
                }),
                {
                  type: "sprite",
                  texture: "jira_w",
                  scale: { x: 0.5, y: 0.5 },
                  position: { x: 24 * 10.5, y: 24 * 1 },
                },
                DialogText({
                  text: `來做任務的管理呢 ！`,
                  color: "white",
                  fontSize: 20,
                  position: { x: 24 * 17, y: 24 * 1.75 },
                }),
              ],
            },
          ],
        }),
      ],
    },

    // todolist
    {
      type: "container",
      position: { x: "50%", y: "50%" },
      children: [
        {
          type: "sprite",
          texture: "list",
          anchor: { x: 0.5, y: 0.4 },
        },

        // item
        Item({
          // state 1
          position: { x: 500, y: 60 },
          width: 310,
          height: 50,

          // state 2
          // position: { x: -2, y: 268 },
          // width: 414,
          // height: 95,

          radii: 16,
          border: 4,
          children: [
            DialogText({
              text: "會員系統（登入、註冊、權限管理）",
              color: "white",
              fontSize: 20,
            }),
          ],
        }),

        Item({
          // state 1
          position: { x: 420, y: 200 },
          width: 210,
          height: 50,

          // state 2
          // position: { x: -2, y: -70 },
          // width: 414,
          // height: 95,

          radii: 16,
          border: 4,
          children: [
            DialogText({
              text: "前台職缺列表、應徵",
              color: "white",
              fontSize: 20,
            }),
          ],
        }),

        Item({
          // state 2
          position: { x: -2, y: -70 },
          width: 414,
          height: 95,

          radii: 16,
          border: 4,
          children: [
            DialogText({
              text: "前台職缺列表、應徵",
              color: "white",
              fontSize: 20,
            }),
          ],
        }),

        Item({
          // state 1
          position: { x: -440, y: 60 },
          width: 250,
          height: 50,

          // state 2
          // position: { x: -2, y: 42 },
          // width: 414,
          // height: 95,

          radii: 16,
          border: 4,
          children: [
            DialogText({
              text: "應徵者的線上履歷編輯器",
              color: "white",
              fontSize: 20,
            }),
          ],
        }),

        Item({
          // state 1
          position: { x: -480, y: 200 },
          width: 320,
          height: 100,

          // state 2
          // position: { x: -2, y: 154 },
          // width: 414,
          // height: 95,

          radii: 16,
          border: 4,
          children: [
            DialogText({
              text: "後台職缺管理功能（資訊上架、",
              color: "white",
              fontSize: 20,
            }),

            DialogText({
              text: "下架、顯示應徵者資料）",
              color: "white",
              fontSize: 20,
              position: { x: 0, y: 24 * 1.75 },
            }),
          ],
        }),

        // arrow
        {
          type: "graphics",
          position: { x: 320, y: 180 },
          line: {
            width: 5,
            color: 0xffffff,
            cap: LINE_CAP.ROUND,
          },
          draw: {
            type: "arrow",
            from: { x: 0, y: 0 },
            to: { x: -200, y: -200 },
            arrow: {
              angle: Math.PI / 6,
              radius: 20,
            },
          },
        },

        // hand
        {
          type: "sprite",
          texture: "hand-finger",
          position: { x: 70, y: -40 },
        },
      ],
    },

    //  click to continue
    {
      type: "container",
      visible: false,
      name: "click to continue",
      position: { x: "50%", y: "50%" },
      children: [
        {
          type: "graphics",
          line: { color: 0x00ffe0, width: 2 },
          anchor: { x: 0.5, y: 0.5 },
          draw: {
            type: "rounded-rect",
            width: 250,
            height: 50,
            radii: 20,
          },
        },
        DialogText({
          text: "點擊畫面任意處繼續",
          color: "blue",
          fontSize: 20,
          anchor: { x: 0.5, y: 0.5 },
        }),
      ],
    },

    // ready
    Button({
      name: "ready",
      visible: false,
      text: "準備好了",
      position: { x: 1310, y: 920 },
    }),
  ],
};

export function create(app: Application) {
  const click_to_continue = app.stage.getChildByName("click to continue", true);
  const dialog = app.stage.getChildByName("dialog", true) as Container;
  const ready = app.stage.getChildByName("ready", true) as DisplayObject;

  click_to_continue.interactive = true;
  click_to_continue.addEventListener("click", () => {
    const first = dialog.getChildByName("first") as DisplayObject;
    first.visible = false;

    const second = dialog.getChildByName("second") as DisplayObject;
    second.visible = true;

    click_to_continue.visible = false;
    ready.visible = true;
  });

  ready.addEventListener("click", () => {
    ready.visible = false;
    const second = dialog.getChildByName("second") as DisplayObject;
    second.visible = false;
  });
}
