import mapJSON from "assets/map/faction_house.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";

export const NIGHTSHADE_HOUSE_NPCS: NPCBumpkin[] = [
  {
    x: 410,
    y: 200,
    npc: "dusk",
    direction: "left",
  },
];

export class NightshadeHouseScene extends BaseScene {
  sceneId: SceneId = "nightshade_house";

  constructor() {
    super({
      name: "nightshade_house",
      map: { json: mapJSON },
      audio: { fx: { walk_key: "wood_footstep" } },
    });
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
    this.map = this.make.tilemap({
      key: "faction_house",
    });

    this.initialiseNPCs(NIGHTSHADE_HOUSE_NPCS);
  }
}