import type { Entity, Vec2 } from "~/systems/render";

type DialogProps = {
  name?: string;
  position?: Vec2<string | number>;
  visible?: boolean;
  children?: Entity[];
};
function Dialog(props: DialogProps): Entity {
  return {
    type: "container",
    name: props.name,
    visible: props.visible,
    position: props.position,
    children: [
      {
        type: "graphics",
        fill: { color: 0x000, alpha: 0.5 },
        draw: {
          type: "rounded-rect",
          width: 990,
          height: 224,
          radii: 40,
        },
        position: { x: 5, y: 0 },
        anchor: { x: 0.5, y: 0.5 },
      },
      {
        type: "sprite",
        texture: "dialog_sm",
        anchor: { x: 0.5, y: 0.5 },
      },
      {
        type: "sprite",
        texture: "ic_continue_po",
        position: { x: 440, y: 50 },
      },
      ...(props.children || []),
    ],
  };
}
export default Dialog;
