import { Equipped } from "features/game/types/bumpkin";
import { ITEM_DETAILS } from "features/game/types/images";
import { translate } from "lib/i18n/translate";
import { NPC_WEARABLES } from "lib/npcs";

export const UNLIMITED_ATTEMPTS_SFL = 25;
export const RESTOCK_ATTEMPTS_SFL = 10;
export const DAILY_ATTEMPTS = 1;
export const RESTOCK_ATTEMPTS = 3;

//Krampus Coals
export const KRAMPUS_DURATION = 1000; // Krampus spawn duration
export const COAL_RESPAWN = 10000; // Individual coal respawn
export const COAL_BATCH_SPAWN = 10000; // Delay between each batch spawn

//SnowStorm
export const SPAWN_SNOWSTORM = 15000; // Snowstorm gap effect
export const DURATION_SNOWSTORM = 5000; // Snowstorm duration effect
export const SLOWDOWN_SPEED = 0.5; // Slowdown player

// Coal spawn by batch
export const COAL_BATCH_SIZES = [
  { min: 0, max: 10 },
  { min: 10, max: 15 },
  { min: 15, max: 20 },
  { min: 20, max: 25 },
  { min: 25, max: 30 },
  { min: 30, max: 35 },
  { min: 35, max: 40 },
];

// subject to change
// Coals coordinates (Shuffled with balanced distribution on both sides)
export const COALS_CONFIGURATION: { x: number; y: number }[] = [
  { x: 445, y: 39 },
  { x: 105, y: 30 },
  { x: 325, y: 260 },
  { x: 316, y: 100 },
  { x: 420, y: 210 },
  { x: 93, y: 107 },
  { x: 29, y: 215 },
  { x: 118, y: 190 },
  { x: 85, y: 125 },
  { x: 102, y: 70 },
  { x: 467, y: 50 },
  { x: 55, y: 100 },
  { x: 129, y: 200 },
  { x: 12, y: 150 },
  { x: 328, y: 150 },
  { x: 453, y: 295 },
  { x: 360, y: 210 },
  { x: 400, y: 280 },
  { x: 380, y: 40 },
  { x: 395, y: 60 },
  { x: 355, y: 230 },
  { x: 332, y: 75 },
  { x: 470, y: 120 },
  { x: 490, y: 180 },
  { x: 338, y: 270 },
  { x: 32, y: 134 },
  { x: 68, y: 295 },
  { x: 143, y: 250 },
  { x: 110, y: 270 },
  { x: 45, y: 210 },
  { x: 138, y: 160 },
  { x: 45, y: 20 },
  { x: 50, y: 90 },
  { x: 375, y: 100 },
  { x: 52, y: 215 },
  { x: 116, y: 185 },
  { x: 41, y: 110 },
  { x: 72, y: 305 },
  { x: 365, y: 220 },
];

export const RESOURCES_TABLE: {
  [key: number]: {
    item: string;
    description: string;
  };
} = {
  0: {
    item: ITEM_DETAILS["Abandoned Bear"].image,
    description: translate("christmas-delivery-mayhem.torchDescription"),
  },
  1: {
    item: ITEM_DETAILS["Abandoned Bear"].image,
    description: translate("christmas-delivery-mayhem.torchDescription"),
  },
};

export const ELVES_TABLE: {
  [key: number]: {
    item: string;
    description: string;
  };
} = {
  0: {
    item: ITEM_DETAILS["Abandoned Bear"].image,
    description: translate("christmas-delivery-mayhem.wearSignDescription"),
  },
};

export const EVENTS_TABLE: {
  [key: number]: {
    item: string;
    description: string;
  };
} = {
  0: {
    item: ITEM_DETAILS["Abandoned Bear"].image,
    description: translate("christmas-delivery-mayhem.ghostEnemyDescription"),
  },
  1: {
    item: ITEM_DETAILS["Abandoned Bear"].image,
    description: translate("christmas-delivery-mayhem.zombieEnemyDescription"),
  },
  2: {
    item: ITEM_DETAILS["Abandoned Bear"].image,
    description: translate("christmas-delivery-mayhem.zombieEnemyDescription"),
  },
};

export const CHRITSMAS_NPC_WEARABLES: Equipped = NPC_WEARABLES["elf"];
