import { SQUARE_WIDTH } from "features/game/lib/constants";
import { SpeechBubble } from "./SpeechBubble";
import { buildNPCSheets } from "features/bumpkins/actions/buildNPCSheets";
import { BumpkinParts, tokenUriBuilder } from "lib/utils/tokenUriBuilder";
import { Label } from "./Label";
import debounce from "lodash.debounce";

export class BumpkinContainer extends Phaser.GameObjects.Container {
  public sprite: Phaser.GameObjects.Sprite | undefined;
  public silhoutte: Phaser.GameObjects.Sprite | undefined;

  public speech: SpeechBubble | undefined;

  private clothing: BumpkinParts;
  private ready = false;

  // Animation Keys
  private idleAnimationKey: string | undefined;
  private walkingAnimationKey: string | undefined;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    clothing: BumpkinParts,
    onClick?: () => void,
    name?: string
  ) {
    super(scene, x, y);
    this.scene = scene;
    this.clothing = clothing;

    scene.physics.add.existing(this);

    this.silhoutte = scene.add.sprite(0, 0, "silhouette");
    this.add(this.silhoutte);
    this.sprite = this.silhoutte;

    this.loadSprites(scene);

    const shadow = this.scene.add
      .sprite(0.5, 8, "shadow")
      .setSize(SQUARE_WIDTH, SQUARE_WIDTH);

    this.add(shadow);

    this.setSize(SQUARE_WIDTH, SQUARE_WIDTH);

    if (name) {
      const label = new Label(this.scene, name.toUpperCase());
      this.add(label);
      label.setPosition(label.width / 2, -16);
    }

    this.scene.add.existing(this);

    if (onClick) {
      this.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
        onClick();
      });
    }
  }

  private async loadSprites(scene: Phaser.Scene) {
    const { sheets } = await buildNPCSheets({
      parts: this.clothing,
    });

    const keyName = tokenUriBuilder(this.clothing);
    const idleSpriteSheetKey = `${keyName}-bumpkin-idle-sheet`;
    const walkingSpriteSheetKey = `${keyName}-bumpkin-walking-sheet`;
    this.idleAnimationKey = `${keyName}-bumpkin-idle`;
    this.walkingAnimationKey = `${keyName}-bumpkin-walking`;

    if (scene.textures.exists(idleSpriteSheetKey)) {
      const idle = scene.add.sprite(0, 0, idleSpriteSheetKey).setOrigin(0.5);
      this.add(idle);
      this.sprite = idle;

      this.sprite.play(this.idleAnimationKey, true);

      this.silhoutte?.destroy();
    } else {
      const idleLoader = scene.load.spritesheet(
        idleSpriteSheetKey,
        sheets.idle,
        {
          frameWidth: 20,
          frameHeight: 19,
        }
      );

      idleLoader.on(Phaser.Loader.Events.COMPLETE, () => {
        if (!scene.textures.exists(idleSpriteSheetKey) || this.ready) {
          console.log("File did not load");
          return;
        }

        const idle = scene.add.sprite(0, 0, idleSpriteSheetKey).setOrigin(0.5);
        this.add(idle);
        this.sprite = idle;

        scene.anims.create({
          key: this.idleAnimationKey,
          frames: scene.anims.generateFrameNumbers(idleSpriteSheetKey, {
            start: 0,
            end: 8,
          }),
          repeat: -1,
          frameRate: 10,
        });

        this.sprite.play(this.idleAnimationKey as string, true);

        this.ready = true;
        this.silhoutte?.destroy();
      });
    }

    if (!scene.textures.exists(walkingSpriteSheetKey)) {
      const walkingLoader = scene.load.spritesheet(
        walkingSpriteSheetKey,
        sheets.walking,
        {
          frameWidth: 20,
          frameHeight: 19,
        }
      );

      walkingLoader.on(Phaser.Loader.Events.COMPLETE, () => {
        scene.anims.create({
          key: this.walkingAnimationKey,
          frames: scene.anims.generateFrameNumbers(walkingSpriteSheetKey, {
            start: 0,
            end: 7,
          }),
          repeat: -1,
          frameRate: 10,
        });
      });
    }

    scene.load.start();
  }

  public faceRight() {
    this.sprite?.setScale(1, 1);

    if (this.speech) {
      this.speech.setScale(1, 1);
      this.speech.changeDirection("right");
    }
  }

  public faceLeft() {
    this.sprite?.setScale(-1, 1);

    if (this.speech) {
      this.speech.changeDirection("left");
    }
  }

  /**
   * Use a debouncer to allow players new messages not to be destroyed by old timeouts
   */
  destroySpeechBubble = debounce(() => {
    this.speech?.destroy();
    this.speech = undefined;
  }, 5000);

  public speak(text: string) {
    if (this.speech) {
      this.speech.destroy();
    }

    this.speech = new SpeechBubble(
      this.scene,
      text,
      this.sprite?.scaleX === 1 ? "right" : "left"
    );
    this.add(this.speech);

    this.destroySpeechBubble();
  }

  public walk() {
    if (
      this.sprite?.anims &&
      this.scene?.anims.exists(this.walkingAnimationKey as string) &&
      this.sprite?.anims.getName() !== this.walkingAnimationKey
    ) {
      this.sprite.anims.play(this.walkingAnimationKey as string, true);
    }
  }

  public idle() {
    if (
      this.sprite?.anims &&
      this.scene?.anims.exists(this.idleAnimationKey as string) &&
      this.sprite?.anims.getName() !== this.idleAnimationKey
    ) {
      this.sprite.anims.play(this.idleAnimationKey as string, true);
    }
  }
}
