import { craft, CraftAction } from "./craft";
import { sell, SellAction } from "./sell";
import { plant, PlantAction } from "./plant";
import { harvest, HarvestAction } from "./harvest";
import { removeCrop, RemoveCropAction } from "./removeCrop";
import { mineGold, GoldMineAction } from "./goldMine";
import { mineStone, StoneMineAction } from "./stoneMine";
import { mineIron, IronMineAction } from "./ironMine";
import { chop, ChopAction } from "./chop";
import { openReward, OpenRewardAction } from "./rewarded";
import { collectEggs, CollectAction } from "./collectEgg";
import { feedChicken, FeedAction } from "./feedChicken";
import {
  LandExpansionPlantAction,
  plant as landExpansionPlant,
} from "./landExpansion/plant";
import {
  harvest as landExpansionHarvest,
  LandExpansionHarvestAction,
} from "./landExpansion/harvest";

import { GameState } from "../types/game";
import { trade, TradeAction } from "./trade";
import { PebbleStrikeAction, strikePebble } from "./pebbleStrike";
import { chopShrub, ChopShrubAction } from "./chopShrub";

export type GameEvent =
  | CraftAction
  | SellAction
  | PlantAction
  | HarvestAction
  | StoneMineAction
  | IronMineAction
  | GoldMineAction
  | ChopAction
  | OpenRewardAction
  | FeedAction
  | RemoveCropAction
  | CollectAction
  | TradeAction
  | LandExpansionPlantAction
  | LandExpansionHarvestAction
  | PebbleStrikeAction
  | TradeAction
  | ChopShrubAction;

type EventName = Extract<GameEvent, { type: string }>["type"];

/**
 * Type which enables us to map the event name to the payload containing that event name
 */
type Handlers = {
  [Name in EventName]: (options: {
    state: GameState;
    // Extract the correct event payload from the list of events
    action: Extract<GameEvent, { type: Name }>;
  }) => GameState;
};

export const EVENTS: Handlers = {
  "item.planted": plant,
  "item.harvested": harvest,
  "item.crafted": craft,
  "item.sell": sell,
  "stone.mined": mineStone,
  "iron.mined": mineIron,
  "gold.mined": mineGold,
  "tree.chopped": chop,
  "reward.opened": openReward,
  "chicken.collectEgg": collectEggs,
  "chicken.feed": feedChicken,
  "item.traded": trade,
  "item.removed": removeCrop,
  // Land Expansion Handlers
  "landExpansion.item.planted": landExpansionPlant,
  "landExpansion.item.harvested": landExpansionHarvest,
  "pebble.struck": strikePebble,
  "shrub.chopped": chopShrub,
};
