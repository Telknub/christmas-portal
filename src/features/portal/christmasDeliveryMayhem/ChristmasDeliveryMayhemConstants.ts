import { Equipped } from "features/game/types/bumpkin";
import { ITEM_DETAILS } from "features/game/types/images";
import { translate } from "lib/i18n/translate";
import { NPC_WEARABLES } from "lib/npcs";

export const UNLIMITED_ATTEMPTS_SFL = 25;
export const RESTOCK_ATTEMPTS_SFL = 10;
export const DAILY_ATTEMPTS = 1;
export const RESTOCK_ATTEMPTS = 3;

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
