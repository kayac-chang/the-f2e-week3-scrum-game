import type { StoreonStore } from "storeon";

export interface State {
  current: string;
}
export interface Events {
  "router/change": undefined;
  "router/nav": string;
}

function router(store: StoreonStore<State, Events>) {
  store.on("@init", () => ({ current: "" }));

  store.on("router/nav", (_, path) => ({ current: path }));

  store.on("@changed", () => store.dispatch("router/change"));
}

export default router;
