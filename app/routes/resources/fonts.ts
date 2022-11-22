import { stylesheet } from "remix-utils";

interface FontFace {
  fontFamily: string;
  src: { url: string; format: string }[];
}
function fontFace(props: FontFace) {
  return `
    @font-face {
      font-family: ${props.fontFamily};
      src: ${props.src
        .map(({ url, format }) => `url(${url}) format('${format}')`)
        .join(",")};

  }`;
}

const fonts: FontFace[] = [
  {
    fontFamily: "Gen Jyuu Gothic P Regular",
    src: [
      {
        url: require("~/assets/fonts/Gen_Jyuu_Gothic_P_Regular.woff2"),
        format: "woff2",
      },
    ],
  },
];

export function loader() {
  return stylesheet(fonts.map(fontFace).join(" "));
}
