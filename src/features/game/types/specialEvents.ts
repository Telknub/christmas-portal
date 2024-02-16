import { InventoryItemName, Wardrobe } from "./game";

export type SpecialEventName = "Lunar New Year" | "Earn Alliance Banner";

export type Task = {
  requirements: {
    items: Partial<Record<InventoryItemName, number>>;
    sfl: number;
  };
  reward: {
    wearables: Wardrobe;
    items: Partial<Record<InventoryItemName, number>>;
    sfl: number;
  };
  isAirdrop?: boolean;
  completedAt?: number;
};

export type SpecialEvent = {
  text: string;
  startAt: number;
  endAt: number;
  tasks: Task[];
  isEligible: boolean;
  requiresWallet: boolean;
};

export type CurrentSpecialEvents = Partial<Record<string, SpecialEvent>>;

export type SpecialEvents = {
  history: Record<number, Partial<Record<string, number>>>;
  current: CurrentSpecialEvents;
};
