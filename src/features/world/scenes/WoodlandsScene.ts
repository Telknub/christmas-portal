import woodlandsJSON from "assets/map/woodlands.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";

const BUMPKINS: NPCBumpkin[] = [];

export class WoodlandsScene extends BaseScene {
  sceneId: SceneId = "woodlands";

  constructor() {
    super({
      name: "woodlands",
      map: { json: woodlandsJSON },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    super.preload();
  }

  async create() {
    console.log("Create woodlands shop");
    this.map = this.make.tilemap({
      key: "woodlands",
    });

    super.create();

    this.initialiseNPCs(BUMPKINS);
  }
}
