import mapJSON from "assets/map/retreat.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";
import { CONFIG } from "lib/config";
import { interactableModalManager } from "../ui/InteractableModals";

const BUMPKINS: NPCBumpkin[] = [
  {
    npc: "goblet",
    x: 295,
    y: 62,
    direction: "right",
  },
  {
    npc: "guria",
    x: 392,
    y: 230,
    direction: "right",
  },
  {
    npc: "grubnuk",
    x: 435,
    y: 220,
    direction: "left",
  },
  {
    npc: "garbo",
    x: 72,
    y: 70,
    direction: "right",
  },
  {
    npc: "grabnab",
    x: 87,
    y: 237,
    direction: "right",
  },
  {
    npc: "gordo",
    x: 574,
    y: 277,
    direction: "left",
  },
];

export class RetreatScene extends BaseScene {
  sceneId: SceneId = "retreat";

  constructor() {
    super({
      name: "retreat",
      map: { json: mapJSON, imageKey: "goblin-tileset" },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    super.preload();

    // Phaser assets must be served from an URL
    this.load.image(
      "goblin-tileset",
      `${CONFIG.PROTECTED_IMAGE_URL}/world/goblin_map-extruded.png`
    );

    this.load.image("wishing_well", `world/goblin_wishing_well.png`);
    this.load.image("balloon", `world/hot_air_balloon.png`);
    this.load.image("bank", `world/goblin_bank.png`);
    this.load.image("exchange", `world/goblin_exchange.png`);
    this.load.spritesheet("blacksmith", `world/goblin_blacksmith.png`, {
      frameWidth: 121,
      frameHeight: 86,
    });

    this.load.spritesheet("raffle", "world/raffle.webp", {
      frameWidth: 33,
      frameHeight: 28,
    });
    this.load.image("raffle_disc", "world/raffle_disc.png");
    this.load.image("exchange_disc", "world/exchange_disc.png");
    this.load.image("withdraw_disc", "world/withdraw_disc.png");
    this.load.spritesheet("garbage_collector", "world/garbage_collector.png", {
      frameWidth: 58,
      frameHeight: 49,
    });
    this.load.spritesheet("garbage_smoke", "world/smoke1.png", {
      frameWidth: 10,
      frameHeight: 30,
    });
    this.load.spritesheet("fire", "world/fire_sheet.png", {
      frameWidth: 8,
      frameHeight: 12,
    });
  }

  create() {
    this.map = this.make.tilemap({
      key: "retreat",
    });

    super.create();

    this.initialiseNPCs(BUMPKINS);

    const exchange = this.add.sprite(114, 215, "exchange");
    // On click
    exchange.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      console.log("OPEN EXCHANGE");
    });

    this.add.sprite(422, 84, "withdraw_disc").setDepth(1000000000);

    const bank = this.add.sprite(422, 94, "bank");
    bank.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      interactableModalManager.open("bank");
    });

    this.add.sprite(532, 51, "raffle_disc").setDepth(1000000000);

    this.add.sprite(147, 200, "exchange_disc").setDepth(1000000000);

    const wishingWell = this.add.sprite(532, 71, "wishing_well");
    wishingWell.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      interactableModalManager.open("wishingWell");
    });

    this.add.sprite(513, 404, "balloon");

    const blacksmith = this.add.sprite(193, 77, "blacksmith");
    this.anims.create({
      key: "blacksmith_animation",
      frames: this.anims.generateFrameNumbers("blacksmith", {
        start: 0,
        end: 11,
      }),
      repeat: -1,
      frameRate: 10,
    });
    blacksmith.play("blacksmith_animation", true);

    const fire = this.add.sprite(415, 220, "fire");
    this.anims.create({
      key: "fire_anim",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
      frameRate: 10,
    });
    fire.play("fire_anim", true);

    const garbageCollector = this.add.sprite(72, 70, "garbage_collector");
    this.anims.create({
      key: "garbage_collector_anim",
      frames: this.anims.generateFrameNumbers("garbage_collector", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
      frameRate: 10,
    });
    garbageCollector.play("garbage_collector_anim", true);
    // ON click
    garbageCollector
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("garbage_collector");
      });

    const smoke = this.add.sprite(72, 46, "garbage_smoke");
    this.anims.create({
      key: "garbage_smoke_anim",
      frames: this.anims.generateFrameNumbers("garbage_smoke", {
        start: 0,
        end: 29,
      }),
      repeat: -1,
      frameRate: 8,
    });
    smoke.play("garbage_smoke_anim", true);

    this.add.sprite(256, 181, "raffle_disc").setDepth(1000000000);

    const raffle = this.add.sprite(256, 205, "raffle").setDepth(1000000000000);
    this.anims.create({
      key: "raffle_animation",
      frames: this.anims.generateFrameNumbers("raffle", {
        start: 0,
        end: 7,
      }),
      repeat: -1,
      frameRate: 4,
    });
    raffle.play("raffle_animation", true);

    raffle.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      interactableModalManager.open("raffle");
    });
  }
}
