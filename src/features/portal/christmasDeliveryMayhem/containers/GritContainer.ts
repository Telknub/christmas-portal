import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { BaseScene } from "features/world/scenes/BaseScene";
import { MachineInterpreter } from "../lib/christmasDeliveryMayhemMachine";
import { GRIT_TARGET_Y, GRIT_DURATION, GRIT_DURATION_ANIM } from "../ChristmasDeliveryMayhemConstants";

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
  private isActive: boolean = true; // Track if the container is active
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

    scene.add.existing(this);
  }

  public get portalService() {
    return this.scene.registry.get("portalService") as
      | MachineInterpreter
      | undefined;
  }

  private Grit() {
    if (!this.player) return;

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

  private handleOverlap() {}

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
    this.scene.tweens.add({
      targets: this,
      y: GRIT_TARGET_Y,
      duration: GRIT_DURATION_ANIM, 
      ease: "Power2", 
      yoyo: true, 
      repeat: -1, 
    });

    this.scene.time.delayedCall(GRIT_DURATION, () => {
      this.removeLife(); // Remove a life if the player is destroyed
      this.destroy(); 
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

  // Activate the container
  public activate() {
    if (this.isActive) return; 
    this.isActive = true;
    this.setAlpha(1); 
    this.Grit(); 
    this.GritAnim(); 
    this.startMovement(); 
  }

  // Deactivate the container
  public deactivate() {
    if (!this.isActive) return; 
    this.isActive = false;
    this.setAlpha(0); 
    this.sprite.anims.stop(); 
    this.scene.tweens.killTweensOf(this);
  }
}
