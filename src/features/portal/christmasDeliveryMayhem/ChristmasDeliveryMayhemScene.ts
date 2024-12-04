import mapJson from "assets/map/christmasDeliveryMayhem.json";
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
} from "./ChristmasDeliveryMayhemConstants";
import { SnowStorm } from "./containers/SnowStormContainer";
import { GiftContainer } from "./containers/GiftContainer";
import { BonfireContainer } from "./containers/BonfireContainer";

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
  private snowStorm!: SnowStorm;
  private coalsArray: (Phaser.Physics.Arcade.Sprite & {
    respawnTimer?: Phaser.Time.TimerEvent;
  })[] = [];

  constructor() {
    super({
      name: "christmas_delivery_mayhem",
      map: {
        json: mapJson,
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
    this.load.spritesheet("gift_1", "world/page.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("gift_2", "world/camel_bone.webp", {
      frameWidth: 13,
      frameHeight: 16,
    });
    this.load.spritesheet("gift_3", "world/candy_icon.png", {
      frameWidth: 14,
      frameHeight: 14,
    });
    this.load.spritesheet("gift_4", "world/exchange_disc.png", {
      frameWidth: 18,
      frameHeight: 19,
    });
    this.load.spritesheet("gift_5", "world/hieroglyph.webp", {
      frameWidth: 16,
      frameHeight: 13,
    });
    this.load.spritesheet("gift_6", "world/rabbit_3.png", {
      frameWidth: 17,
      frameHeight: 18,
    });

    // Bonfire
    this.load.spritesheet("bonfire", "world/bonfire.png", {
      frameWidth: 23,
      frameHeight: 40,
    });
  }

  async create() {
    this.map = this.make.tilemap({
      key: "christmas_delivery_mayhem",
    });

    super.create();

    this.createGifts();
    this.createBonfires();

    this.physics.world.drawDebug = false;
    this.initializeCoals(COALS_CONFIGURATION);

    this.snowStorm = new SnowStorm(
      this,
      // subject to change
      "corn_maze_clouds",
      "corn_maze_clouds_anim",
    );

    this.snowStorm.createSnowStorm();

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

  private createGifts() {
    GIFT_CONFIGURATION.forEach(
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

  private setDefaultState() {}
}
