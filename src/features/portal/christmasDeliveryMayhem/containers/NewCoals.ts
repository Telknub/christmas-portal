import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { BaseScene } from "features/world/scenes/BaseScene";
import { MachineInterpreter } from "../lib/christmasDeliveryMayhemMachine";
import {
  Gifts,
} from "../ChristmasDeliveryMayhemConstants";
import { GiftContainer } from "./GiftContainer";

interface Props {
  x: number;
  y: number;
  scene: BaseScene;
  player?: BumpkinContainer;
}

export class CoalsContainer extends Phaser.GameObjects.Container {
  private player?: BumpkinContainer;
  private sprite: Phaser.GameObjects.Sprite;
  scene: BaseScene;
  private isActive: boolean = true; // Flag to track active
  private overlapHandler?: Phaser.Physics.Arcade.Collider;


  constructor({ x, y, scene, player }: Props) {
    super(scene, x, y);
    this.scene = scene;
    this.player = player;

    const spriteName = "coal";
    this.sprite = scene.add.sprite(2, 2, spriteName).setOrigin(0, 0);

    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);

    this.Coal();

    this.sprite.setVisible(true)

    scene.add.existing(this);
  }

  public get portalService() {
    return this.scene.registry.get("portalService") as
      | MachineInterpreter
      | undefined;
  }

  private Coal() {
    if (!this.player || !this.isActive) return;

    this.scene.physics.world.enable(this);

    (this.body as Phaser.Physics.Arcade.Body)
      .setOffset(this.sprite.width / 1.5, this.sprite.height / 1.5)
      .setImmovable(true)
      .setCollideWorldBounds(true);

      this.overlapHandler = this.scene.physics.add.overlap(
        this.player as Phaser.GameObjects.GameObject,
        this as Phaser.GameObjects.GameObject,
        () => this.handleOverlap()
      );

  }

  private handleOverlap() {
    if (!this.isActive) return;
  
    this.isActive = false; 

    // Remove the overlap event
    if (this.overlapHandler) {
      this.scene.physics.world.removeCollider(this.overlapHandler);
      this.overlapHandler = undefined;
    }
  
    this.PoofAnim();
    this.sprite.destroy();
    this.removeGift()
  }

  // Remove one gift from the player
  private removeGift() {
    const removedGifts = this.portalService?.state.context.gifts as string[];

    if (removedGifts.length > 0) {
      const giftName = removedGifts.pop();
      if (giftName) {
        const gift = new GiftContainer({
          x: this.player?.x || 0,
          y: this.player?.y || 0,
          name: giftName as Gifts,          
          scene: this.scene,
          removedAnim: true,
        });
        gift.playRemovalAnimation(removedGifts.length);
        this.portalService?.send("CLEAR_INVENTORY");
        if (
          this.portalService &&
          this.portalService.state.context.gifts !== undefined
        ) {
          this.portalService.state.context.gifts = removedGifts;
        }
      }
    }
  }
  
  private PoofAnim() {
    if (!this.scene.anims.exists("coalspawn_spritesheet_anim")) {
      this.scene.anims.create({
        key: "coalspawn_spritesheet_anim",
        frames: this.scene.anims.generateFrameNumbers("coalspawn_spritesheet", {
          start: 0,
          end: 7,
        }),
        repeat: 0,
        frameRate: 10,
      });
    }
  
    const escapeSprite = this.scene.add.sprite(this.x, this.y, "coalspawn_spritesheet");
    escapeSprite.setDepth(1); 
    escapeSprite.play("coalspawn_spritesheet_anim", true);
    escapeSprite.setOrigin(-.2, .7)
  
    escapeSprite.on("animationcomplete", () => {
      escapeSprite.destroy();
      this.KrampusAnim();
    });
  }  

  private KrampusAnim() {
    if (!this.scene.anims.exists("krampus_anim")) {
      this.scene.anims.create({
        key: "krampus_anim",
        frames: this.scene.anims.generateFrameNumbers("krampus", {
          start: 0,
          end: 7,
        }),
        repeat: 0,
        frameRate: 10,
      });
    }
  
    const escapeSprite = this.scene.add.sprite(this.x, this.y, "krampus");
    escapeSprite.setDepth(1); 
    escapeSprite.play("krampus_anim", true);
    escapeSprite.setOrigin(0, 0.5)
  
    escapeSprite.on("animationcomplete", () => {
      escapeSprite.destroy();
      this.PoofAnim1();
    });
  }  

  private PoofAnim1() {
    if (!this.scene.anims.exists("coalspawn_spritesheet_anim")) {
      this.scene.anims.create({
        key: "coalspawn_spritesheet_anim",
        frames: this.scene.anims.generateFrameNumbers("coalspawn_spritesheet", {
          start: 0,
          end: 7,
        }),
        repeat: 0,
        frameRate: 10,
      });
    }
  
    const escapeSprite = this.scene.add.sprite(this.x, this.y, "coalspawn_spritesheet");
    escapeSprite.setDepth(1); 
    escapeSprite.play("coalspawn_spritesheet_anim", true);
    escapeSprite.setOrigin(-.2, .7)
  
    escapeSprite.on("animationcomplete", () => {
      escapeSprite.destroy();
    });
  }  
  
  // Activate function
  public activate() {
    if(!this.activate){
    this.isActive = true;
    this.sprite.setVisible(true);
    this.Coal();
  }
 }

  // Deactivate function
  public deactivate() {
    if(!this.activate){
    this.isActive = false;
    // Clear any active overlap handler and other states
    if (this.overlapHandler) {
      this.scene.physics.world.removeCollider(this.overlapHandler);
      this.overlapHandler = undefined;
    }
    this.sprite.setVisible(false);
    this.removeGift(); 
    this.sprite.setAlpha(0);
    } 
  }
}
