import mapJson from "assets/map/christmasDeliveryMayhem.json";
import tilesetconfig from "assets/map/christmas_tileset.json";
import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";
import { MachineInterpreter } from "./lib/christmasDeliveryMayhemMachine";
import {
  COALS_CONFIGURATION,
  GIFT_CONFIGURATION,
  BONFIRE_CONFIGURATION,
  ELVES_CONFIGURATION,
  GRIT_CONFIGURATION,
  SNOWSTORM_CONFIGURATION,
  Events,
  GAME_SECONDS,
  EVENT_DURATION,
} from "./ChristmasDeliveryMayhemConstants";
import { GiftContainer } from "./containers/GiftContainer";
import { BonfireContainer } from "./containers/BonfireContainer";
import { ElfContainer } from "./containers/ElfContainer";
import { GritContainer } from "./containers/GritContainer";
import { NewSnowStormContainer } from "./containers/SnowStormContainer";
import { CoalsContainer } from "./containers/CoalsContainer";
import { isArray } from "xstate/lib/utils";

// export const NPCS: NPCBumpkin[] = [
//   {
//     x: 380,
//     y: 400,
//     // View NPCModals.tsx for implementation of pop up modal
//     npc: "portaller",
//   },
// ];

export class ChristmasDeliveryMayhemScene extends BaseScene {
  sceneId: SceneId = "christmas_delivery_mayhem";
  private gifts: GiftContainer[] = [];
  private elves: ElfContainer[] = [];
  private snowStorm!: NewSnowStormContainer;
  private gritContainer!: GritContainer;
  private coal: CoalsContainer[] = [];
  private currentEventName = "";
  private eventInitialDate: Date | null = null;
  private christmasEvents!: Record<
    Events,
    () => NewSnowStormContainer | GritContainer | CoalsContainer[] | null
  >;

  constructor() {
    super({
      name: "christmas_delivery_mayhem",
      map: {
        json: mapJson,
        imageKey: "christmas-tileset",
        defaultTilesetConfig: tilesetconfig,
      },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    super.preload();

    this.load.spritesheet("krampus", "world/krampus.webp", {
      frameWidth: 20,
      frameHeight: 19,
    });

    this.load.spritesheet(
      "coalspawn_spritesheet",
      "world/coalspawn_spritesheet.png",
      {
        frameWidth: 10,
        frameHeight: 30,
      },
    );

    this.load.spritesheet("coal", "world/coal.png", {
      frameWidth: 12,
      frameHeight: 12,
    });

    this.load.spritesheet(
      "snowstorm_left_final_tileset",
      "world/snowstorm_left_final_tileset.png",
      {
        frameWidth: 544,
        frameHeight: 320,
      },
    );

    this.load.spritesheet(
      "snowstorm_right_final_tileset_2",
      "world/snowstorm_right_final_tileset_2.png",
      {
        frameWidth: 544,
        frameHeight: 320,
      },
    );

    this.load.spritesheet(
      "snowstorm_final_tileset",
      "world/snowstorm_final_tileset.png",
      {
        frameWidth: 544,
        frameHeight: 320,
      },
    );

    this.load.spritesheet("Grit_Carrying", "world/Grit_Carrying.webp", {
      frameWidth: 25,
      frameHeight: 19,
    });

    this.load.spritesheet("Grit_escape", "world/Grit_escape.png", {
      frameWidth: 14,
      frameHeight: 17,
    });

    // Gifts
    this.load.spritesheet("gift_1", "world/gift_1.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_2", "world/gift_2.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_3", "world/gift_3.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_4", "world/gift_4.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_5", "world/gift_5.png", {
      frameWidth: 16,
      frameHeight: 18,
    });
    this.load.spritesheet("gift_6", "world/gift_6.png", {
      frameWidth: 16,
      frameHeight: 18,
    });

    // Bonfire
    this.load.spritesheet("bonfire", "world/bonfire.png", {
      frameWidth: 23,
      frameHeight: 40,
    });

    // Elves
    this.load.spritesheet("elf", "world/elf.png", {
      frameWidth: 20,
      frameHeight: 19,
    });

    // Emoticons
    this.load.spritesheet("happy", "world/happy.png", {
      frameWidth: 7,
      frameHeight: 8,
    });
    this.load.spritesheet("sad", "world/sad.png", {
      frameWidth: 7,
      frameHeight: 8,
    });

    //sounds
    this.load.audio("coal-sound", "world/sound-effects/coal-sound.mp3"); // done
    this.load.audio("grit-spawn", "world/sound-effects/grit-spawn.mp3"); // done
    this.load.audio("gift-pickup", "world/sound-effects/gift-pickup.mp3"); // done
    this.load.audio("snow-storm", "world/sound-effects/snow-storm.mp3"); // doneddd

    //partially implemented. grit plays the sound when he takes one of your lives now
    this.load.audio("bad-sound", "world/sound-effects/bad-sound.mp3"); //play when something bad happens

    //not used yet. elfs not taking my gifts yet
    this.load.audio("good-sound", "world/sound-effects/good-sound.mp3"); //play when something good happens
  }

  async create() {
    this.map = this.make.tilemap({
      key: "christmas_delivery_mayhem",
    });

    super.create();

    this.createBonfires();
    this.createElves();
    this.createCoals();
    this.createSnowStorm();
    this.createGifts();
    this.createGrit();
    this.createEvents();
    this.snowStorm.normalSnowStorm();

    // To test each event, comment out the other event duration samples

    // Grit event duration sample
    // setTimeout(() => {
    //   if(this.gritContainer) {
    //     this.gritContainer.deactivateGrit()
    //   }
    // }, 15000)

    // Coals event duration sample
    // setTimeout(() => {
    //   if (this.coal) {
    //     COALS_CONFIGURATION.forEach((_, index) => {
    //       const coal = this.coal[index];
    //       coal.deactivateCoal();
    //     });
    //   }
    // }, 50000);

    // Snowstorm event duration sample
    // setTimeout(() => {
    //   if(this.snowStorm) {
    //     this.snowStorm.deactivateSnowstorm()
    //   }
    // }, 20000)

    this.physics.world.drawDebug = false;

    // this.initialiseNPCs(NPCS);
  }

  private get isGameReady() {
    return this.portalService?.state.matches("ready") === true;
  }

  public get portalService() {
    return this.registry.get("portalService") as MachineInterpreter | undefined;
  }

  update() {
    super.update();

    if (this.snowStorm?.isActive) {
      this.snowStorm.speedDirection();
    }

    // Player current position
    // console.log({y: this.currentPlayer?.y, x: this.currentPlayer?.x})

    const lives = this.portalService?.state.context.lives || 0;
    if (lives <= 0) {
      this.isCameraFading = true;
      this.time.delayedCall(1000, () => {
        this.portalService?.send("GAME_OVER");
      });
    } else {
      // Activate event
      const eventName = this.portalService?.state.context.event || "";
      if (eventName !== "" && eventName !== this.currentEventName) {
        const event = this.christmasEvents[eventName]();
        if (!isArray(event)) {
          event?.activate();
        } else {
          event?.forEach((e) => e.activate());
        }
        this.currentEventName = eventName;
        this.eventInitialDate = new Date();
      }
      // Desactivate event
      const millisecondsLeftInEvent = this.secondsLeftInEvent() * 1000;
      if (millisecondsLeftInEvent >= EVENT_DURATION) {
        const event = this.christmasEvents[eventName]();
        if (!isArray(event)) {
          event?.deactivate();
        } else {
          event?.forEach((e) => e.deactivate());
        }
        this.currentEventName = "";
        this.eventInitialDate = null;
        this.portalService?.send("UPDATE_EVENT", { event: "" });
      }

      if (this.isGameReady) {
        this.initializeRequests();
        this.portalService?.send("START");
      }
    }
  }

  private initializeRequests() {
    this.elves.forEach((elf) => elf.createRequest());
  }

  private secondsLeftInEvent() {
    const secondsLeft = !this.eventInitialDate
      ? -1000
      : Math.max(Date.now() - this.eventInitialDate.getTime(), 0) / 1000;
    return secondsLeft;
  }

  private createSnowStorm() {
    this.snowStorm = new NewSnowStormContainer({
      x: SNOWSTORM_CONFIGURATION.x,
      y: SNOWSTORM_CONFIGURATION.y,
      scene: this,
      player: this.currentPlayer,
    });
    // use activate() to activate
    this.snowStorm.deactivate();
  }

  private createGrit() {
    GRIT_CONFIGURATION.forEach((config) => {
      this.gritContainer = new GritContainer({
        x: config.x,
        y: config.y,
        scene: this,
        gifts: this.gifts,
        player: this.currentPlayer,
      });
      // use activate() to activate
      this.gritContainer.deactivate();
    });
  }

  private createCoals() {
    COALS_CONFIGURATION.forEach((config) => {
      const coal = new CoalsContainer({
        x: config.x,
        y: config.y,
        scene: this,
        player: this.currentPlayer,
      });
      this.coal.push(coal);
      // use activate() to deactivate
      coal.deactivate();
    });
  }

  private createGifts() {
    this.gifts = GIFT_CONFIGURATION.map(
      (config) =>
        new GiftContainer({
          x: config.x,
          y: config.y,
          scene: this,
          name: config.name,
          player: this.currentPlayer,
        }),
    );
  }

  private createBonfires() {
    BONFIRE_CONFIGURATION.forEach(
      (config) =>
        new BonfireContainer({
          x: config.x,
          y: config.y,
          scene: this,
          player: this.currentPlayer,
        }),
    );
  }

  private createElves() {
    this.elves = ELVES_CONFIGURATION.map(
      (config) =>
        new ElfContainer({
          x: config.x,
          y: config.y,
          scene: this,
          direction: config.direction,
          player: this.currentPlayer,
        }),
    );
  }

  private createEvents() {
    this.christmasEvents = {
      storm: () => this.snowStorm,
      krampus: () => this.coal,
      grit: () => this.gritContainer,
      "": () => null,
    };
  }

  //private setDefaultState() {}
}
