import mapJSON from "public/assets/map/goblin_house.json";

import { SceneId } from "../mmoMachine";
import { NPCBumpkin } from "./BaseScene";
import { FactionHouseScene } from "./FactionHouseScene";

export const GOBLIN_HOUSE_NPCS: NPCBumpkin[] = [
  {
    // Trader
    x: 410,
    y: 200,
    npc: "glinteye",
    direction: "left",
  },
  {
    x: 378,
    y: 336,
    npc: "grizzle",
    direction: "left",
  },
  {
    x: 110,
    y: 239,
    npc: "chef tuck",
  },
];

export class GoblinHouseScene extends FactionHouseScene {
  sceneId: SceneId = "goblin_house";

  constructor() {
    super({
      name: "goblin_house",
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

    this.initialiseNPCs(GOBLIN_HOUSE_NPCS);

    this.setupPrize({ x: 240, y: 416 });
  }
}
