import mapJson from "assets/map/christmasDeliveryMayhem.json";
import tilesetconfig from "assets/map/christmas_tileset.json";
import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";
import { SQUARE_WIDTH } from "features/game/lib/constants";
import { MachineInterpreter } from "./lib/christmasDeliveryMayhemMachine";
import { coalsAnim } from "./containers/CoalsContainer";
import { CoalBatchSpawner } from "./containers/CoalBatchSpawner";
import {
  COALS_CONFIGURATION,
  GIFT_CONFIGURATION,
  BONFIRE_CONFIGURATION,
  ELVES_CONFIGURATION,
  GRIT_CONFIGURATION,
  SNOWSTORM_CONFIGURATION,
  GRIT_DURATION,
} from "./ChristmasDeliveryMayhemConstants";
import { GiftContainer } from "./containers/GiftContainer";
import { BonfireContainer } from "./containers/BonfireContainer";
import { ElfContainer } from "./containers/ElfContainer";
import { GritContainer } from "./containers/GritContainer";
import { NewSnowStormContainer } from "./containers/NewSnowStormContainer";

// export const NPCS: NPCBumpkin[] = [
//   {
//     x: 380,
//     y: 400,
//     // View NPCModals.tsx for implementation of pop up modal
//     npc: "portaller",
//   },
// ];

export class ChristmasDeliveryMayhemScene extends BaseScene {
  sceneId: SceneId = "christmas_delivery_mayhem";
  private gifts!: GiftContainer[];
  private snowStorm!: NewSnowStormContainer;
  private gritContainer!: GritContainer;
  private coalsArray: (Phaser.Physics.Arcade.Sprite & {
    respawnTimer?: Phaser.Time.TimerEvent;
  })[] = [];

  constructor() {
    super({
      name: "christmas_delivery_mayhem",
      map: {
        json: mapJson,
        imageKey: "christmas-tileset",
        defaultTilesetConfig: tilesetconfig,
      },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    super.preload();

    // subject to change
    this.load.spritesheet("poof", "world/poof.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    // subject to change
    this.load.spritesheet("castle_bud_1", "world/castle_bud_1.webp", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("castle_bud_2", "world/castle_bud_2.webp", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // subject to change
    this.load.spritesheet("sand", "world/sand.webp", {
      frameWidth: 14,
      frameHeight: 10,
    });

    // subject to change
    this.load.spritesheet("corn_maze_clouds", "world/corn_maze_clouds.png", {
      frameWidth: 640,
      frameHeight: 640,
    });

    // Gifts
    this.load.spritesheet("gift_1", "world/gift_1.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_2", "world/gift_2.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_3", "world/gift_3.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_4", "world/gift_4.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_5", "world/gift_5.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_6", "world/gift_6.png", {
      frameWidth: 16,
      frameHeight: 18,
    });

    // Bonfire
    this.load.spritesheet("bonfire", "world/bonfire.png", {
      frameWidth: 23,
      frameHeight: 40,
    });

    // Elves
    this.load.spritesheet("elf", "world/elf.png", {
      frameWidth: 20,
      frameHeight: 19,
    });
  }

  async create() {
    this.map = this.make.tilemap({
      key: "christmas_delivery_mayhem",
    });

    super.create();

    this.createGifts();
    this.createBonfires();
    this.createElves();
    this.createGrit();
    this.createSnowStorm();

    this.physics.world.drawDebug = false;
    this.initializeCoals(COALS_CONFIGURATION);

    //For testing only. Remove when not used.
    setTimeout(() => {
      if (this.gritContainer) {
        this.gritContainer.deactivate();
      }
    }, 20000); // 20000

    //For testing only. Remove when not used.
    setTimeout(() => {
      if (this.snowStorm) {
        this.snowStorm.deactivateSnowstorm(); // Deactivate the snowstorm after 10 seconds
      }
    }, 20000); // 20000

    // this.initialiseNPCs(NPCS);
  }

  private get isGameReady() {
    return this.portalService?.state.matches("ready") === true;
  }

  public get portalService() {
    return this.registry.get("portalService") as MachineInterpreter | undefined;
  }

  update() {
    super.update();

    if (this.snowStorm?.isActive) {
      this.snowStorm.speedDirection();
    }

    // Player current position
    // console.log({y: this.currentPlayer?.y, x: this.currentPlayer?.x})

    if (this.isGameReady) {
      this.portalService?.send("START");
    }
  }

  // Initialize Coals
  initializeCoals(coalsConfig: { x: number; y: number }[]) {
    const coalBatchSpawner = new CoalBatchSpawner(this, coalsConfig);
    coalBatchSpawner.spawnInBatches();
  }

  coals(x: number, y: number) {
    // subject to change
    const coal = this.physics.add.sprite(
      x,
      y,
      // subject to change "sand"
      "sand",
    ) as Phaser.Physics.Arcade.Sprite & {
      respawnTimer?: Phaser.Time.TimerEvent;
    };
    coal.setOrigin(0);
    coal.setSize(SQUARE_WIDTH, SQUARE_WIDTH);
    coal.setImmovable(true);
    coal.setCollideWorldBounds(true);

    this.coalsArray.push(coal);

    if (this.currentPlayer) {
      this.physics.add.overlap(
        coal,
        this.currentPlayer,
        () => coalsAnim(coal, this, this.coalsArray),
        undefined,
        this,
      );
    }
  }

  private createSnowStorm() {
    this.snowStorm = new NewSnowStormContainer({
      x: SNOWSTORM_CONFIGURATION.x,
      y: SNOWSTORM_CONFIGURATION.y,
      scene: this,
      player: this.currentPlayer,
    });
    // this.snowStorm.activateSnowstorm();
  }

  private createGrit() {
    GRIT_CONFIGURATION.forEach((config) => {
      this.gritContainer = new GritContainer({
        x: config.x,
        y: config.y,
        scene: this,
        gifts: this.gifts,
        player: this.currentPlayer,
      });
      this.gritContainer.activate();
    });
  }

  private createGifts() {
    this.gifts = GIFT_CONFIGURATION.map(
      (config) =>
        new GiftContainer({
          x: config.x,
          y: config.y,
          scene: this,
          name: config.name,
          player: this.currentPlayer,
        }),
    );
  }

  private createBonfires() {
    BONFIRE_CONFIGURATION.forEach(
      (config) =>
        new BonfireContainer({
          x: config.x,
          y: config.y,
          scene: this,
          player: this.currentPlayer,
        }),
    );
  }

  private createElves() {
    ELVES_CONFIGURATION.forEach(
      (config) =>
        new ElfContainer({
          x: config.x,
          y: config.y,
          scene: this,
          direction: config.direction,
          player: this.currentPlayer,
        }),
    );
  }

  private setDefaultState() {}
}
