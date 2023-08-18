import Decimal from "decimal.js-light";
import { marketRate } from "../lib/halvening";
import { Dimensions } from "./buildings";
import { GameState, Inventory } from "./game";
import { SFLDiscount } from "../lib/SFLDiscount";
import { BoostTreasure, DecorationTreasure } from "./treasure";

export type AchievementDecorationName =
  | "Chef Bear"
  | "Construction Bear"
  | "Sunflower Bear"
  | "Farmer Bear"
  | "Bear Trap"
  | "Angel Bear"
  | "Brilliant Bear"
  | "Badass Bear"
  | "Classy Bear"
  | "Rich Bear"
  | "Rainbow Artist Bear"
  | "Devil Bear";

export type BasicDecorationName =
  | "White Tulips"
  | "Potted Sunflower"
  | "Potted Potato"
  | "Potted Pumpkin"
  | "Cactus"
  | "Basic Bear"
  | "Bonnie's Tombstone"
  | "Grubnash's Tombstone";

export type LandscapingDecorationName =
  | "Dirt Path"
  | "Bush"
  | "Shrub"
  | "Fence"
  | "Crimson Cap"
  | "Toadstool Seat"
  | "Chestnut Fungi Stool"
  | "Mahogany Cap"
  | "Pine Tree"
  | "Stone Fence"
  | "Field Maple"
  | "Red Maple"
  | "Golden Maple";

export type ShopDecorationName =
  | BasicDecorationName
  | LandscapingDecorationName;

export type SeasonalDecorationName =
  | "Clementine"
  | "Cobalt"
  | "Dawn Umbrella Seat"
  | "Eggplant Grill"
  | "Giant Dawn Mushroom"
  | "Shroom Glow"
  | "Candles"
  | "Haunted Stump"
  | "Spooky Tree";

export type EventDecorationName =
  | "Valentine Bear"
  | "Easter Bear"
  | "Easter Bush"
  | "Giant Carrot"
  | "Genie Bear"
  | "Eggplant Bear"
  | "Dawn Flower";

export type PotionHouseItemName =
  | "Giant Potato"
  | "Giant Pumpkin"
  | "Giant Cabbage"
  | "Lab Grown Carrot"
  | "Lab Grown Radish"
  | "Lab Grown Pumpkin";

export type DecorationName =
  | AchievementDecorationName
  | ShopDecorationName
  | EventDecorationName
  | DecorationTreasure
  | BoostTreasure
  | SeasonalDecorationName
  | PotionHouseItemName;

export const DECORATION_DIMENSIONS: Record<DecorationName, Dimensions> = {
  "Dawn Flower": {
    height: 1,
    width: 1,
  },
  "White Tulips": {
    height: 1,
    width: 1,
  },
  "Potted Sunflower": {
    height: 1,
    width: 1,
  },
  "Potted Potato": {
    height: 1,
    width: 1,
  },
  "Potted Pumpkin": {
    height: 1,
    width: 1,
  },
  Cactus: {
    height: 1,
    width: 1,
  },
  "Basic Bear": {
    height: 1,
    width: 1,
  },
  "Chef Bear": {
    height: 2,
    width: 1,
  },
  "Construction Bear": {
    height: 1,
    width: 1,
  },
  "Angel Bear": {
    height: 1,
    width: 2,
  },
  "Badass Bear": {
    height: 1,
    width: 1,
  },
  "Bear Trap": {
    height: 2,
    width: 1,
  },
  "Brilliant Bear": {
    height: 1,
    width: 1,
  },
  "Classy Bear": {
    height: 1,
    width: 1,
  },
  "Farmer Bear": {
    height: 1,
    width: 1,
  },
  "Sunflower Bear": {
    height: 1,
    width: 1,
  },
  "Rich Bear": {
    height: 1,
    width: 2,
  },
  "Rainbow Artist Bear": {
    width: 1,
    height: 1,
  },
  "Devil Bear": {
    height: 1,
    width: 1,
  },
  "Abandoned Bear": {
    height: 1,
    width: 1,
  },
  "Turtle Bear": {
    height: 1,
    width: 1,
  },
  "T-Rex Skull": {
    height: 2,
    width: 2,
  },
  "Sunflower Coin": {
    height: 2,
    width: 2,
  },
  Foliant: {
    height: 2,
    width: 2,
  },
  "Skeleton King Staff": {
    height: 2,
    width: 2,
  },
  "Lifeguard Bear": {
    height: 1,
    width: 1,
  },
  "Snorkel Bear": {
    height: 1,
    width: 1,
  },
  "Whale Bear": {
    height: 1,
    width: 1,
  },
  "Parasaur Skull": {
    height: 2,
    width: 2,
  },
  "Golden Bear Head": {
    height: 2,
    width: 2,
  },
  "Pirate Bear": {
    height: 1,
    width: 1,
  },
  "Goblin Bear": {
    height: 1,
    width: 1,
  },
  Galleon: {
    height: 2,
    width: 2,
  },
  "Dinosaur Bone": {
    height: 2,
    width: 2,
  },
  "Human Bear": {
    height: 1,
    width: 1,
  },
  "Tiki Totem": {
    height: 1,
    width: 1,
  },
  "Lunar Calendar": {
    height: 1,
    width: 1,
  },
  "Valentine Bear": {
    height: 1,
    width: 1,
  },
  "Easter Bear": {
    height: 1,
    width: 1,
  },
  "Easter Bush": {
    height: 1,
    width: 2,
  },
  "Giant Carrot": {
    height: 3,
    width: 2,
  },
  "Dirt Path": {
    width: 1,
    height: 1,
  },
  Bush: {
    width: 2,
    height: 1,
  },
  "Eggplant Bear": {
    width: 1,
    height: 1,
  },
  "Field Maple": {
    width: 2,
    height: 2,
  },
  "Red Maple": {
    width: 2,
    height: 2,
  },
  "Golden Maple": {
    width: 2,
    height: 2,
  },
  Fence: {
    width: 1,
    height: 1,
  },
  "Stone Fence": {
    width: 1,
    height: 1,
  },
  Shrub: {
    width: 1,
    height: 1,
  },
  "Pine Tree": {
    width: 1,
    height: 2,
  },
  "Bonnie's Tombstone": {
    width: 1,
    height: 1,
  },
  "Chestnut Fungi Stool": {
    width: 1,
    height: 1,
  },
  "Crimson Cap": {
    width: 2,
    height: 2,
  },
  "Dawn Umbrella Seat": {
    width: 1,
    height: 1,
  },
  "Eggplant Grill": {
    width: 1,
    height: 1,
  },
  "Giant Dawn Mushroom": {
    width: 2,
    height: 2,
  },
  "Grubnash's Tombstone": {
    width: 1,
    height: 1,
  },
  "Mahogany Cap": {
    width: 2,
    height: 2,
  },
  "Toadstool Seat": {
    width: 1,
    height: 1,
  },
  Clementine: {
    width: 1,
    height: 1,
  },
  Cobalt: {
    width: 1,
    height: 1,
  },
  "Shroom Glow": {
    width: 2,
    height: 2,
  },
  "Genie Lamp": {
    width: 2,
    height: 1,
  },
  "Genie Bear": {
    width: 1,
    height: 1,
  },
  Candles: {
    width: 1,
    height: 1,
  },
  "Haunted Stump": {
    width: 1,
    height: 1,
  },
  "Spooky Tree": {
    width: 1,
    height: 2,
  },
  "Giant Cabbage": {
    width: 2,
    height: 2,
  },
  "Giant Potato": {
    width: 1,
    height: 2,
  },
  "Giant Pumpkin": {
    width: 2,
    height: 2,
  },
  "Lab Grown Carrot": {
    width: 1,
    height: 1,
  },
  "Lab Grown Pumpkin": {
    width: 1,
    height: 1,
  },
  "Lab Grown Radish": {
    width: 1,
    height: 1,
  },
};

export type Decoration = {
  name: DecorationName;
  ingredients: Inventory;
  description: string;
  // If no SFL it is not available for purchase
  sfl?: Decimal;
  limit?: number;
  from?: Date;
  to?: Date;
};

export const BASIC_DECORATIONS: () => Record<
  BasicDecorationName,
  Decoration
> = () => ({
  "White Tulips": {
    name: "White Tulips",
    sfl: new Decimal(0.25),
    ingredients: {},
    description: "Keep the smell of goblins away.",
  },
  "Potted Sunflower": {
    name: "Potted Sunflower",
    sfl: new Decimal(0.25),
    ingredients: {
      Sunflower: new Decimal(100),
    },
    description: "Brighten up your land.",
  },
  "Potted Potato": {
    name: "Potted Potato",
    sfl: new Decimal(0.625),
    ingredients: {
      Potato: new Decimal(200),
    },
    description: "Potato blood runs through your Bumpkin.",
  },
  "Potted Pumpkin": {
    name: "Potted Pumpkin",
    sfl: new Decimal(2.5),
    ingredients: {
      Pumpkin: new Decimal(200),
    },
    description: "Pumpkins for Bumpkins",
  },
  Cactus: {
    name: "Cactus",
    sfl: new Decimal(0.25),
    ingredients: {},
    description: "Saves water and makes your farm look stunning!",
  },
  "Basic Bear": {
    name: "Basic Bear",
    sfl: new Decimal(0.625),
    ingredients: {},
    description: "A basic bear. Use this at Goblin Retreat to build a bear!",
  },

  "Bonnie's Tombstone": {
    name: "Bonnie's Tombstone",
    sfl: marketRate(0),
    ingredients: {
      Stone: new Decimal(10),
    },
    description:
      "A spooky addition to any farm, Bonnie's Human Tombstone will send shivers down your spine.",
  },

  "Grubnash's Tombstone": {
    name: "Grubnash's Tombstone",
    sfl: marketRate(0),
    ingredients: {
      Stone: new Decimal(20),
      Iron: new Decimal(10),
    },
    description: "Add some mischievous charm with Grubnash's Goblin Tombstone.",
  },
});

export const LANDSCAPING_DECORATIONS: () => Record<
  LandscapingDecorationName,
  Decoration
> = () => ({
  "Dirt Path": {
    name: "Dirt Path",
    sfl: new Decimal(0.625),
    ingredients: {},
    description: "Keep your farmer boots clean with a well trodden path.",
  },
  Bush: {
    name: "Bush",
    sfl: new Decimal(1.25),
    ingredients: {
      Wood: new Decimal(5),
    },
    description: "What's lurking in the bushes?",
  },
  Fence: {
    name: "Fence",
    sfl: new Decimal(0.125),
    ingredients: {
      Wood: new Decimal(5),
    },
    description: "Add a touch of rustic charm to your farm.",
  },
  "Stone Fence": {
    name: "Stone Fence",
    sfl: new Decimal(0.25),
    ingredients: {
      Stone: new Decimal(5),
    },
    description: "Embrace the timeless elegance of a stone fence.",
  },
  "Pine Tree": {
    name: "Pine Tree",
    sfl: new Decimal(1.25),
    ingredients: {
      Wood: new Decimal(7),
    },
    description: "Standing tall and mighty, a needle-clad dream.",
  },
  Shrub: {
    name: "Shrub",
    sfl: new Decimal(0.625),
    ingredients: {
      Wood: new Decimal(3),
    },
    description: "Enhance your in-game landscaping with a beautiful shrub",
  },
  "Field Maple": {
    name: "Field Maple",
    sfl: new Decimal(0.625),
    ingredients: {
      Wood: new Decimal(20),
    },
    description:
      "A petite charmer that spreads its leaves like a delicate green canopy.",
  },
  "Red Maple": {
    name: "Red Maple",
    sfl: new Decimal(0.625),
    ingredients: {
      Wood: new Decimal(3),
      "Block Buck": new Decimal(1),
    },
    description: "Fiery foliage and a heart full of autumnal warmth.",
  },
  "Golden Maple": {
    name: "Golden Maple",
    sfl: new Decimal(0.625),
    ingredients: {
      Wood: new Decimal(3),
      "Block Buck": new Decimal(1),
    },
    description: "Radiating brilliance with its shimmering golden leaves.",
  },
  "Crimson Cap": {
    name: "Crimson Cap",
    sfl: new Decimal(50),
    ingredients: {
      "Wild Mushroom": new Decimal(20),
    },
    description:
      "A towering and vibrant mushroom, the Crimson Cap Giant Mushroom will bring life to your farm.",
  },
  "Toadstool Seat": {
    name: "Toadstool Seat",
    sfl: new Decimal(0),
    ingredients: {
      "Wild Mushroom": new Decimal(5),
    },
    description: "Sit back and relax on the whimsical Toadstool Mushroom Seat.",
  },
  "Chestnut Fungi Stool": {
    name: "Chestnut Fungi Stool",
    sfl: new Decimal(5),
    ingredients: {
      "Toadstool Seat": new Decimal(1),
      Wood: new Decimal(10),
    },
    description:
      "The Chestnut Fungi Stool is a sturdy and rustic addition to any farm.",
  },
  "Mahogany Cap": {
    name: "Mahogany Cap",
    sfl: new Decimal(5),
    ingredients: {
      "Crimson Cap": new Decimal(1),
      Wood: new Decimal(100),
    },
    description:
      "Add a touch of sophistication with the Mahogany Cap Giant Mushroom.",
  },
});

export const SEASONAL_DECORATIONS: (
  state?: GameState
) => Partial<Record<SeasonalDecorationName, Decoration>> = (state) => ({
  Candles: {
    name: "Candles",
    sfl: SFLDiscount(state, new Decimal(5)),
    from: new Date("2023-08-01"),
    to: new Date("2023-11-01"),
    description:
      "Enchant your farm with flickering spectral flames during Witches' Eve.",
    ingredients: {
      "Crow Feather": new Decimal(5),
    },
  },
  "Haunted Stump": {
    name: "Haunted Stump",
    sfl: new Decimal(0),
    from: new Date("2023-08-01"),
    to: new Date("2023-09-01"),
    description: "Summon spirits and add eerie charm to your farm.",
    ingredients: {
      "Crow Feather": new Decimal(100),
    },
  },
  "Spooky Tree": {
    name: "Spooky Tree",
    sfl: SFLDiscount(state, new Decimal(50)),
    from: new Date("2023-09-01"),
    to: new Date("2023-10-01"),
    description: "A hauntingly fun addition to your farm's decor!",
    ingredients: {
      "Crow Feather": new Decimal(500),
    },
  },
});

export const POTION_HOUSE_DECORATIONS: () => Record<
  PotionHouseItemName,
  Decoration
> = () => ({
  "Lab Grown Carrot": {
    name: "Lab Grown Carrot",
    description: "+0.2 Carrot Yield",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(6000),
    },
  },
  "Lab Grown Radish": {
    name: "Lab Grown Radish",
    description: "+0.4 Radish Yield",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(8000),
    },
  },
  "Lab Grown Pumpkin": {
    name: "Lab Grown Pumpkin",
    description: "+0.3 Pumpkin Yield",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(7000),
    },
  },
  "Magic Bean": {
    name: "Magic Bean",
    description: "What will grow?",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(2000),
    },
  },
  "Giant Potato": {
    name: "Giant Potato",
    description: "A giant potato.",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(500),
    },
  },
  "Giant Pumpkin": {
    name: "Giant Pumpkin",
    description: "A giant pumpkin.",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(750),
    },
  },
  "Giant Cabbage": {
    name: "Giant Cabbage",
    description: "A giant cabbage.",
    sfl: new Decimal(0),
    ingredients: {
      "Potion Point": new Decimal(1000),
    },
  },
});
