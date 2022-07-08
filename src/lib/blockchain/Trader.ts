import Web3 from "web3";
import { AbiItem, fromWei } from "web3-utils";

import { CONFIG } from "lib/config";

import TraderJSON from "./abis/Trader.json";
import { InventoryItemName } from "features/game/types/game";
import Decimal from "decimal.js-light";
import { KNOWN_IDS } from "features/game/types";

const address = CONFIG.TRADER_CONTRACT;

export type ItemLimits = Record<InventoryItemName, Decimal>;

export enum ListingStatus {
  EMPTY,
  LISTED,
  CANCELLED,
}

export type Listing = {
  id: number;
  status: ListingStatus;
  resourceId: number;
  resourceAmount: number;
  sfl: number;
  tax: number;
};

export type FarmSlot = {
  slotId: number;
  listing?: Listing;
};
/**
 * Trader contract
 */
export class Trader {
  private web3: Web3;
  private account: string;

  private contract: any;

  constructor(web3: Web3, account: string) {
    this.web3 = web3;
    this.account = account;
    this.contract = new this.web3.eth.Contract(
      TraderJSON as AbiItem[],
      address as string
    );
  }

  public async getFarmSlots(farmId: number): Promise<FarmSlot[]> {
    const farmSlots: {
      status: string;
      listingId: string;
      resourceId: string;
      resourceAmount: string;
      sfl: string;
      tax: string;
    }[] = await this.contract.methods.getFarmSlots(farmId, 3).call();

    console.log(farmSlots);

    return farmSlots.map((slot, index) => {
      if (slot.status == "0") {
        return { slotId: index };
      }
      return {
        slotId: index,
        listing: {
          id: Number(slot.listingId),
          status: Number(slot.status),
          resourceId: Number(slot.resourceId),
          resourceAmount: Number(fromWei(slot.resourceAmount)),
          sfl: Number(fromWei(slot.sfl)),
          tax: Number(slot.tax) / 1000,
        },
      };
    });
  }

  public async getRemainingListings(farmId: number): Promise<number> {
    return await this.contract.methods.getRemainingListings(farmId).call();
  }

  public async getLimits(): Promise<ItemLimits> {
    const ids = Object.values(KNOWN_IDS);
    const names = Object.keys(KNOWN_IDS) as InventoryItemName[];

    const limits: number[] = await this.contract.methods
      .getLimitBatch(ids)
      .call();

    return limits.reduce(
      (items, limit, index) => ({
        ...items,
        [names[index]]: new Decimal(fromWei(String(limit))),
      }),
      {} as ItemLimits
    );
  }
}
