import mapJson from "assets/map/christmasDeliveryMayhem.json";
import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";
import { SQUARE_WIDTH } from "features/game/lib/constants";
import { MachineInterpreter } from "./lib/christmasDeliveryMayhemMachine";
import { coalsAnim } from "./containers/CoalsContainer";
import { CoalBatchSpawner } from "./containers/CoalBatchSpawner";
import { COALS_CONFIGURATION } from "./ChristmasDeliveryMayhemConstants";

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
  }

  async create() {
    this.map = this.make.tilemap({
      key: "christmas_delivery_mayhem",
    });

    super.create();

    this.physics.world.drawDebug = false;
    this.initializeCoals(COALS_CONFIGURATION);

    // this.initialiseNPCs(NPCS);
  }

  public get portalService() {
    return this.registry.get("portalService") as MachineInterpreter | undefined;
  }

  update() {
    super.update();
    
    // Player current position
    // console.log({y: this.currentPlayer?.y, x: this.currentPlayer?.x})
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
        () =>
          coalsAnim(
            coal,
            this,
            this.coalsArray,
          ),
        undefined,
        this,
      );
    }
  }

  private setDefaultState() {
  }
}
