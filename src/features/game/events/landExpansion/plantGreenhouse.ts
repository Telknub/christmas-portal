import cloneDeep from "lodash.clonedeep";

import { GameState } from "features/game/types/game";

import {
  GreenHouseCropName,
  GreenHouseCropSeedName,
} from "features/game/types/crops";
import {
  GreenHouseFruitName,
  GreenHouseFruitSeedName,
} from "features/game/types/fruits";
import Decimal from "decimal.js-light";
import {
  BumpkinActivityName,
  trackActivity,
} from "features/game/types/bumpkinActivity";
import { isWearableActive } from "features/game/lib/wearables";
import { GREENHOUSE_CROP_TIME_SECONDS } from "./harvestGreenHouse";
import { isCollectibleBuilt } from "features/game/lib/collectibleBuilt";

export type PlantGreenhouseAction = {
  type: "greenhouse.planted";
  seed: GreenhouseSeed;
  id: number;
};

type Options = {
  state: Readonly<GameState>;
  action: PlantGreenhouseAction;
  createdAt?: number;
};

type GreenhouseSeed = GreenHouseCropSeedName | GreenHouseFruitSeedName;
export const SEED_TO_PLANT: Record<
  GreenhouseSeed,
  GreenHouseCropName | GreenHouseFruitName
> = {
  "Grape Seed": "Grape",
  "Olive Seed": "Olive",
  "Rice Seed": "Rice",
};

export const MAX_POTS = 4;

export function getCropYieldAmount({
  crop,
  game,
}: {
  crop: GreenHouseCropName | GreenHouseFruitName;
  game: GameState;
}): number {
  let amount = 1;

  // Rice
  if (crop === "Rice" && isWearableActive({ name: "Non La Hat", game })) {
    amount += 1;
  }

  if (crop === "Rice" && isCollectibleBuilt({ name: "Rice Panda", game })) {
    amount += 0.25;
  }

  // Grape
  if (crop === "Grape" && isCollectibleBuilt({ name: "Vinny", game })) {
    amount += 0.25;
  }

  if (crop === "Grape" && isCollectibleBuilt({ name: "Grape Granny", game })) {
    amount += 1;
  }

  // Olive
  if (crop === "Olive" && isWearableActive({ name: "Olive Shield", game })) {
    amount += 1;
  }

  return amount;
}

type GetPlantedAtArgs = {
  crop: GreenHouseCropName | GreenHouseFruitName;
  game: GameState;
  createdAt: number;
};

function getPlantedAt({ crop, game, createdAt }: GetPlantedAtArgs): number {
  if (!crop) return 0;

  const cropTime = GREENHOUSE_CROP_TIME_SECONDS[crop];

  const boostedTime = getCropTime({ crop, game });

  const offset = cropTime - boostedTime;

  return createdAt - offset * 1000;
}

const getCropTime = ({
  crop,
  game,
}: {
  crop: GreenHouseCropName | GreenHouseFruitName;
  game: GameState;
}) => {
  let seconds = GREENHOUSE_CROP_TIME_SECONDS[crop];
  if (game.bumpkin === undefined) return seconds;

  if (isCollectibleBuilt({ name: "Turbo Sprout", game })) {
    seconds *= 0.5;
  }

  return seconds;
};

export function plantGreenhouse({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const game = cloneDeep(state) as GameState;

  // Requires Greenhouse exists
  if (!game.buildings.Greenhouse) {
    throw new Error("Greenhouse does not exist");
  }

  if (!game.bumpkin) {
    throw new Error("No Bumpkin");
  }

  if (!SEED_TO_PLANT[action.seed]) {
    throw new Error("Not a valid seed");
  }

  const seeds = game.inventory[action.seed] ?? new Decimal(0);
  if (seeds.lt(1)) {
    throw new Error(`Missing ${action.seed}`);
  }

  const potId = action.id;
  if (!Number.isInteger(potId) || potId <= 0 || potId > MAX_POTS) {
    throw new Error("Not a valid pot");
  }

  const pot = game.greenhouse.pots[potId] ?? {};

  if (pot.plant) {
    throw new Error("Plant already exists");
  }

  const plantName = SEED_TO_PLANT[action.seed];
  // Plants
  game.greenhouse.pots[potId] = {
    plant: {
      amount: getCropYieldAmount({
        crop: plantName,
        game,
      }),
      name: plantName,
      plantedAt: getPlantedAt({ createdAt, crop: plantName, game }),
    },
  };

  // Subtracts seed
  game.inventory[action.seed] = seeds.sub(1);

  // Tracks Analytics
  const activityName: BumpkinActivityName = `${plantName} Planted`;

  game.bumpkin.activity = trackActivity(activityName, game.bumpkin.activity);

  return game;
}
