import { Schema, MapSchema, ArraySchema } from "@colyseus/schema";
import { NPCName } from "lib/npcs";
import { BumpkinParts } from "lib/utils/tokenUriBuilder";
import { SceneId } from "../mmoMachine";

export interface InputData {
  x: number;
  y: number;
  tick: number;
  text: string;
}

export interface Player extends Schema {
  farmId: number;
  x: number;
  y: number;
  experience: number;
  tick: number;
  clothing: BumpkinParts & { updatedAt: number };
  npc: NPCName;
  sceneId: SceneId;

  inputQueue: InputData[];
}

export interface Message extends Schema {
  text: string;
  farmId?: number;
  sessionId: string;
  sceneId: SceneId;
  sentAt: number;
}

export interface Action extends Schema {
  farmId?: number;
  sceneId: SceneId;
  sentAt: number;
  event: string;
}
export interface Trade extends Schema {
  text: string;
  sellerId: number;
  createdAt: number;
  buyerId?: number;
  boughtAt?: number;
  sceneId?: string;
  tradeId: string;
}

export interface PlazaRoomState extends Schema {
  mapWidth: number;
  mapHeight: number;

  players: MapSchema<Player>;

  messages: ArraySchema<Message>;
  trades: ArraySchema<Trade>;
  actions: ArraySchema<Action>;
}
