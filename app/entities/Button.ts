import type { Container } from "pixi.js";
import type { BaseEntity, Entity } from "~/systems/render";
import gsap from "gsap";

type ButtonProps = BaseEntity & {
  text: string;
};
function Button(props: ButtonProps): Entity {
  return {
    ...props,
    type: "container",
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
export default Button;
