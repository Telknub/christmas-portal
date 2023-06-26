import cloneDeep from "lodash.clonedeep";
import Decimal from "decimal.js-light";

import { CropName, CROPS } from "../../types/crops";
import {
  Bumpkin,
  Collectibles,
  CropPlot,
  GameState,
  Inventory,
  InventoryItemName,
  PlacedItem,
  Position,
} from "../../types/game";
import {
  COLLECTIBLES_DIMENSIONS,
  getKeys,
} from "features/game/types/craftables";
import { isCollectibleBuilt } from "features/game/lib/collectibleBuilt";
import { setPrecision } from "lib/utils/formatNumber";
import { SEEDS } from "features/game/types/seeds";
import { BuildingName } from "features/game/types/buildings";
import { isWithinAOE } from "features/game/expansion/placeable/lib/collisionDetection";

export type LandExpansionPlantAction = {
  type: "seed.planted";
  item: InventoryItemName;
  index: string;
  cropId: string;
};

type Options = {
  state: Readonly<GameState>;
  action: LandExpansionPlantAction;
  createdAt?: number;
};

type IsPlotFertile = {
  plotIndex: string;
  crops: Record<string, CropPlot>;
  buildings: Partial<Record<BuildingName, PlacedItem[]>>;
};

// First 15 plots do not need water
const INITIAL_SUPPORTED_PLOTS = 15;
// Each well can support an additional 8 plots
const WELL_PLOT_SUPPORT = 8;

export const getCompletedWellCount = (
  buildings: Partial<Record<BuildingName, PlacedItem[]>>
) => {
  return (
    buildings["Water Well"]?.filter((well) => well.readyAt < Date.now())
      .length ?? 0
  );
};

export function isPlotFertile({
  plotIndex,
  crops,
  buildings,
}: IsPlotFertile): boolean {
  // get the well count
  const wellCount = getCompletedWellCount(buildings);
  const cropsWellCanWater =
    wellCount * WELL_PLOT_SUPPORT + INITIAL_SUPPORTED_PLOTS;

  const cropPosition =
    getKeys(crops)
      .sort((a, b) => (crops[a].createdAt > crops[b].createdAt ? 1 : -1))
      .findIndex((plotId) => plotId === plotIndex) + 1;

  return cropPosition <= cropsWellCanWater;
}

/**
 * Based on boosts, how long a crop will take to grow
 */
export const getCropTime = (
  crop: CropName,
  inventory: Inventory,
  collectibles: Collectibles,
  bumpkin: Bumpkin,
  plot?: CropPlot
) => {
  const { skills, equipped } = bumpkin;
  const { necklace } = equipped;
  let seconds = CROPS()[crop]?.harvestSeconds ?? 0;

  // Legacy Seed Specialist skill: 10% reduction
  if (inventory["Seed Specialist"]?.gte(1)) {
    seconds = seconds * 0.9;
  }

  // Mysterious Parsnip: 50% reduction
  if (
    crop === "Parsnip" &&
    isCollectibleBuilt("Mysterious Parsnip", collectibles)
  ) {
    seconds = seconds * 0.5;
  }

  // Bumpkin Wearable Boost
  if (crop === "Carrot" && necklace === "Carrot Amulet") {
    seconds = seconds * 0.8;
  }

  // Scarecrow: 15% reduction
  if (
    isCollectibleBuilt("Nancy", collectibles) ||
    isCollectibleBuilt("Scarecrow", collectibles) ||
    isCollectibleBuilt("Kuebiko", collectibles)
  ) {
    seconds = seconds * 0.85;
  }

  // Cultivator skill: 5% reduction
  if (skills["Cultivator"]) {
    seconds = seconds * 0.95;
  }

  // Lunar calender: 10% reduction
  if (isCollectibleBuilt("Lunar Calendar", collectibles)) {
    seconds = seconds * 0.9;
  }

  // Cabbage Girl: 50% reduction
  if (crop === "Cabbage" && isCollectibleBuilt("Cabbage Girl", collectibles)) {
    seconds = seconds * 0.5;
  }

  // If Obie: 25% reduction
  if (crop === "Eggplant" && isCollectibleBuilt("Obie", collectibles)) {
    seconds = seconds * 0.75;
  }

  const isBasicCrop =
    crop === "Sunflower" || crop === "Potato" || crop === "Pumpkin";

  // If within Basic Scarecrow AOE: 20% reduction
  if (collectibles["Basic Scarecrow"]?.[0] && isBasicCrop) {
    if (!plot) return seconds;

    const basicScarecrowCoordinates =
      collectibles["Basic Scarecrow"]?.[0].coordinates;
    const scarecrowDimensions = COLLECTIBLES_DIMENSIONS["Basic Scarecrow"];

    const scarecrowPosition: Position = {
      x: basicScarecrowCoordinates.x,
      y: basicScarecrowCoordinates.y,
      height: scarecrowDimensions.height,
      width: scarecrowDimensions.width,
    };

    const plotPosition: Position = {
      x: plot?.x,
      y: plot?.y,
      height: plot.height,
      width: plot.width,
    };

    if (
      isCollectibleBuilt("Basic Scarecrow", collectibles) &&
      isWithinAOE("Basic Scarecrow", scarecrowPosition, plotPosition)
    ) {
      seconds = seconds * 0.8;
    }
  }

  return seconds;
};

type GetPlantedAtArgs = {
  crop: CropName;
  inventory: Inventory;
  collectibles: Collectibles;
  bumpkin: Bumpkin;
  createdAt: number;
  plot: CropPlot;
};

/**
 * Set a plantedAt in the past to make a crop grow faster
 */
export function getPlantedAt({
  crop,
  inventory,
  collectibles,
  bumpkin,
  createdAt,
  plot,
}: GetPlantedAtArgs): number {
  if (!crop) return 0;

  const cropTime = CROPS()[crop].harvestSeconds;
  const boostedTime = getCropTime(crop, inventory, collectibles, bumpkin, plot);

  const offset = cropTime - boostedTime;

  return createdAt - offset * 1000;
}

/**
 * Based on items, the output will be different
 */
export function getCropYieldAmount({
  crop,
  plot,
  inventory,
  collectibles,
  bumpkin,
}: {
  crop: CropName;
  plot: CropPlot;
  inventory: Inventory;
  collectibles: Collectibles;
  bumpkin: Bumpkin;
}): number {
  let amount = 1;
  const { skills, equipped } = bumpkin;
  const { tool, necklace } = equipped;

  if (
    crop === "Cauliflower" &&
    isCollectibleBuilt("Golden Cauliflower", collectibles)
  ) {
    amount *= 2;
  }

  if (crop === "Carrot" && isCollectibleBuilt("Easter Bunny", collectibles)) {
    amount *= 1.2;
  }

  if (
    crop === "Pumpkin" &&
    isCollectibleBuilt("Victoria Sisters", collectibles)
  ) {
    amount *= 1.2;
  }

  if (
    isCollectibleBuilt("Scarecrow", collectibles) ||
    isCollectibleBuilt("Kuebiko", collectibles)
  ) {
    amount *= 1.2;
  }

  if (inventory.Coder?.gte(1)) {
    amount *= 1.2;
  }

  //Bumpkin Skill boost Green Thumb Skill
  if (skills["Green Thumb"]) {
    amount *= 1.05;
  }

  //Bumpkin Skill boost Master Farmer Skill
  if (skills["Master Farmer"]) {
    amount *= 1.1;
  }

  //Bumpkin Wearable boost Parsnip tool
  if (crop === "Parsnip" && tool === "Parsnip") {
    amount *= 1.2;
  }

  //Bumpkin Wearable boost Beetroot Amulet
  if (crop === "Beetroot" && necklace === "Beetroot Amulet") {
    amount *= 1.2;
  }
  //Bumpkin Wearable boost Sunflower Amulet
  if (crop === "Sunflower" && necklace === "Sunflower Amulet") {
    amount *= 1.1;
  }

  const isMediumLevelCrop =
    crop === "Carrot" ||
    crop === "Cabbage" ||
    crop === "Beetroot" ||
    crop === "Cauliflower" ||
    crop === "Parsnip";

  if (collectibles["Scary Mike"]?.[0] && isMediumLevelCrop && plot) {
    const scarecrowCoordinates = collectibles["Scary Mike"]?.[0].coordinates;
    const scarecrowDimensions = COLLECTIBLES_DIMENSIONS["Scary Mike"];

    const scarecrowPosition: Position = {
      x: scarecrowCoordinates.x,
      y: scarecrowCoordinates.y,
      height: scarecrowDimensions.height,
      width: scarecrowDimensions.width,
    };

    const plotPosition: Position = {
      x: plot?.x,
      y: plot?.y,
      height: plot.height,
      width: plot.width,
    };

    if (
      isCollectibleBuilt("Scary Mike", collectibles) &&
      isWithinAOE("Scary Mike", scarecrowPosition, plotPosition)
    ) {
      amount = amount + 0.2;
    }
  }

  if (
    collectibles["Sir Goldensnout"] &&
    isCollectibleBuilt("Sir Goldensnout", collectibles)
  ) {
    const sirGoldenSnout = collectibles["Sir Goldensnout"][0];

    const position: Position = {
      x: sirGoldenSnout.coordinates.x,
      y: sirGoldenSnout.coordinates.y,
      ...COLLECTIBLES_DIMENSIONS["Sir Goldensnout"],
    };

    if (isWithinAOE("Sir Goldensnout", position, plot)) {
      amount = amount + 0.5;
    }
  }

  const isOvernightCrop =
    crop === "Radish" || crop === "Wheat" || crop === "Kale";

  if (
    isOvernightCrop &&
    collectibles["Hoot"] &&
    isCollectibleBuilt("Hoot", collectibles)
  ) {
    amount = amount + 0.5;
  }

  return Number(setPrecision(new Decimal(amount)));
}

export function plant({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const stateCopy = cloneDeep(state);
  const { crops: plots, bumpkin, collectibles, inventory } = stateCopy;

  if (bumpkin === undefined) {
    throw new Error("You do not have a Bumpkin");
  }

  if (!action.index) {
    throw new Error("Plot does not exist");
  }

  const plot = plots[action.index];

  if (!plot) {
    throw new Error("Plot does not exist");
  }

  if (plot.crop?.plantedAt) {
    throw new Error("Crop is already planted");
  }

  if (!action.item) {
    throw new Error("No seed selected");
  }

  if (!(action.item in SEEDS())) {
    throw new Error("Not a seed");
  }

  const seedCount = inventory[action.item] || new Decimal(0);

  if (seedCount.lessThan(1)) {
    throw new Error("Not enough seeds");
  }

  const cropName = action.item.split(" ")[0] as CropName;

  plots[action.index] = {
    ...plot,
    crop: {
      id: action.cropId,
      plantedAt: getPlantedAt({
        crop: cropName,
        inventory,
        collectibles,
        bumpkin,
        createdAt,
        plot,
      }),
      name: cropName,
      amount: getCropYieldAmount({
        crop: cropName,
        inventory: inventory,
        collectibles,
        bumpkin,
        plot,
      }),
    },
  };

  inventory[action.item] = seedCount.sub(1);

  return stateCopy;
}
