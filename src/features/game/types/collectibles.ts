import Decimal from "decimal.js-light";
import { GameState, Inventory } from "./game";
import { SEASONS } from "./seasons";
import { marketRate } from "../lib/halvening";
import { SFLDiscount } from "../lib/SFLDiscount";

export type SeasonPassName = "Dawn Breaker Banner" | "Solar Flare Banner";

export type HeliosBlacksmithItem = "Immortal Pear" | "Treasure Map";

export type SoldOutCollectibleName =
  | "Palm Tree"
  | "Beach Ball"
  | "Cabbage Boy"
  | "Cabbage Girl"
  | "Heart Balloons"
  | "Flamingo"
  | "Blossom Tree"
  | "Collectible Bear"
  | "Pablo The Bunny"
  | "Easter Bush"
  | "Giant Carrot"
  | "Maneki Neko"
  | "Squirrel Monkey"
  | "Black Bearry"
  | "Hoot"
  | "Lady Bug";

export type GoblinBlacksmithItemName =
  | "Purple Trail"
  | "Obie"
  | "Mushroom House"
  | "Maximus";

export type GoblinPirateItemName =
  | "Iron Idol"
  | "Heart of Davy Jones"
  | "Karkinos";

export type CraftableCollectible = {
  ingredients: Inventory;
  description: string;
  boost?: string;
  sfl?: Decimal;
};

export const HELIOS_BLACKSMITH_ITEMS: Record<
  HeliosBlacksmithItem,
  CraftableCollectible
> = {
  "Immortal Pear": {
    description: "A long-lived pear that makes fruit trees last longer.",
    ingredients: {
      Gold: new Decimal(5),
      Apple: new Decimal(10),
      Blueberry: new Decimal(10),
      Orange: new Decimal(10),
    },
    boost: "+1 harvest",
  },
  "Treasure Map": {
    description: "X marks the spot!",
    ingredients: {
      Gold: new Decimal(5),
      "Wooden Compass": new Decimal(2),
    },
    boost: "+20% SFL on Treasure Bounty",
  },
};

export type GoblinBlacksmithCraftable = CraftableCollectible & {
  supply?: number;
  disabled?: boolean;
  sfl?: Decimal;
};

export type GoblinPirateCraftable = CraftableCollectible & {
  supply: number;
  disabled?: boolean;
};

export const GOBLIN_PIRATE_ITEMS: Record<
  GoblinPirateItemName,
  GoblinPirateCraftable
> = {
  "Iron Idol": {
    description: "The Idol adds 1 iron every time you mine iron.",
    ingredients: {
      Gold: new Decimal(10),
      Starfish: new Decimal(40),
      Pearl: new Decimal(1),
    },
    supply: 200,
    boost: "+1 Iron",
  },
  "Heart of Davy Jones": {
    description:
      "Whoever possesses it holds immense power over the seven seas, can dig for treasure without tiring",
    ingredients: {
      Gold: new Decimal(10),
      "Wooden Compass": new Decimal(6),
    },
    supply: 1000,
    boost: "Dig an extra 20 times per day",
  },
  Karkinos: {
    description:
      "Pinchy but kind, the crabby cabbage-boosting addition to your farm!",
    ingredients: {
      Crab: new Decimal(5),
      Cabbage: new Decimal(500),
      Gold: new Decimal(3),
      "Solar Flare Ticket": new Decimal(350),
    },
    supply: 7500,
    boost: "+0.1 Cabbage",
  },
};

export const GOBLIN_BLACKSMITH_ITEMS: (
  state?: GameState
) => Record<GoblinBlacksmithItemName, GoblinBlacksmithCraftable> = (state) => {
  return {
    "Mushroom House": {
      description:
        "A whimsical, fungi-abode where the walls sprout with charm and even the furniture has a 'spore-tacular' flair!",
      ingredients: {
        "Wild Mushroom": new Decimal(50),
        Gold: new Decimal(10),
      },
      // 50 Team supply + giveaways
      supply: 2000 + 50,
      sfl: SFLDiscount(state, new Decimal(50)),
      boost: "+0.2 Wild Mushroom",
      // only available when SEASONS["DAWN_BREAKER"] starts
      disabled: SEASONS["Dawn Breaker"].startDate.getTime() > Date.now(),
    },
    Maximus: {
      description: "Squash the competition with plump Maximus",
      // Placeholders
      ingredients: {
        Eggplant: new Decimal(100),
        "Dawn Breaker Ticket": new Decimal(3200),
      },
      sfl: SFLDiscount(state, marketRate(20000)),
      // 50 Team Supply + giveaways
      supply: 350 + 50,
      boost: "+1 Eggplant",
      disabled: SEASONS["Dawn Breaker"].startDate.getTime() > Date.now(),
    },
    Obie: {
      description: "A fierce eggplant soldier",
      // Placeholders
      ingredients: {
        Eggplant: new Decimal(150),
        "Dawn Breaker Ticket": new Decimal(1200),
      },
      sfl: SFLDiscount(state, marketRate(2000)),
      // 100 Team Supply + Giveaways
      supply: 2500 + 100,
      boost: "25% faster eggplants",
      disabled: SEASONS["Dawn Breaker"].startDate.getTime() > Date.now(),
    },
    "Purple Trail": {
      description:
        "Leave your opponents in a trail of envy with the mesmerizing and unique Purple Trail",
      // Placeholders
      ingredients: {
        Eggplant: new Decimal(25),
        "Dawn Breaker Ticket": new Decimal(500),
      },
      sfl: SFLDiscount(state, marketRate(800)),
      supply: 10000,
      boost: "+0.2 Eggplant",
      disabled: SEASONS["Dawn Breaker"].startDate.getTime() > Date.now(),
    },
  };
};

export type Purchasable = CraftableCollectible & {
  usd: number;
};

export const SEASON_PASS_ITEMS: Record<SeasonPassName, Purchasable> = {
  "Solar Flare Banner": {
    description: "?",
    ingredients: {},
    usd: 3.99,
  },
  "Dawn Breaker Banner": {
    description: "?",
    ingredients: {},
    boost: "?",
    usd: 3.99,
  },
};
