import Decimal from "decimal.js-light";
import cloneDeep from "lodash.clonedeep";

import { isCollectibleBuilt } from "features/game/lib/collectibleBuilt";
import {
  CropSeedName as CropSeedName,
  SEEDS as CROP_SEEDS,
} from "features/game/types/crops";
import {
  Collectibles,
  GameState,
  Inventory,
  InventoryItemName,
} from "features/game/types/game";
import { trackActivity } from "features/game/types/bumpkinActivity";
import { getBumpkinLevel } from "features/game/lib/level";
import { FruitSeedName, FRUIT_SEEDS } from "features/game/types/fruits";

export type SeedName = CropSeedName | FruitSeedName;

export type SeedBoughtAction = {
  type: "seed.bought";
  item: SeedName;
  amount: number;
};

export function getBuyPrice(
  item: { name: InventoryItemName; tokenAmount?: Decimal },
  inventory: Inventory,
  colletibles: Collectibles
) {
  if (isCollectibleBuilt("Kuebiko", colletibles)) {
    return new Decimal(0);
  }

  if (inventory["Sunflower Shield"]?.gte(1) && item.name === "Sunflower Seed") {
    return new Decimal(0);
  }

  let price = item.tokenAmount;

  if (price && inventory.Artist?.gte(1)) {
    price = price.mul(0.9);
  }

  return price;
}

type Options = {
  state: Readonly<GameState>;
  action: SeedBoughtAction;
};

export function seedBought({ state, action }: Options) {
  const stateCopy = cloneDeep(state);
  const { item, amount } = action;

  const SEEDS = { ...CROP_SEEDS(), ...FRUIT_SEEDS() };

  if (!(item in SEEDS)) {
    throw new Error("This item is not a seed");
  }

  const { bumpkin } = stateCopy;

  if (!bumpkin) {
    throw new Error("Bumpkin not found");
  }

  const userBumpkinLevel = getBumpkinLevel(stateCopy.bumpkin?.experience ?? 0);
  const seed = SEEDS[item];
  const requiredSeedLevel = seed.bumpkinLevel ?? 0;

  if (userBumpkinLevel < requiredSeedLevel) {
    throw new Error("Inadequate level");
  }

  if (amount < 1) {
    throw new Error("Invalid amount");
  }

  if (stateCopy.stock[item]?.lt(amount)) {
    throw new Error("Not enough stock");
  }

  const price = getBuyPrice(seed, stateCopy.inventory, stateCopy.collectibles);
  const totalExpenses = price?.mul(amount);

  if (totalExpenses && stateCopy.balance.lessThan(totalExpenses)) {
    throw new Error("Insufficient tokens");
  }

  const oldAmount = stateCopy.inventory[item] ?? new Decimal(0);

  bumpkin.activity = trackActivity(
    "SFL Spent",
    bumpkin?.activity,
    totalExpenses ?? new Decimal(0)
  );
  bumpkin.activity = trackActivity(
    `${item} Bought`,
    bumpkin?.activity,
    new Decimal(amount)
  );

  return {
    ...stateCopy,
    balance: totalExpenses
      ? stateCopy.balance.sub(totalExpenses)
      : stateCopy.balance,
    inventory: {
      ...stateCopy.inventory,
      [item]: oldAmount.add(amount) as Decimal,
    },
    stock: {
      ...stateCopy.stock,
      [item]: stateCopy.stock[item]?.minus(amount) as Decimal,
    },
  };
}
