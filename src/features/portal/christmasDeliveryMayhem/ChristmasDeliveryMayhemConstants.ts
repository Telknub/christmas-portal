import { Equipped } from "features/game/types/bumpkin";
import { ITEM_DETAILS } from "features/game/types/images";
import { translate } from "lib/i18n/translate";
import { NPC_WEARABLES } from "lib/npcs";
import { SQUARE_WIDTH } from "features/game/lib/constants";

export const GIFTS_NAMES = [
  "gift_1",
  "gift_2",
  "gift_3",
  "gift_4",
  "gift_5",
  "gift_6",
] as const;

export type Gifts = (typeof GIFTS_NAMES)[number];

export const EVENTS_NAMES = ["storm", "krampus", "grit"] as const;

export type Events = (typeof EVENTS_NAMES)[number] | "";

export const UNLIMITED_ATTEMPTS_SFL = 25;
export const RESTOCK_ATTEMPTS_SFL = 10;
export const DAILY_ATTEMPTS = 1;
export const RESTOCK_ATTEMPTS = 3;

export const GAME_SECONDS = 300;
export const GAME_LIVES = 5;
export const MAX_PLAYER_GIFTS = 3;
export const MAX_GIFTS_PER_REQUEST = 3;
export const REQUEST_COOLDOWN = 3000;
export const REQUEST_TIME_LIMIT_PER_GIFTS: Record<number, number> = {
  1: 60000,
  2: 80000,
  3: 100000,
};

const PROGRESS_BAR_WIDTH_PERCENT = 0.75;
export const PROGRESS_BAR_WIDTH = SQUARE_WIDTH * PROGRESS_BAR_WIDTH_PERCENT;
export const PROGRESS_BAR_X =
  (SQUARE_WIDTH * (1 - PROGRESS_BAR_WIDTH_PERCENT)) / 2;

export const EVENT_INTERVAL = 45000;
export const EVENT_DURATION = 30000;
export const EVENT_SELECTION_TIME = 5000;

// Gifts
export const GIFT_RESPAWN = 3000;
export const GIFT_RESPAWN_TIME_AFTER_THEFT = 6000;

//SnowStorm
export const SNOWSTORM_DELAY = 15000; // Snowstorm delay effect
export const DURATION_SNOWSTORM = 10000; // Snowstorm duration effect
export const SLOWDOWN_SPEED = 25; // Slowdown player
export const SPEEDUP = 25; // Speed up player
export const SNOWSTORM_CONFIGURATION = { x: 25, y: 2 }; // Snow storm coordinates

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
export const ELVES_CONFIGURATION: {
  x: number;
  y: number;
  direction: "left" | "right";
}[] = [
  { x: SQUARE_WIDTH * 3, y: SQUARE_WIDTH * 13, direction: "right" },
  { x: SQUARE_WIDTH * 3, y: SQUARE_WIDTH * 17, direction: "right" },
  { x: SQUARE_WIDTH * 30, y: SQUARE_WIDTH * 13, direction: "left" },
  { x: SQUARE_WIDTH * 30, y: SQUARE_WIDTH * 17, direction: "left" },
];

// Grit initial coordinate
export const GRIT_CONFIGURATION = [
  { x: SQUARE_WIDTH * 16.5, y: SQUARE_WIDTH * 18 },
];

export const GRIT_DURATION = 30000; // Grits existence duration
export const GRIT_DURATION_ANIM = 4000; // Duration of the animation (5 seconds)
export const GRIT_TARGET_Y = SQUARE_WIDTH * 5; // Set the target Y position

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
  { x: SQUARE_WIDTH * 19, y: SQUARE_WIDTH * 17 },
  { x: SQUARE_WIDTH * 10, y: SQUARE_WIDTH * 10 },
  { x: SQUARE_WIDTH * 13, y: SQUARE_WIDTH * 15 },
  { x: SQUARE_WIDTH * 18, y: SQUARE_WIDTH * 6 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 9 },
  { x: SQUARE_WIDTH * 13, y: SQUARE_WIDTH * 10 },
  { x: SQUARE_WIDTH * 16, y: SQUARE_WIDTH * 16 },
  { x: SQUARE_WIDTH * 21, y: SQUARE_WIDTH * 13 },
  { x: SQUARE_WIDTH * 18, y: SQUARE_WIDTH * 12 },
  { x: SQUARE_WIDTH * 11, y: SQUARE_WIDTH * 8 },
  { x: SQUARE_WIDTH * 23, y: SQUARE_WIDTH * 14 },
  { x: SQUARE_WIDTH * 8, y: SQUARE_WIDTH * 11 },
  { x: SQUARE_WIDTH * 19, y: SQUARE_WIDTH * 10 },
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
