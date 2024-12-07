import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { BaseScene } from "features/world/scenes/BaseScene";
import { Gifts } from "../ChristmasDeliveryMayhemConstants";
import { MachineInterpreter } from "../lib/christmasDeliveryMayhemMachine";
import { GiftContainer } from "./GiftContainer";

interface Props {
  x: number;
  y: number;
  scene: BaseScene;
  direction: string;
  player?: BumpkinContainer;
}

export class ElfContainer extends Phaser.GameObjects.Container {
  private player?: BumpkinContainer;
  private sprite: Phaser.GameObjects.Sprite;

  scene: BaseScene;

  constructor({ x, y, scene, direction, player }: Props) {
    super(scene, x - 2, y - 3);
    this.scene = scene;
    this.player = player;

    // Elf Sprite
    const spriteName = "elf";
    const scale = direction === "right" ? 1 : -1;
    const originX = direction === "right" ? 0 : 1;
    const originY = direction === "right" ? 0 : 0;
    this.sprite = scene.add
      .sprite(0, 0, spriteName)
      .setOrigin(originX, originY)
      .setScale(scale, 1);

    // Animation
    this.scene.anims.create({
      key: `${spriteName}_action`,
      frames: this.scene.anims.generateFrameNumbers(spriteName, {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    this.sprite.play(`${spriteName}_action`, true);

    // Action - Overlap
    this.handleOverlap();

    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);

    scene.add.existing(this);
  }

  public get portalService() {
    return this.scene.registry.get("portalService") as
      | MachineInterpreter
      | undefined;
  }

  private handleOverlap() {
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
      () => this.deliverGifts(),
    );
  }

  private deliverGifts() {
    const myInventory = this.portalService?.state.context.gifts || [];
    if (myInventory?.length > 0) {
      this.animateRemoval();
      this.portalService?.send("CLEAR_INVENTORY");
    }
  }

  private animateRemoval() {
    const removedGifts = this.portalService?.state.context.gifts as string[];

    removedGifts.forEach((giftName, index) => {
      const gift = new GiftContainer({
        x: this.player?.x || 0,
        y: this.player?.y || 0,
        name: giftName as Gifts,
        scene: this.scene,
        removedAnim: true,
      });
      gift.playRemovalAnimation(index);
    });
  }
}
