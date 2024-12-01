import { BaseScene, WALKING_SPEED } from "features/world/scenes/BaseScene";
import {
  SNOWSTORM_DELAY,
  SLOWDOWN_SPEED,
  DURATION_SNOWSTORM,
  SPEEDUP,
} from "../ChristmasDeliveryMayhemConstants";

interface SnowstormSettings {
  spawnDelay?: number;
  spawnDuration?: number;
  originalSpeed?: number;
  slowDown?: number;
  speedUp?: number;
}

export class SnowStorm {
  private scene: BaseScene;
  private snowStormKey: string;
  private animationKey: string;
  private spawnDelay: number;
  private spawnDuration: number;
  private originalSpeed: number;
  private slowDown: number;
  private speedUp: number;
  private randomDirection!: string; // Store the random direction
  public isActive = false; // Flag to track active snowstorm

  constructor(
    scene: BaseScene,
    snowStormKey: string,
    animationKey: string,
    settings: SnowstormSettings = {},
  ) {
    this.scene = scene;
    this.snowStormKey = snowStormKey;
    this.animationKey = animationKey;
    this.spawnDelay = settings.spawnDelay ?? SNOWSTORM_DELAY;
    this.spawnDuration = settings.spawnDuration ?? DURATION_SNOWSTORM;
    this.originalSpeed = settings.originalSpeed ?? WALKING_SPEED;
    this.slowDown = settings.slowDown ?? SLOWDOWN_SPEED;
    this.speedUp = settings.speedUp ?? SPEEDUP;
  }

  createSnowStorm() {
    // subject to change
    this.scene.anims.create({
      key: this.animationKey,
      frames: this.scene.anims.generateFrameNumbers(this.snowStormKey, {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // this.scene.time.addEvent({
    //   delay: this.spawnDelay,
    //   loop: true,
    //   callback: () => this.spawnSnowStorm(),
    // });
  }

  spawnSnowStorm() {
    const x = 100; // Snowstorm coordinates
    const y = 20;

    const snowstorm = this.scene.add.sprite(x, y, this.snowStormKey);
    snowstorm.setDepth(100000000000);
    snowstorm.play(this.animationKey, true);

    this.isActive = true; // Snowstorm starts
    this.randomDirection = this.generateRandomDirection();

    this.scene.time.delayedCall(this.spawnDuration, () => {
      this.isActive = false; // Snowstorm ends
      this.scene.velocity = this.originalSpeed;
      snowstorm.destroy();
    });
  }

  generateRandomDirection(): string {
    const directions = ["left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }

  speedDirection() {
    if (this.scene.currentPlayer?.directionFacing === this.randomDirection) {
      this.scene.velocity = this.originalSpeed - this.slowDown;
      console.log("slower");
    } else {
      const newSpeed = (this.scene.velocity =
        this.originalSpeed + this.speedUp);
      console.log("faster", newSpeed);
    }
  }
}
