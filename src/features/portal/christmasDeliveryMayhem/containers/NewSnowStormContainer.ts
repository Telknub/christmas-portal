import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { BaseScene, WALKING_SPEED } from "features/world/scenes/BaseScene";
import {
  SLOWDOWN_SPEED,
  DURATION_SNOWSTORM,
  SPEEDUP,
} from "../ChristmasDeliveryMayhemConstants";

interface Props {
  x: number;
  y: number;
  scene: BaseScene;
  player?: BumpkinContainer;
  removedAnim?: boolean;
}

export class NewSnowStormContainer extends Phaser.GameObjects.Container {
  private player?: BumpkinContainer;
  private sprite: Phaser.GameObjects.Sprite;
  scene: BaseScene;
  private randomDirection!: string; // Store the random direction
  public isActive = true; // Flag to track active snowstorm
  private startTime: number = 0; // Track the start time of the snowstorm

  constructor({ x, y, scene, player }: Props) {
    super(scene, x, y);
    this.scene = scene;
    this.player = player;

    const spriteName = "corn_maze_clouds";
    this.sprite = scene.add.sprite(0, 0, spriteName).setOrigin(0);

    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);

    this.sprite.setVisible(false);

    scene.add.existing(this);
  }

  // Activate the snowstorm event
  activateSnowstorm() {
    this.initializeSnowStorm();
    console.log("Snowstorm activated.");
  }

  // Deactivate the snowstorm event
  deactivateSnowstorm() {
    this.isActive = false;
    this.scene.velocity = WALKING_SPEED;

    this.sprite.setVisible(false);
    this.randomDirection = "";
    this.startTime = 0;
    console.log("Snowstorm deactivated and variables cleared.");
  }

  initializeSnowStorm() {
    this.sprite.setVisible(true);
    this.sprite.setDepth(100000000000);
    this.isActive = true; // Snowstorm starts
    this.randomDirection = this.generateRandomDirection();
    this.startTime = this.scene.time.now;
  }

  generateRandomDirection(): string {
    const directions = ["left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }

  speedDirection() {
    if (this.scene.currentPlayer?.directionFacing === this.randomDirection) {
      this.scene.velocity = WALKING_SPEED - SLOWDOWN_SPEED;
      console.log("slower");
    } else {
      const newSpeed = (this.scene.velocity = WALKING_SPEED + SPEEDUP);
      console.log("faster", newSpeed);
    }
  }
}
