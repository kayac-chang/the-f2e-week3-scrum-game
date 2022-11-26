import type {
  Application,
  DisplayObject,
  FederatedPointerEvent,
  ILineStyleOptions,
  ITextStyle,
  Renderer,
} from "pixi.js";
import { Assets } from "pixi.js";
import type { Falsy } from "@sindresorhus/is/dist/types";
import type { ColorStop } from "@pixi-essentials/gradients";
import { RenderTexture } from "pixi.js";
import { Text } from "pixi.js";
import { Sprite, Container, Graphics } from "pixi.js";
import is from "@sindresorhus/is";
import { isPercentage, parsePercentage } from "~/utils/percentage";
import invariant from "tiny-invariant";
import { GradientFactory } from "@pixi-essentials/gradients";

export interface Vec2<Value> {
  x: Value;
  y: Value;
}

export interface Rect<T> {
  width: T;
  height: T;
}

export interface Added<T> {
  onAdded?: (element: T, app: Application) => void;
}

export interface Interactive {
  interactive?: boolean;
  onPointerEnter?: (event: FederatedPointerEvent) => void;
  onPointerLeave?: (event: FederatedPointerEvent) => void;
}

export interface BaseEntity extends Interactive {
  name?: string;
  position?: Vec2<string | number>;
  anchor?: Vec2<number>;
  visible?: boolean;
}

export interface SpriteEntity extends BaseEntity {
  type: "sprite";
  texture: string;
  scale?: { x: number; y: number };
}

type DrawRect = Rect<string | number> & {
  type: "rect";
};

type DrawRoundedRect = Rect<string | number> & {
  type: "rounded-rect";
  radii: number;
};

type Fill = { type?: "fill"; color: number; alpha: number };
type TextureFill = {
  type: "texture";
  from: Vec2<number>;
  to: Vec2<number>;
  colors: ColorStop[];
};

interface Arrow {
  angle: number;
  radius: number;
}
type DrawArrow = {
  type: "arrow";
  from: Vec2<number>;
  to: Vec2<number>;
  arrow: Arrow;
};

export interface GraphicsEntity extends BaseEntity, Added<Graphics> {
  type: "graphics";
  fill?: Fill | TextureFill;
  line?: ILineStyleOptions;
  draw?: DrawRect | DrawRoundedRect | DrawArrow;
}

export interface TextEntity extends BaseEntity {
  type: "text";
  text: string;
  style?: Partial<ITextStyle>;
}

export interface ContainerEntity
  extends Omit<BaseEntity, "anchor">,
    Added<Container> {
  type: "container";
  children: (Entity | Falsy)[];
}

export type Entity =
  | ContainerEntity
  | SpriteEntity
  | GraphicsEntity
  | TextEntity;

export function createStage(app: Application) {
  return function traverse(entity: Entity): DisplayObject {
    if (entity.type === "container") {
      const obj = new Container();

      const position = processVec2(entity.position, app.screen);
      obj.position.set(position.x, position.y);

      if (entity.onAdded) {
        obj.addEventListener("added", () => entity.onAdded?.(obj, app));
      }

      const children = entity.children
        //
        .filter(Boolean)
        .map((entity) => {
          invariant(entity);
          return traverse(entity);
        });
      if (children.length) {
        obj.addChild(...children);
      }

      return processBase(obj, entity);
    }

    if (entity.type === "sprite") {
      const texture = Assets.get(entity.texture);
      invariant(texture, `Not found ${entity.texture} in assets cache.`);
      const obj = new Sprite(texture);

      if (entity.visible === false) {
        obj.visible = false;
      }

      const position = processVec2(entity.position, app.screen);
      obj.position.set(position.x, position.y);

      const anchor = processVec2(entity.anchor, app.screen);
      obj.anchor.set(anchor.x, anchor.y);

      if (entity.scale) {
        const scale = processVec2(entity.scale, app.screen);
        obj.scale.set(scale.x, scale.y);
      }

      return processBase(obj, entity);
    }

    if (entity.type === "graphics") {
      const obj = new Graphics();

      const position = processVec2(entity.position, app.screen);
      const anchor = processVec2(entity.anchor, app.screen);

      if (
        entity.fill?.type === "texture" &&
        (entity.draw?.type === "rect" || entity.draw?.type === "rounded-rect")
      ) {
        const { x: x0, y: y0 } = entity.fill.from;
        const { x: x1, y: y1 } = entity.fill.to;
        const colorStops = entity.fill.colors;
        const rect = processRect(entity.draw, app.screen);
        obj.beginTextureFill({
          texture: GradientFactory.createLinearGradient(
            app.renderer as Renderer,
            RenderTexture.create({ width: rect.width, height: rect.height }),
            { x0, y0, x1, y1, colorStops }
          ),
        });
      } else if (
        entity.fill &&
        (!entity.fill.type || entity.fill.type === "fill")
      ) {
        obj.beginFill(entity.fill.alpha, entity.fill.alpha);
      }

      if (entity.line) {
        obj.lineStyle(entity.line);
      }

      if (entity.draw?.type === "rect") {
        const rect = processRect(entity.draw, app.screen);
        obj.drawRect(0, 0, rect.width, rect.height);

        const x = position.x - anchor.x * rect.width;
        const y = position.y - anchor.y * rect.height;
        obj.position.set(x, y);
      }

      if (entity.draw?.type === "rounded-rect") {
        const rect = processRect(entity.draw, app.screen);
        obj.drawRoundedRect(0, 0, rect.width, rect.height, entity.draw.radii);

        const x = position.x - anchor.x * rect.width;
        const y = position.y - anchor.y * rect.height;
        obj.position.set(x, y);
      }

      if (entity.draw?.type === "arrow") {
        drawArrow(
          obj,
          entity.draw.from,
          entity.draw.to,
          entity.draw.arrow,
          entity.line
        );

        const x = position.x - anchor.x;
        const y = position.y - anchor.y;
        obj.position.set(x, y);
      }

      if (entity.onAdded) {
        obj.addEventListener("added", () => entity.onAdded?.(obj, app));
      }

      return processBase(obj, entity);
    }

    if (entity.type === "text") {
      const obj = new Text(entity.text, entity.style);

      const position = processVec2(entity.position, app.screen);
      obj.position.set(position.x, position.y);

      const anchor = processVec2(entity.anchor, app.screen);
      obj.anchor.set(anchor.x, anchor.y);

      return processBase(obj, entity);
    }

    throw new Error(`not support entity type`);
  };
}

function drawArrowHead(
  ref: Graphics,
  from: Vec2<number>,
  to: Vec2<number>,
  arrow: Arrow
) {
  const center = to;
  const line_angle = Math.atan2(to.y - from.y, to.x - from.x);

  ref.moveTo(center.x, center.y);

  for (const delta of [-1, 1]) {
    const angle = delta * -arrow.angle;
    const target = {
      x: center.x - Math.cos(line_angle + angle) * arrow.radius,
      y: center.y - Math.sin(line_angle + angle) * arrow.radius,
    };
    ref.lineTo(target.x, target.y);
    ref.moveTo(center.x, center.y);
  }

  return ref;
}

function drawArrow(
  ref: Graphics,
  from: Vec2<number>,
  to: Vec2<number>,
  arrow: Arrow,
  style?: ILineStyleOptions
) {
  ref.lineStyle(style).moveTo(from.x, from.y).lineTo(to.x, to.y);

  return drawArrowHead(ref, from, to, arrow);
}

function processBase(obj: DisplayObject, entity: BaseEntity) {
  if (entity.visible === false) {
    obj.visible = false;
  }

  if (entity.name) {
    obj.name = entity.name;
  }

  obj.interactive = Boolean(entity.interactive);
  if (entity.onPointerEnter) {
    obj.on("pointerenter", entity.onPointerEnter);
  }
  if (entity.onPointerLeave) {
    obj.on("pointerleave", entity.onPointerLeave);
  }

  return obj;
}

function processVec2(
  position: Vec2<string | number> | undefined,
  parent: Rect<number>
) {
  let x = 0;
  let y = 0;

  if (!position) return { x, y };

  if (isPercentage(position.x)) {
    x = parent.width * parsePercentage(position.x);
  }
  if (isPercentage(position.y)) {
    y = parent.height * parsePercentage(position.y);
  }

  if (is.number(position.x)) {
    x = position.x;
  }
  if (is.number(position.y)) {
    y = position.y;
  }

  return { x, y };
}

function processRect(
  rect: Rect<string | number> | undefined,
  parent: Rect<number>
) {
  let width = 0;
  let height = 0;

  if (!rect) return { width, height };

  if (isPercentage(rect.width)) {
    width = parent.width * parsePercentage(rect.width);
  }
  if (isPercentage(rect.height)) {
    height = parent.height * parsePercentage(rect.height);
  }

  if (is.number(rect.width)) {
    width = rect.width;
  }
  if (is.number(rect.height)) {
    height = rect.height;
  }

  return { width, height };
}
