import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";

import router from "~/systems/router";
import type * as Router from "~/systems/router";

export type State = Router.State;
export type Events = Router.Events;

const store = createStoreon<State, Events>([
  process.env.NODE_ENV !== "production" && storeonLogger,
  router,
]);

export default store;
