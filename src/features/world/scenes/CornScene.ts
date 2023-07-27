import cornMazeJSON from "assets/map/corn_maze.json";
import { mazeManager } from "features/world/ui/MazeHud";

import { BaseScene, NPCBumpkin } from "./BaseScene";
import { CONFIG } from "lib/config";
import { SceneId } from "../mmoMachine";
import { NPC_WEARABLES } from "lib/npcs";
import { BumpkinContainer } from "../containers/BumpkinContainer";
import eventBus from "../lib/eventBus";

type Enemy = NPCBumpkin & {
  target: {
    x: number;
    y: number;
    direction: "vertical" | "horizontal";
    duration: number;
    hold?: boolean;
    startFacingLeft?: boolean;
    pause?: boolean;
  };
};

const ENEMIES: Enemy[] = [
  {
    x: 104,
    y: 328,
    npc: "dreadhorn",
    target: {
      x: 104,
      y: 471,
      direction: "vertical",
      duration: 2000,
      pause: true,
    },
  },
  {
    x: 57,
    y: 56,
    npc: "dreadhorn",
    target: {
      x: 294,
      y: 56,
      direction: "horizontal",
      duration: 3500,
    },
  },
  {
    x: 355,
    y: 458,
    npc: "dreadhorn",
    target: {
      x: 260,
      y: 458,
      direction: "horizontal",
      duration: 1800,
      hold: true,
      startFacingLeft: true,
    },
  },
  {
    x: 585,
    y: 506,
    npc: "dreadhorn",
    target: {
      x: 585,
      y: 217,
      direction: "vertical",
      duration: 3000,
    },
  },
  {
    x: 171,
    y: 123,
    npc: "dreadhorn",
    target: {
      x: 171,
      y: 275,
      direction: "vertical",
      duration: 2000,
    },
  },
];

export class CornScene extends BaseScene {
  sceneId: SceneId = "corn_maze";
  score = 0;
  health = 3;
  enemies?: Phaser.GameObjects.Group;

  constructor() {
    super({
      name: "corn_maze",
      map: {
        json: CONFIG.API_URL ? `${CONFIG.API_URL}/maps/corn` : cornMazeJSON,
      },
    });
  }

  preload() {
    super.preload();

    this.load.image("crow", "world/crow.png");
  }

  async create() {
    this.map = this.make.tilemap({
      key: "corn_maze",
    });

    super.create();
    this.setUpCrows();
    this.setUpEnemies();
    this.setUpEnemyColliders();
    mazeManager.sceneLoaded();

    eventBus.on("corn_maze:gameOver", () => {
      this.scene.pause();
    });
  }

  setUpCrows() {
    const crowsLayer = this.map.getLayer("Crows");
    if (crowsLayer) {
      // Access the tile data from the layer
      const tileData = crowsLayer.data;

      // Assuming the tilemap has a fixed tile width and height
      const tileWidth = this.map.tileWidth;
      const tileHeight = this.map.tileHeight;

      // Now, you can iterate through the tile data and get the positions of the sprites
      for (let y = 0; y < this.map.height; y++) {
        for (let x = 0; x < this.map.width; x++) {
          const tile = tileData[y][x];
          if (tile.index !== -1) {
            // 'tile' represents each tile in the layer

            // Access the position of the sprite
            const spriteX = x * tileWidth + tileWidth / 2;
            const spriteY = y * tileHeight + tileHeight / 2;

            const crow = this.physics.add.sprite(spriteX, spriteY, "crow");
            // on collision with player, collect crow
            if (this.currentPlayer) {
              this.physics.add.overlap(this.currentPlayer, crow, () => {
                this.collect(`${spriteX}-${spriteY}`);
                crow.destroy();
              });
            }
          }
        }
      }
    }
  }

  handleDirectionChange(enemy: Enemy, container: BumpkinContainer) {
    const startDirection = enemy.target.startFacingLeft ? "left" : "right";
    if (startDirection === "right") {
      if (
        container.x === enemy.target.x &&
        container.directionFacing === "right"
      ) {
        container.faceLeft();
      } else if (
        container.x === enemy.x &&
        container.directionFacing === "left"
      ) {
        container.faceRight();
      }
    } else {
      if (
        container.x === enemy.target.x &&
        container.directionFacing === "left"
      ) {
        container.faceRight();
      } else if (
        container.x === enemy.x &&
        container.directionFacing === "right"
      ) {
        container.faceLeft();
      }
    }
  }

  handleRandomEnemyHold(
    tween: Phaser.Tweens.Tween,
    enemy: Enemy,
    container: BumpkinContainer
  ) {
    // Generate a random hold time between 500ms and 2000ms (adjust as needed)
    const minHoldTime = 1; // Minimum hold time in milliseconds
    const maxHoldTime = 1500; // Maximum hold time in milliseconds
    const randomHoldTime = Phaser.Math.Between(minHoldTime, maxHoldTime);

    if (
      enemy.target.direction === "horizontal" &&
      container.x === enemy.target.x
    ) {
      tween.pause();

      setTimeout(() => {
        tween.resume();
      }, randomHoldTime);
    } else if (
      enemy.target.direction === "vertical" &&
      container.y === enemy.target.y
    ) {
      tween.pause();

      setTimeout(() => {
        tween.resume();
      }, randomHoldTime);
    }
  }

  setUpEnemies() {
    this.enemies = this.add.group();
    ENEMIES.forEach((enemy) => {
      const container = new BumpkinContainer({
        scene: this,
        x: enemy.x,
        y: enemy.y,
        clothing: {
          ...(enemy.clothing ?? NPC_WEARABLES[enemy.npc]),
          updatedAt: 0,
        },
        direction: enemy.target.startFacingLeft ? "left" : "right",
      });

      container.setDepth(enemy.y);
      (container.body as Phaser.Physics.Arcade.Body)
        .setSize(16, 20)
        .setOffset(0, 0)
        .setCollideWorldBounds(true);

      this.physics.world.enable(container);
      this.enemies?.add(container);

      // Create a tween configuration object
      const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
        targets: container,
        x: enemy.target.x,
        y: enemy.target.y,
        duration: enemy.target.duration,
        ease: "Linear",
        repeat: -1,
        yoyo: true,
        onUpdate: (tween, target) => {
          if (enemy.target.direction === "horizontal") {
            this.handleDirectionChange(enemy, target as BumpkinContainer);
          }

          if (enemy.target.hold) {
            this.handleRandomEnemyHold(
              tween,
              enemy,
              target as BumpkinContainer
            );
          }
        },
      };

      // Create the tween
      this.tweens.add(tweenConfig);
    });
  }

  setUpEnemyColliders() {
    if (!this.currentPlayer || !this.enemies) return;

    this.physics.add.overlap(this.currentPlayer, this.enemies, () => {
      if (!this.currentPlayer?.invincible) {
        mazeManager.hit();
        this.currentPlayer?.hitPlayer();
      }
    });
  }

  collect(id: string) {
    mazeManager.collect(id);
  }
}
