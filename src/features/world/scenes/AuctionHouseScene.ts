import auctionJson from "assets/map/auction.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";

const BUMPKINS: NPCBumpkin[] = [
  {
    x: 167,
    y: 126,
    npc: "hammerin harry",
  },
];

export class AuctionScene extends BaseScene {
  sceneId: SceneId = "auction_house";

  constructor() {
    super({ name: "auction_house", map: { json: auctionJson } });
  }

  preload() {
    super.preload();
  }

  async create() {
    this.map = this.make.tilemap({
      key: "auction-map",
    });

    super.create();

    this.initialiseNPCs(BUMPKINS);
  }
}
