import { canChop } from "features/game/events/landExpansion/chop";
import { CHICKEN_TIME_TO_EGG } from "features/game/lib/constants";
import { FruitName } from "features/game/types/fruits";
import { GameState, InventoryItemName } from "features/game/types/game";
import { CropName } from "features/game/types/crops";
import { canMine } from "features/game/events/landExpansion/stoneMine";
import { CommodityName } from "features/game/types/resources";
import { areUnsupportedChickensBrewing } from "features/game/events/landExpansion/removeBuilding";

type RESTRICTION_REASON =
  | "No restriction"
  | `${CropName} is planted`
  | `${FruitName} is growing`
  | "Crops are planted"
  | "Chickens are fed"
  | "Fruits are growing"
  | "Trees are chopped"
  | `${CommodityName} is mined`
  | "Treasure holes are dug"
  | "Genie Lamp rubbed";

export type Restriction = [boolean, RESTRICTION_REASON];
type RemoveCondition = (gameState: GameState) => Restriction;

type CanRemoveArgs = {
  item: CropName;
  game: GameState;
};

function cropIsPlanted({ item, game }: CanRemoveArgs): Restriction {
  const cropPlanted = Object.values(game.crops ?? {}).some(
    (plot) => plot.crop && plot.crop.name === item
  );
  return [cropPlanted, `${item} is planted`];
}

function areFruitsGrowing(game: GameState, fruit: FruitName): Restriction {
  const fruitGrowing = Object.values(game.fruitPatches ?? {}).some(
    (patch) => patch.fruit?.name === fruit
  );

  return [fruitGrowing, `${fruit} is growing`];
}

function areAnyCropsPlanted(game: GameState): Restriction {
  const cropsPlanted = Object.values(game.crops ?? {}).some(
    (plot) => !!plot.crop
  );

  return [cropsPlanted, "Crops are planted"];
}

function areAnyTreesChopped(game: GameState): Restriction {
  const treesChopped = Object.values(game.trees ?? {}).some(
    (tree) => !canChop(tree)
  );
  return [treesChopped, "Trees are chopped"];
}

function areAnyStonesMined(game: GameState): Restriction {
  const stoneMined = Object.values(game.stones ?? {}).some(
    (stone) => !canMine(stone)
  );
  return [stoneMined, "Stone is mined"];
}

function areAnyIronsMined(game: GameState): Restriction {
  const ironMined = Object.values(game.iron ?? {}).some(
    (iron) => !canMine(iron)
  );
  return [ironMined, "Iron is mined"];
}

function areAnyGoldsMined(game: GameState): Restriction {
  const goldMined = Object.values(game.gold ?? {}).some(
    (gold) => !canMine(gold)
  );
  return [goldMined, "Gold is mined"];
}

function areAnyChickensFed(game: GameState): Restriction {
  const chickensAreFed = Object.values(game.chickens).some(
    (chicken) =>
      chicken.fedAt && Date.now() - chicken.fedAt < CHICKEN_TIME_TO_EGG
  );

  return [chickensAreFed, "Chickens are fed"];
}

function areAnyTreasureHolesDug(game: GameState): Restriction {
  const holesDug = Object.values(game.treasureIsland?.holes ?? {}).some(
    (hole) => {
      const today = new Date().toISOString().substring(0, 10);

      return new Date(hole.dugAt).toISOString().substring(0, 10) == today;
    }
  );

  return [holesDug, "Treasure holes are dug"];
}

export const REMOVAL_RESTRICTIONS: Partial<
  Record<InventoryItemName, RemoveCondition>
> = {
  "Undead Rooster": (game) => areAnyChickensFed(game),
  "Ayam Cemani": (game) => areAnyChickensFed(game),
  "Fat Chicken": (game) => areAnyChickensFed(game),
  "Rich Chicken": (game) => areAnyChickensFed(game),
  "Speed Chicken": (game) => areAnyChickensFed(game),
  "Chicken Coop": (game) => areAnyChickensFed(game),
  "Gold Egg": (game) => areAnyChickensFed(game),
  Rooster: (game) => areAnyChickensFed(game),

  Nancy: (game) => areAnyCropsPlanted(game),
  Scarecrow: (game) => areAnyCropsPlanted(game),
  Kuebiko: (game) => areAnyCropsPlanted(game),
  "Lunar Calendar": (game) => areAnyCropsPlanted(game),

  "Cabbage Boy": (game) => cropIsPlanted({ item: "Cabbage", game }),
  "Cabbage Girl": (game) => cropIsPlanted({ item: "Cabbage", game }),
  Karkinos: (game) => cropIsPlanted({ item: "Cabbage", game }),
  "Easter Bunny": (game) => cropIsPlanted({ item: "Carrot", game }),
  "Pablo The Bunny": (game) => cropIsPlanted({ item: "Carrot", game }),
  "Golden Cauliflower": (game) => cropIsPlanted({ item: "Cauliflower", game }),
  "Mysterious Parsnip": (game) => cropIsPlanted({ item: "Parsnip", game }),
  "Peeled Potato": (game) => cropIsPlanted({ item: "Potato", game }),
  "Victoria Sisters": (game) => cropIsPlanted({ item: "Pumpkin", game }),

  "Squirrel Monkey": (game) => areFruitsGrowing(game, "Orange"),
  "Black Bearry": (game) => areFruitsGrowing(game, "Blueberry"),
  "Lady Bug": (game) => areFruitsGrowing(game, "Apple"),

  "Woody the Beaver": (game) => areAnyTreesChopped(game),
  "Apprentice Beaver": (game) => areAnyTreesChopped(game),
  "Foreman Beaver": (game) => areAnyTreesChopped(game),
  "Wood Nymph Wendy": (game) => areAnyTreesChopped(game),
  "Tiki Totem": (game) => areAnyTreesChopped(game),

  "Rock Golem": (game) => areAnyStonesMined(game),
  "Tunnel Mole": (game) => areAnyStonesMined(game),
  "Rocky the Mole": (game) => areAnyIronsMined(game),
  "Iron Idol": (game) => areAnyIronsMined(game),
  Nugget: (game) => areAnyGoldsMined(game),

  "Heart of Davy Jones": (game) => areAnyTreasureHolesDug(game),
};

export const hasRestriction = (
  name: InventoryItemName,
  id: string,
  state: GameState
): Restriction => {
  if (name === "Genie Lamp") {
    const collectibleGroup = state.collectibles[name];
    if (!collectibleGroup) return [true, "Genie Lamp rubbed"];

    const collectibleToRemove = collectibleGroup.find(
      (collectible) => collectible.id === id
    );
    if (!collectibleToRemove) return [true, "Genie Lamp rubbed"];

    const rubbedCount = collectibleToRemove.rubbedCount ?? 0;
    if (rubbedCount > 0) {
      return [true, "Genie Lamp rubbed"];
    }
  }

  if (name === "Chicken Coop") {
    if (areUnsupportedChickensBrewing(state)) return [true, "Chickens are fed"];
  }

  const removeRestriction = REMOVAL_RESTRICTIONS[name];
  if (removeRestriction) return removeRestriction(state);

  return [false, "No restriction"];
};
