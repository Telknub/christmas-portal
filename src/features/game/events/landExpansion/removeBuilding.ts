import Decimal from "decimal.js-light";
import { BuildingName } from "features/game/types/buildings";
import { trackActivity } from "features/game/types/bumpkinActivity";
import { getKeys } from "features/game/types/craftables";
import { Chicken, GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";
import { getSupportedChickens } from "./utils";

export enum REMOVE_BUILDING_ERRORS {
  INVALID_BUILDING = "This building does not exist",
  NO_RUSTY_SHOVEL_AVAILABLE = "No Rusty Shovel available!",
  NO_BUMPKIN = "You do not have a Bumpkin",
  BUILDING_UNDER_CONSTRUCTION = "Cannot remove a building while it's under construction",
  WATER_WELL_REMOVE_CROPS = "Cannot remove Water Well that causes crops to uproot",
  HEN_HOUSE_REMOVE_BREWING_CHICKEN = "Cannot remove Hen House that causes chickens that are brewing egg to be removed",
}

export type RemoveBuildingAction = {
  type: "building.removed";
  building: BuildingName;
  id: string;
};

type Options = {
  state: Readonly<GameState>;
  action: RemoveBuildingAction;
  createdAt?: number;
};

// First 15 plots do not need water
const INITIAL_SUPPORTED_PLOTS = 15;
// Each well can support an additional 8 plots
const WELL_PLOT_SUPPORT = 8;

const getUnSupportedPlotCount = (gameState: GameState): number => {
  // Get the well count
  const activeWells =
    gameState.buildings["Water Well"]?.filter(
      (well) => well.readyAt < Date.now()
    ).length ?? 0;

  // How many plots well can support
  const supportedPlots =
    activeWells * WELL_PLOT_SUPPORT + INITIAL_SUPPORTED_PLOTS;

  const plotCount = gameState.expansions.reduce((count, expansion) => {
    if (!expansion.plots) return count;

    count += getKeys(expansion.plots).length;

    return count;
  }, 0);

  return Math.max(plotCount - supportedPlots, 0);
};

export const areUnsupportedPlotsGrowing = (gameState: GameState) => {
  const unsupportedChickens = Object.values(getUnsupportedChickens(gameState));
  return unsupportedChickens.some((chicken) => !!chicken.fedAt);
};

/**
 * Removes crop data from any plots that don't have water well support.
 * It iterates backwards through the expansions and backwards through each expansions plots removing unsupported crops.
 * NOTE: At this time, we do not consider total crops planted vs supported crops. We just remove from then end even if early plots have no crops.
 * @param gameState
 * @returns LandExpansion[]
 */
export const removeUnsupportedCrops = (gameState: GameState) => {
  const unsupportedPlotCount = getUnSupportedPlotCount(gameState);
  const { expansions = [] } = gameState;

  let count = 0;
  let hasUnsupportedCrops = false;

  for (let expIndex = expansions.length - 1; expIndex >= 0; expIndex--) {
    if (count === unsupportedPlotCount) break;
    if (!expansions[expIndex].plots) continue;

    const reversedPlotKeys = getKeys({
      ...expansions[expIndex].plots,
    }).reverse();

    for (
      let plotKeyIdx = 0;
      plotKeyIdx < reversedPlotKeys.length;
      plotKeyIdx++
    ) {
      if (count === unsupportedPlotCount) break;

      const plot = expansions[expIndex].plots?.[reversedPlotKeys[plotKeyIdx]];

      if (plot?.crop) {
        hasUnsupportedCrops = true;
        delete plot.crop;
      }

      count++;
    }
  }

  return { expansions, hasUnsupportedCrops };
};

export const getUnsupportedChickens = (gameState: GameState) => {
  const supportedChickensCount = getSupportedChickens(gameState);
  const chickenKeys = getKeys(gameState.chickens);
  const chickenCount = chickenKeys.length;
  const unsupportedChickensCount = Math.max(
    0,
    chickenCount - supportedChickensCount
  );

  // add unsupported chickens to the list last in first out
  let unsupportedChickens: Record<string, Chicken> = {};
  [...Array(unsupportedChickensCount)].forEach((_, i) => {
    const keyIndex = chickenCount - (i + 1);
    unsupportedChickens = {
      ...unsupportedChickens,
      [chickenKeys[keyIndex]]: gameState.chickens[chickenKeys[keyIndex]],
    };
  });

  return unsupportedChickens;
};

export const areUnsupportedChickensBrewing = (gameState: GameState) => {
  const unsupportedChickens = Object.values(getUnsupportedChickens(gameState));
  return unsupportedChickens.some((chicken) => !!chicken.fedAt);
};

export function removeUnsupportedChickens(gameState: GameState) {
  const unsupportedChickens = getUnsupportedChickens(gameState);

  // Remove unsupported chickens last in first out
  getKeys(unsupportedChickens).forEach((chickenKey) => {
    delete gameState.chickens[chickenKey];
  });

  return gameState.chickens;
}

export function removeBuilding({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const stateCopy = cloneDeep(state) as GameState;
  const { buildings, inventory, bumpkin } = stateCopy;
  const buildingGroup = buildings[action.building];

  if (bumpkin === undefined) {
    throw new Error(REMOVE_BUILDING_ERRORS.NO_BUMPKIN);
  }

  if (!buildingGroup) {
    throw new Error(REMOVE_BUILDING_ERRORS.INVALID_BUILDING);
  }

  const buildingToRemove = buildingGroup.find(
    (building) => building.id === action.id
  );

  if (!buildingToRemove) {
    throw new Error(REMOVE_BUILDING_ERRORS.INVALID_BUILDING);
  }

  if (buildingToRemove.readyAt > createdAt) {
    throw new Error(REMOVE_BUILDING_ERRORS.BUILDING_UNDER_CONSTRUCTION);
  }

  const shovelAmount = inventory["Rusty Shovel"] || new Decimal(0);

  if (shovelAmount.lessThan(1)) {
    throw new Error(REMOVE_BUILDING_ERRORS.NO_RUSTY_SHOVEL_AVAILABLE);
  }

  stateCopy.buildings[action.building] = buildingGroup.filter(
    (building) => building.id !== buildingToRemove.id
  );

  if (action.building === "Water Well") {
    const { expansions, hasUnsupportedCrops } =
      removeUnsupportedCrops(stateCopy);
    if (hasUnsupportedCrops) {
      throw new Error(REMOVE_BUILDING_ERRORS.WATER_WELL_REMOVE_CROPS);
    }

    stateCopy.expansions = expansions;
  }

  if (action.building === "Hen House") {
    if (areUnsupportedChickensBrewing(stateCopy)) {
      throw new Error(REMOVE_BUILDING_ERRORS.HEN_HOUSE_REMOVE_BREWING_CHICKEN);
    }

    stateCopy.chickens = removeUnsupportedChickens(stateCopy);
  }

  bumpkin.activity = trackActivity("Building Removed", bumpkin.activity);

  inventory["Rusty Shovel"] = inventory["Rusty Shovel"]?.minus(1);

  return stateCopy;
}
