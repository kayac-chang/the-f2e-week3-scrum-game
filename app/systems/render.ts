import type {
  Application,
  DisplayObject,
  FederatedPointerEvent,
  ITextStyle,
} from "pixi.js";
import { Text } from "pixi.js";
import { Sprite, Container, Graphics } from "pixi.js";
import is from "@sindresorhus/is";
import { isPercentage, parsePercentage } from "~/utils/percentage";

export interface Vec2<Value> {
  x: Value;
  y: Value;
}

export interface Rect<T> {
  width: T;
  height: T;
}

interface Interaction {
  onClick?: (event: FederatedPointerEvent) => void;
}

interface BaseEntity extends Interaction {
  position?: Vec2<string | number>;
  anchor?: Vec2<number>;
  visible?: boolean;
}

export interface SpriteEntity extends BaseEntity {
  type: "sprite";
  texture: string;
}

type DrawRect = Rect<string | number> & {
  type: "rect";
};

type DrawRoundedRect = Rect<string | number> & {
  type: "rounded-rect";
  radii: number;
};

export interface GraphicsEntity extends BaseEntity {
  type: "graphics";
  fill: { color: number; alpha: number };
  draw: DrawRect | DrawRoundedRect;
}

export interface TextEntity extends BaseEntity {
  type: "text";
  text: string;
  style?: Partial<ITextStyle>;
}

export interface ContainerEntity extends Omit<BaseEntity, "anchor"> {
  type: "container";
  children: Entity[];
}

export type Entity =
  | ContainerEntity
  | SpriteEntity
  | GraphicsEntity
  | TextEntity;

export function createStage(app: Application, assets: any) {
  return function traverse(entity: Entity): DisplayObject {
    if (entity.type === "container") {
      const obj = new Container();

      const position = processVec2(entity.position, app.screen);
      obj.position.set(position.x, position.y);

      if (entity.onClick) {
        obj.interactive = true;
        obj.on("click", entity.onClick);
      }

      if (entity.visible === false) {
        obj.visible = false;
      }

      obj.addChild(...entity.children.map(traverse));

      return obj;
    }

    if (entity.type === "sprite") {
      const obj = new Sprite(assets[entity.texture]);

      if (entity.visible === false) {
        obj.visible = false;
      }

      const position = processVec2(entity.position, app.screen);
      obj.position.set(position.x, position.y);

      const anchor = processVec2(entity.anchor, app.screen);
      obj.anchor.set(anchor.x, anchor.y);

      return obj;
    }

    if (entity.type === "graphics") {
      const obj = new Graphics();

      if (entity.visible === false) {
        obj.visible = false;
      }

      obj.beginFill(entity.fill.alpha, entity.fill.alpha);

      const position = processVec2(entity.position, app.screen);
      const anchor = processVec2(entity.anchor, app.screen);

      if (entity.draw.type === "rect") {
        const rect = processRect(entity.draw, app.screen);
        const x = position.x - anchor.x * rect.width;
        const y = position.y - anchor.y * rect.height;
        obj.drawRect(x, y, rect.width, rect.height);
      }

      if (entity.draw.type === "rounded-rect") {
        const rect = processRect(entity.draw, app.screen);
        const x = position.x - anchor.x * rect.width;
        const y = position.y - anchor.y * rect.height;
        obj.drawRoundedRect(x, y, rect.width, rect.height, entity.draw.radii);
      }

      return obj;
    }

    if (entity.type === "text") {
      const obj = new Text(entity.text, entity.style);

      if (entity.visible === false) {
        obj.visible = false;
      }

      const position = processVec2(entity.position, app.screen);
      obj.position.set(position.x, position.y);

      const anchor = processVec2(entity.anchor, app.screen);
      obj.anchor.set(anchor.x, anchor.y);
      return obj;
    }

    throw new Error(`not support entity type`);
  };
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
