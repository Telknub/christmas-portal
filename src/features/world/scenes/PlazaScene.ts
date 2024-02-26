import mapJson from "assets/map/plaza.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";
import { Label } from "../containers/Label";
import { interactableModalManager } from "../ui/InteractableModals";
import {
  AudioLocalStorageKeys,
  getCachedAudioSetting,
} from "../../game/lib/audio";
import { PlaceableContainer } from "../containers/PlaceableContainer";
import { budImageDomain } from "features/island/collectibles/components/Bud";
import { Page } from "../containers/Page";
import { BumpkinContainer } from "../containers/BumpkinContainer";
import { SOUNDS } from "assets/sound-effects/soundEffects";
import { getSeasonWeek } from "lib/utils/getSeasonWeek";
import { npcModalManager } from "../ui/NPCModals";
import { Coordinates } from "features/game/expansion/components/MapPlacement";
import { hasFeatureAccess } from "lib/flags";

export const PLAZA_BUMPKINS: NPCBumpkin[] = [
  {
    x: 600,
    y: 197,
    npc: "hammerin harry",
  },
  {
    x: 371,
    y: 420,
    npc: "pumpkin' pete",
  },
  {
    x: 815,
    y: 213,
    npc: "poppy",
    direction: "left",
  },
  {
    x: 321,
    y: 259,
    npc: "stella",
  },
  {
    x: 631,
    y: 98,
    npc: "timmy",
  },
  {
    x: 307,
    y: 72,
    npc: "raven",
    direction: "left",
  },
  {
    x: 367,
    y: 120,
    npc: "blacksmith",
  },
  {
    x: 760,
    y: 390,
    npc: "grimbly",
  },
  {
    x: 810,
    y: 380,
    npc: "grimtooth",
    direction: "left",
  },
  // {
  //   x: 120,
  //   y: 170,
  //   npc: "gabi",
  // },
  {
    x: 480,
    y: 140,
    npc: "cornwell",
  },
  {
    x: 795,
    y: 118,
    npc: "bert",
    direction: "left",
  },
  {
    x: 534,
    y: 88,
    npc: "betty",
    direction: "left",
  },
  {
    x: 729,
    y: 270,
    npc: "grubnuk",
    direction: "left",
  },
  {
    x: 834,
    y: 335,
    npc: "luna",
    direction: "left",
  },
  {
    x: 90,
    y: 70,
    npc: "tywin",
  },
  {
    x: 506,
    y: 250,
    npc: "birdie",
    direction: "left",
  },
  {
    x: 208,
    y: 402,
    npc: "billy",
  },
  {
    x: 214,
    y: 295,
    npc: "hank",
  },
  {
    x: 442,
    y: 163,
    npc: "mayor",
    direction: "left",
  },
];

const PAGE_POSITIONS: Record<number, Coordinates[]> = {
  1: [
    {
      x: 400,
      y: 420,
    },
    {
      x: 800,
      y: 300,
    },
    {
      x: 55,
      y: 200,
    },
  ],
  2: [
    {
      x: 775,
      y: 350,
    },
    {
      x: 750,
      y: 140,
    },
    {
      x: 150,
      y: 445,
    },
  ],
  3: [
    {
      x: 750,
      y: 140,
    },
    {
      x: 300,
      y: 320,
    },
    {
      x: 55,
      y: 200,
    },
  ],
  4: [
    {
      x: 400,
      y: 420,
    },
    {
      x: 800,
      y: 300,
    },
    {
      x: 55,
      y: 200,
    },
  ],
};

export class PlazaScene extends BaseScene {
  sceneId: SceneId = "plaza";

  placeables: {
    [sessionId: string]: PlaceableContainer;
  } = {};

  constructor() {
    super({
      name: "plaza",
      map: { json: mapJson },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    this.load.audio("chime", SOUNDS.notifications.chime);

    this.load.image("page", "world/page.png");

    this.load.image("shop_icon", "world/shop_disc.png");
    this.load.image("timer_icon", "world/timer_icon.png");

    this.load.spritesheet("plaza_bud", "world/plaza_bud.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("plaza_bud_2", "world/plaza_bud_2.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("plaza_bud_3", "world/plaza_bud_3.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("turtle_bud", "world/turtle.png", {
      frameWidth: 15,
      frameHeight: 17,
    });

    this.load.spritesheet("snow_horn_bud", "world/snow_horn_bud.png", {
      frameWidth: 15,
      frameHeight: 14,
    });

    this.load.spritesheet("snow_bud", "world/snow_mushroom.png", {
      frameWidth: 15,
      frameHeight: 15,
    });

    this.load.spritesheet("fat_chicken", "world/fat_chicken.png", {
      frameWidth: 17,
      frameHeight: 21,
    });

    this.load.image("chest", "world/rare_chest.png");

    this.load.image("basic_chest", "world/basic_chest.png");
    this.load.image("luxury_chest", "world/luxury_chest.png");
    this.load.image("locked_disc", "world/locked_disc.png");
    this.load.image("key_disc", "world/key_disc.png");
    this.load.image("luxury_key_disc", "world/luxury_key_disc.png");

    // Stella Megastore items
    this.load.image("flower_cart", "world/flower_cart.png");
    this.load.image("queen_bee", "world/queen_bee.png");

    this.load.spritesheet("banner", "world/spring_banner.png", {
      frameWidth: 22,
      frameHeight: 36,
    });

    super.preload();

    const audioMuted = getCachedAudioSetting<boolean>(
      AudioLocalStorageKeys.audioMuted,
      false
    );

    if (!audioMuted) {
      // Ambience SFX
      if (!this.sound.get("nature_1")) {
        const nature1 = this.sound.add("nature_1");
        nature1.play({ loop: true, volume: 0.01 });
      }
    }

    // Shut down the sound when the scene changes
    this.events.once("shutdown", () => {
      this.sound.getAllPlaying().forEach((sound) => {
        sound.destroy();
      });
    });
  }

  async create() {
    this.map = this.make.tilemap({
      key: "main-map",
    });

    super.create();

    this.initialiseNPCs(PLAZA_BUMPKINS);

    let week: number | undefined = undefined;
    try {
      week = getSeasonWeek();
    } catch {
      // eslint-disable-next-line no-console
      console.error("Error getting week");
    }

    if (week) {
      (PAGE_POSITIONS[week] ?? []).forEach(({ x, y }, index) => {
        const pageNumber = index + 1;

        const collectedFlowerPages =
          this.gameState?.springBlossom?.[week!]?.collectedFlowerPages;

        if (
          collectedFlowerPages &&
          !collectedFlowerPages.includes(pageNumber)
        ) {
          const page = new Page({ x, y, scene: this });
          page.setDepth(1000000);
          this.physics.world.enable(page);

          this.physics.add.collider(
            this.currentPlayer as BumpkinContainer,
            page,
            (obj1, obj2) => {
              page.sprite?.destroy();
              page.destroy();

              const chime = this.sound.add("chime");
              chime.play({ loop: false, volume: 0.1 });

              interactableModalManager.open("page_discovered");
              this.gameService.send("flowerPage.discovered", {
                id: pageNumber,
              });
              this.gameService.send("SAVE");
            }
          );
        }
      });
    }

    if (this.gameState.inventory["Treasure Key"]) {
      this.add.sprite(210, 130, "key_disc").setDepth(1000000000);
    } else {
      this.add.sprite(210, 130, "locked_disc").setDepth(1000000000);
    }

    const basicChest = this.add.sprite(210, 150, "basic_chest");
    basicChest.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      interactableModalManager.open("basic_chest");
    });

    if (hasFeatureAccess(this.gameState, "CHESTS")) {
      const luxuryChest = this.add.sprite(825, 70, "luxury_chest");
      luxuryChest
        .setInteractive({ cursor: "pointer" })
        .on("pointerdown", () => {
          interactableModalManager.open("luxury_chest");
        });

      if (this.gameState.inventory["Luxury Key"]) {
        this.add.sprite(825, 50, "luxury_key_disc").setDepth(1000000000);
      } else {
        this.add.sprite(825, 50, "locked_disc").setDepth(1000000000);
      }
    }

    const shopIcon = this.add.sprite(321.5, 230, "shop_icon");
    shopIcon.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      npcModalManager.open("stella");
    });

    const auctionIcon = this.add.sprite(608, 220, "timer_icon");
    auctionIcon.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      npcModalManager.open("hammerin harry");
    });
    auctionIcon.setDepth(1000000);

    const clubHouseLabel = new Label(this, "CLUBHOUSE", "brown");
    clubHouseLabel.setPosition(152, 262);
    clubHouseLabel.setDepth(10000000);
    this.add.existing(clubHouseLabel);

    // Plaza Bud
    const fatChicken = this.add.sprite(106, 352, "fat_chicken");
    this.anims.create({
      key: "fat_chicken_animation",
      frames: this.anims.generateFrameNumbers("fat_chicken", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    fatChicken.play("fat_chicken_animation", true);
    fatChicken.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      interactableModalManager.open("fat_chicken");
    });

    // Plaza Bud
    const bud = this.add.sprite(500, 420, "plaza_bud");
    this.anims.create({
      key: "plaza_bud_animation",
      frames: this.anims.generateFrameNumbers("plaza_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud
      .play("plaza_bud_animation", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });

    // Banner
    const banner = this.add.sprite(400, 220, "banner");
    this.anims.create({
      key: "banner_animation",
      frames: this.anims.generateFrameNumbers("banner", {
        start: 0,
        end: 1,
      }),
      repeat: -1,
      frameRate: 7,
    });
    banner
      .play("banner_animation", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("banner");
      });
    banner.setDepth(100000000000);

    const banner2 = this.add.sprite(464, 220, "banner");
    banner2
      .play("banner_animation", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("banner");
      });
    banner2.setDepth(100000000000);

    const banner3 = this.add.sprite(480, 382, "banner");
    banner3
      .play("banner_animation", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("banner");
      });
    banner3.setDepth(100000000000);

    const banner4 = this.add.sprite(385, 382, "banner");
    banner4
      .play("banner_animation", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("banner");
      });
    banner4.setDepth(100000000000);

    const bud3 = this.add.sprite(176, 290, "plaza_bud_3");
    this.anims.create({
      key: "plaza_bud_animation_3",
      frames: this.anims.generateFrameNumbers("plaza_bud_3", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud3
      .play("plaza_bud_animation_3", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });

    const turtle = this.add.sprite(119, 293, "turtle_bud");
    turtle.setScale(-1, 1);
    this.anims.create({
      key: "turtle_bud_anim",
      frames: this.anims.generateFrameNumbers("turtle_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    turtle
      .play("turtle_bud_anim", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });

    const snowHornBud = this.add.sprite(128, 235, "snow_horn_bud");
    snowHornBud.setScale(-1, 1);
    this.anims.create({
      key: "snow_horn_bud_anim",
      frames: this.anims.generateFrameNumbers("snow_horn_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    snowHornBud.setVisible(false).play("snow_horn_bud_anim", true);

    const chest = this.add
      .sprite(152, 230, "chest")
      .setVisible(false)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("clubhouse_reward");
      });

    // Stella Collectible of the Month
    this.add.image(248, 244, "flower_cart");
    this.add.image(288, 248, "queen_bee");

    const door = this.colliders
      ?.getChildren()
      .find((object) => object.data?.list?.id === "clubhouse_door");

    // TODO
    const canAccess = Object.keys(this.gameState.buds ?? {}).length > 0;

    if (door && canAccess) {
      this.physics.world.disable(door);
    }

    // Opening and closing clubhouse door
    this.onCollision["clubhouse_door"] = async (obj1, obj2) => {
      if (!canAccess) {
        interactableModalManager.open("guild_house");
        return;
      }

      const wasOpen = chest.visible;
      const isOpen = (obj1 as any).y > (obj2 as any).y;

      this.layers["Club House Roof"].setVisible(isOpen);
      this.layers["Club House Base"].setVisible(isOpen);
      this.layers["Club House Door"].setVisible(isOpen);
      clubHouseLabel.setVisible(isOpen);

      snowHornBud.setVisible(!isOpen);
      chest.setVisible(!isOpen);

      if (wasOpen === isOpen) {
        this.mmoService?.state.context.server?.send(0, {
          action: "open_clubhouse",
        });
      }

      return;
    };

    const server = this.mmoService?.state.context.server;
    if (!server) return;

    server.state.actions.onAdd(async (action) => {
      if (
        action.event === "open_clubhouse" &&
        !!this.layers["Club House Door"].visible
      ) {
        this.layers["Club House Door"].setVisible(false);

        await new Promise((res) => setTimeout(res, 1000));

        this.layers["Club House Door"].setVisible(true);
      }
    });
  }

  syncPlaceables() {
    const server = this.mmoServer;
    if (!server) return;

    // Destroy any dereferenced placeables
    Object.keys(this.placeables).forEach((sessionId) => {
      const hasLeft =
        !server.state.buds.get(sessionId) ||
        server.state.buds.get(sessionId)?.sceneId !== this.scene.key;

      const isInactive = !this.placeables[sessionId]?.active;

      if (hasLeft || isInactive) {
        this.placeables[sessionId]?.disappear();
        delete this.placeables[sessionId];
      }
    });

    // Create new placeables
    server.state.buds?.forEach((bud, sessionId) => {
      if (bud.sceneId !== this.scene.key) return;

      if (!this.placeables[sessionId]) {
        this.placeables[sessionId] = new PlaceableContainer({
          sprite: `https://${budImageDomain}.sunflower-land.com/sheets/idle/${bud.id}.webp`,
          x: bud.x,
          y: bud.y,
          scene: this,
        });
      }
    });
  }

  public update() {
    super.update();
    this.syncPlaceables();
  }
}
