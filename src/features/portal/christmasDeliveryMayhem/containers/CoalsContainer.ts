import Phaser from "phaser";
import { SQUARE_WIDTH } from "features/game/lib/constants";
import {
  KRAMPUS_DURATION,
  COAL_RESPAWN,
} from "../ChristmasDeliveryMayhemConstants";

export function coalsAnim(
  coal: Phaser.Physics.Arcade.Sprite & {
    respawnTimer?: Phaser.Time.TimerEvent;
  },
  scene: Phaser.Scene,
  coalsArray: Phaser.Physics.Arcade.Sprite[],
  krampusDuration: number = KRAMPUS_DURATION,
  coalRespawn: number = COAL_RESPAWN,
) {
  const { x, y } = coal;

  // subject to change "poof"
  // Play the poof animation
  const poof = scene.add.sprite(x, y, "poof").setOrigin(0.2, 0.5);
  if (!scene.anims.exists("poof_anim")) {
    scene.anims.create({
      key: "poof_anim",
      frames: scene.anims.generateFrameNumbers("poof", { start: 0, end: 7 }),
      repeat: 0,
      frameRate: 10,
    });
  }
  poof.play("poof_anim", true);

  // subject to change
  // On poof animation complete
  poof.on("animationcomplete", () => {
    poof.destroy();

    // subject to change "castle_bud_1"
    // Spawn the castle_bud_1 sprite
    const krampus = scene.add.sprite(x, y, "castle_bud_1").setOrigin(0.3, 0.5);

    // subject to change "castle_bud_1_anim"
    // Create the castle_bud_1 animation if it doesn't exist
    if (!scene.anims.exists("castle_bud_1_anim")) {
      scene.anims.create({
        key: "castle_bud_1_anim",
        frames: scene.anims.generateFrameNumbers("castle_bud_1", {
          start: 0,
          end: 7,
        }),
        repeat: -1,
        frameRate: 5,
      });
    }
    krampus.play("castle_bud_1_anim", true);

    // Remove the castle_bud_1 sprite after 2 seconds
    scene.time.delayedCall(krampusDuration, () => {
      krampus.destroy();

      // subject to change "poof"
      // Optional: Play the poof animation again to indicate disappearance
      const poofAgain = scene.add.sprite(x, y, "poof").setOrigin(0.2, 0.5);
      poofAgain.play("poof_anim", true);
      poofAgain.on("animationcomplete", () => {
        poofAgain.destroy();
      });
    });
  });

  coal.destroy();
  coalsArray = coalsArray.filter((sprite) => sprite !== coal);

  coal.respawnTimer = scene.time.delayedCall(
    coalRespawn,
    () => {
      // subject to change "sand"
      const newCoal = scene.physics.add.sprite(
        x,
        y,
        "sand",
      ) as Phaser.Physics.Arcade.Sprite & {
        respawnTimer?: Phaser.Time.TimerEvent;
      };
      newCoal.setOrigin(0);
      newCoal.setSize(SQUARE_WIDTH, SQUARE_WIDTH);
      newCoal.setImmovable(true);
      newCoal.setCollideWorldBounds(true);

      coalsArray.push(newCoal);

      const currentPlayer = (scene as any).currentPlayer;
      if (currentPlayer) {
        scene.physics.add.overlap(
          newCoal,
          currentPlayer,
          () => coalsAnim(newCoal, scene, coalsArray),
          undefined,
          scene,
        );
      }
    },
    undefined,
    scene,
  );
}
