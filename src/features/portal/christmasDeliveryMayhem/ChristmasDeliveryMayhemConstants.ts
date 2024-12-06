import { Equipped } from "features/game/types/bumpkin";
import { ITEM_DETAILS } from "features/game/types/images";
import { translate } from "lib/i18n/translate";
import { NPC_WEARABLES } from "lib/npcs";
import { SQUARE_WIDTH } from "features/game/lib/constants";

export type Gifts =
  | "gift_1"
  | "gift_2"
  | "gift_3"
  | "gift_4"
  | "gift_5"
  | "gift_6";

export const UNLIMITED_ATTEMPTS_SFL = 25;
export const RESTOCK_ATTEMPTS_SFL = 10;
export const DAILY_ATTEMPTS = 1;
export const RESTOCK_ATTEMPTS = 3;

export const MAX_PLAYER_GIFTS = 3;
export const GAME_SECONDS = 180;
export const GAME_LIVES = 5;

// Gifts
export const GIFT_RESPAWN = 3000;

//Krampus Coals
export const KRAMPUS_DURATION = 1000; // Krampus spawn duration
export const COAL_RESPAWN = 10000; // Individual coal respawn
export const COAL_BATCH_SPAWN = 10000; // Delay between each batch spawn

//SnowStorm
export const SNOWSTORM_DELAY = 15000; // Snowstorm delay effect
export const DURATION_SNOWSTORM = 10000; // Snowstorm duration effect
export const SLOWDOWN_SPEED = 25; // Slowdown player
export const SPEEDUP = 25; // Speed up player

// Gift coordinates
export const GIFT_CONFIGURATION: { name: Gifts; x: number; y: number }[] = [
  // Left
  { name: "gift_1", x: SQUARE_WIDTH * 8, y: SQUARE_WIDTH * 3 },
  { name: "gift_2", x: SQUARE_WIDTH * 10, y: SQUARE_WIDTH * 3 },
  { name: "gift_3", x: SQUARE_WIDTH * 12, y: SQUARE_WIDTH * 3 },
  // Right
  { name: "gift_4", x: SQUARE_WIDTH * 21, y: SQUARE_WIDTH * 3 },
  { name: "gift_5", x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 3 },
  { name: "gift_6", x: SQUARE_WIDTH * 25, y: SQUARE_WIDTH * 3 },
];

// Bonfire coordinates
export const BONFIRE_CONFIGURATION = [
  { x: SQUARE_WIDTH * 16, y: SQUARE_WIDTH * 2 },
];

// Elves coordinates
export const ELVES_CONFIGURATION = [
  { x: SQUARE_WIDTH * 3, y: SQUARE_WIDTH * 13, direction: "right" },
  { x: SQUARE_WIDTH * 3, y: SQUARE_WIDTH * 17, direction: "right" },
  { x: SQUARE_WIDTH * 30, y: SQUARE_WIDTH * 13, direction: "left" },
  { x: SQUARE_WIDTH * 30, y: SQUARE_WIDTH * 17, direction: "left" },
];

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
  // Corners
  { x: SQUARE_WIDTH * 8, y: SQUARE_WIDTH * 6 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 6 },
  { x: SQUARE_WIDTH * 8, y: SQUARE_WIDTH * 17 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 17 },
  // Center
  { x: SQUARE_WIDTH * 17, y: SQUARE_WIDTH * 15 },
  { x: SQUARE_WIDTH * 16, y: SQUARE_WIDTH * 7 },
  { x: SQUARE_WIDTH * 22, y: SQUARE_WIDTH * 10 },
  { x: SQUARE_WIDTH * 14, y: SQUARE_WIDTH * 8 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 6 },
  { x: SQUARE_WIDTH * 19, y: SQUARE_WIDTH * 17 },
  { x: SQUARE_WIDTH * 10, y: SQUARE_WIDTH * 10 },
  { x: SQUARE_WIDTH * 13, y: SQUARE_WIDTH * 15 },
  { x: SQUARE_WIDTH * 18, y: SQUARE_WIDTH * 6 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 9 },
  { x: SQUARE_WIDTH * 13, y: SQUARE_WIDTH * 10 },
  { x: SQUARE_WIDTH * 16, y: SQUARE_WIDTH * 16 },
  { x: SQUARE_WIDTH * 21, y: SQUARE_WIDTH * 13 },
  { x: SQUARE_WIDTH * 18, y: SQUARE_WIDTH * 7 },
  { x: SQUARE_WIDTH * 11, y: SQUARE_WIDTH * 8 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 14 },
  { x: SQUARE_WIDTH * 8, y: SQUARE_WIDTH * 11 },
  { x: SQUARE_WIDTH * 19, y: SQUARE_WIDTH * 10 },
  // { x: 445, y: 39 },
  // { x: 105, y: 30 },
  // { x: 325, y: 260 },
  // { x: 316, y: 100 },
  // { x: 420, y: 210 },
  // { x: 93, y: 107 },
  // { x: 29, y: 215 },
  // { x: 118, y: 190 },
  // { x: 85, y: 125 },
  // { x: 102, y: 70 },
  // { x: 467, y: 50 },
  // { x: 55, y: 100 },
  // { x: 129, y: 200 },
  // { x: 12, y: 150 },
  // { x: 328, y: 150 },
  // { x: 453, y: 295 },
  // { x: 360, y: 210 },
  // { x: 400, y: 280 },
  // { x: 380, y: 40 },
  // { x: 395, y: 60 },
  // { x: 355, y: 230 },
  // { x: 332, y: 75 },
  // { x: 470, y: 120 },
  // { x: 490, y: 180 },
  // { x: 338, y: 270 },
  // { x: 32, y: 134 },
  // { x: 68, y: 295 },
  // { x: 143, y: 250 },
  // { x: 110, y: 270 },
  // { x: 45, y: 210 },
  // { x: 138, y: 160 },
  // { x: 45, y: 20 },
  // { x: 50, y: 90 },
  // { x: 375, y: 100 },
  // { x: 52, y: 215 },
  // { x: 116, y: 185 },
  // { x: 41, y: 110 },
  // { x: 72, y: 305 },
  // { x: 365, y: 220 },
];

export const DROP_ANIMATION_GIFT_CONFIGURATION: {
  [key: number]: { x: number; y: number };
} = {
  0: { x: 15, y: 5 },
  1: { x: -15, y: 5 },
  2: { x: 28, y: 5 },
};

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
