import mapJson from "assets/map/plaza.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";
import { Label } from "../containers/Label";

export const PLAZA_BUMPKINS: NPCBumpkin[] = [
  {
    x: 400,
    y: 400,
    npc: "pumpkin' pete",
  },
  {
    x: 815,
    y: 213,
    npc: "frankie",
    direction: "left",
  },
  {
    x: 312,
    y: 245,
    npc: "stella",
  },
  {
    x: 625,
    y: 110,
    npc: "timmy",
  },
  {
    x: 307,
    y: 72,
    npc: "raven",
    direction: "left",
  },
  {
    x: 364,
    y: 120,
    npc: "blacksmith",
  },
  {
    x: 760,
    y: 390,
    npc: "grimbly",
  },
  {
    x: 810,
    y: 380,
    npc: "grimtooth",
    direction: "left",
  },
  {
    x: 120,
    y: 170,
    npc: "gabi",
  },
  {
    x: 480,
    y: 140,
    npc: "cornwell",
  },
  {
    x: 795,
    y: 118,
    npc: "bert",
    direction: "left",
  },
  {
    x: 513,
    y: 288,
    npc: "betty",
    direction: "left",
  },
  {
    x: 33,
    y: 321,
    npc: "old salty",
  },
  {
    x: 840,
    y: 291,
    npc: "grubnuk",
    direction: "left",
  },
  {
    x: 90,
    y: 70,
    npc: "tywin",
  },
  {
    x: 430,
    y: 350,
    npc: "luna",
  },
];
export class PlazaScene extends BaseScene {
  sceneId: SceneId = "plaza";

  constructor() {
    super({
      name: "plaza",
      map: { json: mapJson },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    this.load.spritesheet("plaza_bud", "world/plaza_bud.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("plaza_bud_2", "world/plaza_bud_2.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("plaza_bud_3", "world/plaza_bud_3.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    super.preload();
  }

  async create() {
    this.map = this.make.tilemap({
      key: "main-map",
    });

    super.create();

    this.initialiseNPCs(PLAZA_BUMPKINS);

    const auctionLabel = new Label(this, "AUCTIONS", "brown");
    auctionLabel.setPosition(591, 260);
    auctionLabel.setDepth(10000000);
    this.add.existing(auctionLabel);

    // const clotheShopLabel = new Label(this, "STYLIST", "brown");
    // clotheShopLabel.setPosition(256, 264);
    // clotheShopLabel.setDepth(10000000);
    // this.add.existing(clotheShopLabel);

    // const decorationShopLabel = new Label(this, "DECORATIONS", "brown");
    // decorationShopLabel.setPosition(802, 229);
    // decorationShopLabel.setDepth(10000000);
    // this.add.existing(decorationShopLabel);

    // Plaza Bud
    const bud = this.add.sprite(500, 420, "plaza_bud");
    this.anims.create({
      key: "plaza_bud_animation",
      frames: this.anims.generateFrameNumbers("plaza_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud.play("plaza_bud_animation", true);

    // Plaza Bud
    const bud2 = this.add.sprite(601, 200, "plaza_bud_2");
    this.anims.create({
      key: "plaza_bud_animation_2",
      frames: this.anims.generateFrameNumbers("plaza_bud_2", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud2.play("plaza_bud_animation_2", true);
    bud2.setDepth(100000000000);

    const bud3 = this.add.sprite(206, 266, "plaza_bud_3");
    this.anims.create({
      key: "plaza_bud_animation_3",
      frames: this.anims.generateFrameNumbers("plaza_bud_3", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud3.play("plaza_bud_animation_3", true);
  }
}
