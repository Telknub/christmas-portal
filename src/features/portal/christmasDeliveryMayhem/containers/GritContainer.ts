import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { BaseScene } from "features/world/scenes/BaseScene";
import { MachineInterpreter } from "../lib/christmasDeliveryMayhemMachine";
import {
  GRIT_TARGET_Y,
  GRIT_DURATION_ANIM,
} from "../ChristmasDeliveryMayhemConstants";

interface Props {
  x: number;
  y: number;
  scene: BaseScene;
  player?: BumpkinContainer;
  removedAnim?: boolean;
}

export class GritContainer extends Phaser.GameObjects.Container {
  private player?: BumpkinContainer;
  private sprite: Phaser.GameObjects.Sprite;
  private initialY: number;
  private isActive: boolean = true; // Flag to track active
  scene: BaseScene;

  constructor({ x, y, scene, player }: Props) {
    super(scene, x, y);
    this.scene = scene;
    this.player = player;
    this.initialY = y;

    const spriteName = "castle_bud_2";
    this.sprite = scene.add.sprite(0, 0, spriteName).setOrigin(0);

    this.Grit();
    this.GritAnim();
    this.startMovement();

    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);

    this.sprite.setVisible(true);

    scene.add.existing(this);
  }

  public get portalService() {
    return this.scene.registry.get("portalService") as
      | MachineInterpreter
      | undefined;
  }

  private Grit() {
    if (!this.player || !this.isActive) return;

    this.scene.physics.world.enable(this);

    (this.body as Phaser.Physics.Arcade.Body)
      .setSize(this.sprite.width, this.sprite.height)
      .setOffset(this.sprite.width / 2, this.sprite.height / 2)
      .setImmovable(true)
      .setCollideWorldBounds(true);

    this.scene.physics.add.overlap(
      this.player as Phaser.GameObjects.GameObject,
      this as Phaser.GameObjects.GameObject,
      () => this.handleOverlap(),
    );
  }

  private handleOverlap() {
    // Overlap logic here
  }

  private GritAnim() {
    if (!this.scene.anims.exists("castle_bud_2_anim")) {
      this.scene.anims.create({
        key: "castle_bud_2_anim",
        frames: this.scene.anims.generateFrameNumbers("castle_bud_2", {
          start: 0,
          end: 7,
        }),
        repeat: -1,
        frameRate: 10,
      });
    }
    this.sprite.play("castle_bud_2_anim", true);
  }

  private startMovement() {
    if (!this.isActive) return;

    this.scene.tweens.add({
      targets: this,
      y: GRIT_TARGET_Y,
      duration: GRIT_DURATION_ANIM,
      ease: "Power2",
      yoyo: true,
      repeat: -1,
    });
  }

  // Remove one life from the player
  private removeLife() {
    if (this.portalService) {
      const currentLives = this.portalService.state.context.lives;
      if (currentLives > 0) {
        this.portalService.send({ type: "LOSE_LIFE" });
      }
    }
  }

  // Activate the GritContainer, enabling movement, physics, and animation
  public activate() {
    if (!this.isActive) {
      this.isActive = true;
      this.sprite.setVisible(true);
      this.Grit();
      this.GritAnim();
      this.startMovement();
    }
  }

  // Deactivate the GritContainer, disabling movement, physics, and animation
  public deactivate() {
    if (this.isActive) {
      this.isActive = false;
      this.scene.tweens.killTweensOf(this);
      this.sprite.stop();
      this.scene.physics.world.disable(this);
      this.removeLife();
      this.sprite.destroy();
      this.destroy();
    }
  }
}
