import { SUNNYSIDE } from "assets/sunnyside";
import { CONFIG } from "lib/config";
import { SOUNDS } from "assets/sound-effects/soundEffects";
import { createErrorLogger } from "lib/errorLogger";
import { MachineInterpreter } from "../roomMachine";
import { BaseScene } from "./BaseScene";
import { COMMUNITY_ISLANDS } from "../ui/community/CommunityIslands";

export async function getgit(owner: string, repo: string, path: string) {
  // A function to fetch files from github using the api

  const data = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  )
    .then((d) => d.json())
    .then((d) =>
      fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`)
    )
    .then((d) => d.json())
    .then((d) => JSON.parse(atob(d.content)));

  return data;
}

export abstract class CommunityScene extends Phaser.Scene {
  public get roomService() {
    return this.registry.get("roomService") as MachineInterpreter;
  }

  preload() {
    const errorLogger = createErrorLogger(
      "phaser_preloader_scene",
      this.roomService.state.context.farmId
    );

    this.load.on(
      Phaser.Loader.Events.FILE_LOAD_ERROR,
      (file: Phaser.Loader.File) => {
        errorLogger(`File load error ${JSON.stringify(file)}`);
      }
    );

    try {
      // Expose API/SDK for usage
      (window as any).BaseScene = BaseScene;

      const sceneName = this.registry.get("initialScene");
      const island = COMMUNITY_ISLANDS.find(
        (island) => island.id === sceneName
      );
      this.load.sceneFile("ExternalScene", island?.url);

      // Load Sound Effects
      this.load.audio("dirt_footstep", SOUNDS.footsteps.dirt);
      this.load.audio("wood_footstep", SOUNDS.footsteps.wood);
      this.load.audio("fire", SOUNDS.loops.fire);
      this.load.audio("nature_1", SOUNDS.loops.nature_1);
      this.load.audio("nature_2", SOUNDS.loops.nature_2);
      this.load.audio("royal_farms", SOUNDS.songs.royal_farms);
      this.load.audio("door_open", SOUNDS.doors.open);
      this.load.audio("howdy", SOUNDS.voices.howdy);
      this.load.audio("toad", SOUNDS.animals.toad);
      this.load.audio("boat", SOUNDS.loops.engine);
      this.load.audio("shoreline", SOUNDS.loops.shoreline);

      // Phaser assets must be served from an URL
      this.load.image(
        "tileset",
        `${CONFIG.PROTECTED_IMAGE_URL}/world/map-extruded.png`
      );
      this.load.image("speech_bubble", "world/speech_bubble.png");
      this.load.image("label", "world/label.png");
      this.load.image("brown_label", "world/brown_label.png");
      this.load.image("hammer", SUNNYSIDE.icons.hammer);
      this.load.image("disc", SUNNYSIDE.icons.disc);
      this.load.image("shadow", "world/shadow.png");

      this.load.spritesheet("silhouette", "world/silhouette.webp", {
        frameWidth: 14,
        frameHeight: 18,
      });
      this.load.bitmapFont(
        "Small 5x3",
        "world/small_3x5.png",
        "world/small_3x5.xml"
      );
      this.load.bitmapFont("pixelmix", "world/7px.png", "world/7px.xml");

      this.load.once("complete", () => {
        this.scene.start(island?.id);
      });
    } catch (error) {
      errorLogger(error);
    }
  }
}
