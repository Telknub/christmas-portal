import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";
import { populateOrders } from "./deliver";

export type SkipOrderAction = {
  type: "order.skipped";
  id: string;
};

type Options = {
  state: Readonly<GameState>;
  action: SkipOrderAction;
  createdAt?: number;
};

export function skipOrder({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const game = cloneDeep(state);

  const order = game.delivery.orders.find((order) => order.id === action.id);

  if (!order) throw new Error(`Order ${action.id} not found`);

  const skippedAt = game.delivery.skippedAt ?? 0;

  if (createdAt - skippedAt < 24 * 60 * 60 * 1000) {
    throw new Error(
      `Order skipped within 24 hours; time now ${createdAt}, time of last skip ${skippedAt}`
    );
  }

  game.delivery.orders = game.delivery.orders.filter(
    (order) => order.id !== action.id
  );

  game.delivery.orders = populateOrders(game, createdAt, true);

  game.delivery.skippedAt = createdAt;
  game.delivery.skippedCount = game.delivery.skippedCount ?? 0 + 1;

  return game;
}
