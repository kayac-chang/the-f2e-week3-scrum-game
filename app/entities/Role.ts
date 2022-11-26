import type { Entity } from "~/systems/render";

function Role(): Entity {
  return {
    type: "container",
    children: [
      {
        type: "sprite",
        texture: "hole",
        position: { x: 0, y: -10 },
        anchor: { x: 0.5, y: 0 },
      },
      {
        type: "sprite",
        texture: "role_po_light",
        anchor: { x: 0.5, y: 0 },
      },
      {
        type: "sprite",
        texture: "role_po",
        anchor: { x: 0.5, y: 0 },
      },
    ],
  };
}
export default Role;
