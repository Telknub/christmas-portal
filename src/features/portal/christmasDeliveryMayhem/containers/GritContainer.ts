import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { BaseScene } from "features/world/scenes/BaseScene";
import { MachineInterpreter } from "../lib/christmasDeliveryMayhemMachine";
import {
  GRIT_TARGET_Y,
  GRIT_DURATION_ANIM,
} from "../ChristmasDeliveryMayhemConstants";
import { GiftContainer } from "./GiftContainer";

interface Props {
  x: number;
  y: number;
  scene: BaseScene;
  gifts: GiftContainer[];
  player?: BumpkinContainer;
}

export class GritContainer extends Phaser.GameObjects.Container {
  private player?: BumpkinContainer;
  private gifts: GiftContainer[];
  private sprite: Phaser.GameObjects.Sprite;
  scene: BaseScene;
  private spriteGritHide!: Phaser.GameObjects.Sprite;
  private initialY: number;
  private isActive = true; // Flag to track active
  private overlapHandler?: Phaser.Physics.Arcade.Collider;
  scene: BaseScene;

  constructor({ x, y, scene, gifts, player }: Props) {
    super(scene, x, y);
    this.scene = scene;
    this.player = player;
    this.gifts = gifts;
    this.initialY = y;

    const spriteName = "Grit_Carrying";
    this.sprite = scene.add.sprite(0, 0, spriteName).setOrigin(0);

    this.Grit();
    this.GritAnim();
    this.startMovement();

    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);

    this.sprite.setVisible(true);

    this.setDepth(10000);

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

    this.overlapHandler = this.scene.physics.add.overlap(
      this.player as Phaser.GameObjects.GameObject,
      this as Phaser.GameObjects.GameObject,
      () => this.handleOverlap(),
    );
  }

  private GritAnim() {
    if (!this.scene.anims.exists("Grit_Carrying_anim")) {
      this.scene.anims.create({
        key: "Grit_Carrying_anim",
        frames: this.scene.anims.generateFrameNumbers("Grit_Carrying", {
          start: 0,
          end: 7,
        }),
        repeat: -1,
        frameRate: 15,
      });
    }
    this.sprite.play("Grit_Carrying_anim", true);
  }

  private handleOverlap() {
    if (!this.isActive) return;
    this.scene.sound.play("grit-spawn");
    this.GritScapeAnim();
    this.scene.tweens.killTweensOf(this);
    this.collision();
  }

  private GritScapeAnim() {
    if (!this.scene.anims.exists("Grit_escape_anim")) {
      this.scene.anims.create({
        key: "Grit_escape_anim",
        frames: this.scene.anims.generateFrameNumbers("Grit_escape", {
          start: 0,
          end: 8,
        }),
        repeat: 0,
        frameRate: 8,
      });
    }

    // Create a new sprite for the escape animation
    const escapeSprite = this.scene.add.sprite(this.x, this.y, "Grit_escape");
    escapeSprite.setDepth(1); // Ensure it appears above other objects
    escapeSprite.play("Grit_escape_anim", true);
    escapeSprite.setOrigin(0);

    // Add a tween or timer to destroy the escape sprite after animation
    escapeSprite.on("animationcomplete", () => {
      escapeSprite.destroy();
    });
  }

  private startMovement() {
    if (!this.isActive) return;
    this.scene.tweens.add({
      targets: this,
      y: GRIT_TARGET_Y,
      duration: GRIT_DURATION_ANIM,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });
    this.scene.sound.play("grit-spawn");
  }

  // Remove one life from the player
  private removeLife() {
    if (this.portalService) {
      const currentLives = this.portalService.state.context.lives;
      if (currentLives > 0) {
        this.portalService.send({ type: "LOSE_LIFE" });
        this.scene.sound.play("bad-sound");
      }
    }
  }

  private collision() {
    if (this.isActive) {
      this.isActive = false;

      // Remove the overlap event
      if (this.overlapHandler) {
        this.scene.physics.world.removeCollider(this.overlapHandler);
        this.overlapHandler = undefined;
      }
      this.scene.tweens.killTweensOf(this);
      this.sprite.stop();
      this.scene.physics.world.disable(this);
      this.sprite.destroy();
      this.destroy();
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

      // Remove the overlap event
      if (this.overlapHandler) {
        this.scene.physics.world.removeCollider(this.overlapHandler);
        this.overlapHandler = undefined;
      }

      this.scene.tweens.killTweensOf(this);
      this.sprite.stop();
      this.scene.physics.world.disable(this);
      this.sprite.setVisible(false);
      this.removeLife();
      this.sprite.destroy();
      this.destroy();
    }
  }
}
