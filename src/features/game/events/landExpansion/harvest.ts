import { GameState, PlantedCrop } from "../../types/game";
import { Crop, CROPS } from "../../types/crops";
import Decimal from "decimal.js-light";
import cloneDeep from "lodash.clonedeep";
import {
  BumpkinActivityName,
  trackActivity,
} from "features/game/types/bumpkinActivity";

export type LandExpansionHarvestAction = {
  type: "crop.harvested";
  index: string;
};

type Options = {
  state: GameState;
  action: LandExpansionHarvestAction;
  createdAt?: number;
};

export const isReadyToHarvest = (
  createdAt: number,
  plantedCrop: PlantedCrop,
  cropDetails: Crop
) => {
  return createdAt - plantedCrop.plantedAt >= cropDetails.harvestSeconds * 1000;
};

export function harvest({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const stateCopy = cloneDeep(state);
  const { bumpkin, crops: plots } = stateCopy;

  if (!bumpkin) {
    throw new Error("You do not have a Bumpkin");
  }

  const plot = plots[action.index];

  if (!plot) {
    throw new Error("Plot does not exist");
  }

  if (!plot.crop) {
    throw new Error("Nothing was planted");
  }

  const { name: cropName, plantedAt, amount = 1, reward } = plot.crop;

  const { harvestSeconds } = CROPS()[cropName];

  if (createdAt - plantedAt < harvestSeconds * 1000) {
    throw new Error("Not ready");
  }

  const activityName: BumpkinActivityName = `${cropName} Harvested`;

  bumpkin.activity = trackActivity(activityName, bumpkin.activity);

  // Remove crop data for plot
  delete plot.crop;

  const cropCount = stateCopy.inventory[cropName] || new Decimal(0);

  stateCopy.inventory = {
    ...stateCopy.inventory,
    [cropName]: cropCount.add(amount),
  };

  return stateCopy;
}
