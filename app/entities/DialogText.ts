import type { TextEntity, Vec2 } from "~/systems/render";

const colors = {
  white: 0xffffff,
  blue: 0x00ffe0,
  dark: 0x0a0d14,
} as const;

type Props = {
  text: string;
  color: keyof typeof colors;
  position?: Vec2<string | number>;
  anchor?: Vec2<number>;
  fontSize?: number;
};
function DialogText(props: Props): TextEntity {
  return {
    type: "text",
    text: props.text,
    style: {
      fill: colors[props.color],
      fontSize: props.fontSize || 24,
      fontFamily: "Gen Jyuu Gothic P Regular",
    },
    position: props.position,
    anchor: props.anchor,
  };
}

export default DialogText;
