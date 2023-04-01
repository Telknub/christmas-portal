import Decimal from "decimal.js-light";
import { canMine } from "features/game/expansion/lib/utils";
import { GOLD_RECOVERY_TIME } from "features/game/lib/constants";
import { trackActivity } from "features/game/types/bumpkinActivity";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type LandExpansionMineGoldAction = {
  type: "goldRock.mined";
  index: string;
};

type Options = {
  state: Readonly<GameState>;
  action: LandExpansionMineGoldAction;
  createdAt?: number;
};

export enum EVENT_ERRORS {
  NO_PICKAXES = "No iron pickaxes left",
  NO_GOLD = "No gold",
  STILL_RECOVERING = "Gold is still recovering",
  EXPANSION_HAS_NO_GOLD = "Expansion has no gold",
  NO_EXPANSION = "Expansion does not exist",
  NO_BUMPKIN = "You do not have a Bumpkin",
}

export function mineGold({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const stateCopy = cloneDeep(state);
  const { bumpkin } = stateCopy;

  const { index } = action;
  if (!bumpkin) {
    throw new Error(EVENT_ERRORS.NO_BUMPKIN);
  }

  const goldRock = stateCopy.gold[index];

  if (!goldRock) {
    throw new Error("No gold rock found.");
  }

  if (!canMine(goldRock, GOLD_RECOVERY_TIME, createdAt)) {
    throw new Error(EVENT_ERRORS.STILL_RECOVERING);
  }

  const toolAmount = stateCopy.inventory["Iron Pickaxe"] || new Decimal(0);

  if (toolAmount.lessThan(1)) {
    throw new Error(EVENT_ERRORS.NO_PICKAXES);
  }

  const goldMined = goldRock.stone.amount;
  const amountInInventory = stateCopy.inventory.Gold || new Decimal(0);

  goldRock.stone = {
    minedAt: createdAt,
    amount: 2,
  };
  bumpkin.activity = trackActivity("Gold Mined", bumpkin.activity);

  stateCopy.inventory["Iron Pickaxe"] = toolAmount.sub(1);
  stateCopy.inventory.Gold = amountInInventory.add(goldMined);

  return stateCopy;
}
