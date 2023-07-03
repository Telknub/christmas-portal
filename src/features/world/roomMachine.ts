import { Room, Client } from "colyseus.js";

import { assign, createMachine, Interpreter, State } from "xstate";
import { PlazaRoomState } from "./types/Room";

import { CONFIG } from "lib/config";
import { Bumpkin } from "features/game/types/game";
import { INITIAL_BUMPKIN } from "features/game/lib/constants";
import { BumpkinParts } from "lib/utils/tokenUriBuilder";
import { SPAWNS } from "./lib/spawn";
import { chooseRoom } from "./lib/availableRooms";

export type Rooms = {
  plaza: Room<PlazaRoomState> | undefined;
  auction_house: Room<PlazaRoomState> | undefined;
  clothes_shop: Room<PlazaRoomState> | undefined;
  decorations_shop: Room<PlazaRoomState> | undefined;
  windmill_floor: Room<PlazaRoomState> | undefined;
  igor_home: Room<PlazaRoomState> | undefined;
  bert_home: Room<PlazaRoomState> | undefined;
  timmy_home: Room<PlazaRoomState> | undefined;
  betty_home: Room<PlazaRoomState> | undefined;
  woodlands: Room<PlazaRoomState> | undefined;
  dawn_breaker: Room<PlazaRoomState> | undefined;
  marcus_home: Room<PlazaRoomState> | undefined;
};
export type RoomId = keyof Rooms;

export interface ChatContext {
  jwt: string;
  farmId: number;
  bumpkin: Bumpkin;
  rooms: Rooms;
  roomId: RoomId;
  previousRoomId?: RoomId;
  client?: Client;
}

export type RoomState = {
  value: "loading" | "joinRoom" | "ready" | "error" | "introduction";
  context: ChatContext;
};

type ChangeRoomEvent = {
  type: "CHANGE_ROOM";
  roomId: RoomId;
};
type SendChatMessageEvent = {
  type: "SEND_CHAT_MESSAGE";
  text: string;
};

type SendPositionEvent = {
  type: "SEND_POSITION";
  x: number;
  y: number;
};

type ChangeClothingEvent = {
  type: "CHANGE_CLOTHING";
  clothing: BumpkinParts;
};

type RoomDisconnected = {
  type: "ROOM_DISCONNECTED";
  roomId: RoomId;
};
export type ChatMessageReceived = {
  type: "CHAT_MESSAGE_RECEIVED";
  roomId: RoomId;
  text: string;
  sessionId: string;
};

export type PlayerJoined = {
  type: "PLAYER_JOINED";
  roomId: RoomId;
  sessionId: string;
  x: number;
  y: number;
  clothing: BumpkinParts;
};

export type ClothingChangedEvent = {
  type: "CLOTHING_CHANGED";
  roomId: RoomId;
  clothing: BumpkinParts;
  sessionId: string;
};

export type PlayerQuit = {
  type: "PLAYER_QUIT";
  roomId: string;
  sessionId: string;
};

export type RoomEvent =
  | ChangeRoomEvent
  | SendChatMessageEvent
  | ChatMessageReceived
  | PlayerQuit
  | ChangeClothingEvent
  | PlayerJoined
  | RoomDisconnected
  | SendPositionEvent
  | ClothingChangedEvent
  | { type: "CONTINUE" }
  | { type: "RETRY" };

export type MachineState = State<ChatContext, RoomEvent, RoomState>;

export type MachineInterpreter = Interpreter<
  ChatContext,
  any,
  RoomEvent,
  any,
  any
>;

export const INITIAL_ROOM: RoomId = "marcus_home";

/**
 * Machine which handles room events
 */
export const roomMachine = createMachine<ChatContext, RoomEvent, RoomState>({
  initial: "initialising",
  context: {
    jwt: "",
    farmId: 0,
    roomId: INITIAL_ROOM,
    rooms: {
      plaza: undefined,
      auction_house: undefined,
      clothes_shop: undefined,
      decorations_shop: undefined,
      windmill_floor: undefined,
      igor_home: undefined,
      bert_home: undefined,
      timmy_home: undefined,
      betty_home: undefined,
      woodlands: undefined,
      dawn_breaker: undefined,
      marcus_home: undefined,
    },
    bumpkin: INITIAL_BUMPKIN,
  },
  exit: (context) => context.rooms[context.roomId]?.leave(),
  states: {
    initialising: {
      always: [
        {
          target: "introduction",
          cond: () => !localStorage.getItem("mmo_introduction.read"),
        },
        {
          target: "loading",
        },
      ],
    },
    introduction: {
      on: {
        CONTINUE: {
          target: "loading",
          actions: () =>
            localStorage.setItem(
              "mmo_introduction.read",
              Date.now().toString()
            ),
        },
      },
    },
    loading: {
      invoke: {
        id: "loading",
        src: (context) => async () => {
          if (!CONFIG.ROOM_URL) {
            return { roomId: undefined };
          }

          // Server connection is too fast
          await new Promise((res) => setTimeout(res, 1000));

          const client = new Client(CONFIG.ROOM_URL);

          return { roomId: context.roomId, client };
        },
        onDone: [
          {
            target: "joinRoom",
            actions: assign({
              client: (_, event) => event.data.client,
            }),
          },
        ],
        onError: {
          target: "error",
        },
      },
    },
    joinRoom: {
      invoke: {
        id: "joinRoom",
        src: (context, event: any) => async (cb) => {
          if (!context.client) {
            throw new Error("You must initialise the client first");
          }

          if (context.rooms[context.roomId]) {
            await context.rooms[context.roomId]?.leave();
          }

          const available = await context.client.getAvailableRooms();
          console.log({ available });

          const roomId = chooseRoom(context.roomId as RoomId, available);

          if (!roomId) {
            throw new Error("No room available");
          }

          const room = await context.client.joinOrCreate<PlazaRoomState>(
            roomId,
            {
              previousRoomId: context.roomId,
              bumpkin: context.bumpkin,
              farmId: context.farmId,
              x: SPAWNS[context.roomId]?.default.x ?? 0,
              y: SPAWNS[context.roomId]?.default.y ?? 0,
            }
          );

          room.onLeave(() => {
            cb({
              type: "ROOM_DISCONNECTED",
              roomId: roomId as RoomId,
            });
          });

          room.state.messages.onAdd((message) => {
            // Old message
            if (message.sentAt < Date.now() - 5000) {
              return;
            }

            if (message.sessionId && String(message.sessionId).length > 4) {
              cb({
                type: "CHAT_MESSAGE_RECEIVED",
                roomId: roomId as RoomId,

                text: message.text,
                sessionId: message.sessionId,
              });
            }
          });

          room.state.players.onAdd((player: any, sessionId: string) => {
            cb({
              type: "PLAYER_JOINED",
              roomId: roomId as RoomId,

              sessionId: sessionId,
              x: player.x,
              y: player.y,
              clothing: player.clothing,
            });

            let clothingChangedAt = 0;
            player.onChange(() => {
              if (clothingChangedAt !== player.clothing.updatedAt) {
                clothingChangedAt = player.clothing.updatedAt;
                cb({
                  type: "CLOTHING_CHANGED",
                  roomId: roomId as RoomId,

                  clothing: player.clothing,
                  sessionId: sessionId,
                });
              }
            });
          });

          room.state.players.onRemove((_player: any, sessionId: string) => {
            cb({
              type: "PLAYER_QUIT",
              roomId: roomId as RoomId,

              sessionId: sessionId,
            });
          });

          return { roomId, room };
        },
        onError: {
          target: "error",
        },
        onDone: {
          target: "ready",
          actions: assign({
            roomId: (_, event) => event.data.roomId,
            rooms: (context, event) => {
              return {
                ...context.rooms,
                [event.data.roomId]: event.data.room,
              };
            },
          }),
        },
      },
    },
    ready: {
      on: {
        CHANGE_ROOM: [
          {
            target: "joinRoom",
            actions: assign({
              previousRoomId: (context) => context.roomId,
              roomId: (_, event) => event.roomId,
            }),
            cond: (context, event) => !context.roomId.startsWith(event.roomId),
          },
        ],
        ROOM_DISCONNECTED: {
          target: "error",
          actions: assign({
            rooms: (context) => {
              const rooms = context.rooms;
              delete rooms[context.roomId];
              return rooms;
            },
          }),
        },
        SEND_CHAT_MESSAGE: {
          actions: (context, event) => {
            const room = context.rooms[context.roomId];
            if (!room) return {};

            room.send(0, { text: event.text });
          },
        },
        CHANGE_CLOTHING: {
          actions: [
            (context, event) => {
              const room = context.rooms[context.roomId];
              if (!room) return {};

              room.send(0, { clothing: event.clothing });
            },
            assign({
              bumpkin: (context, event) =>
                ({
                  ...context.bumpkin,
                  equipped: event.clothing,
                } as Bumpkin),
            }),
          ],
        },
        SEND_POSITION: {
          actions: (context, event) => {
            const room = context.rooms[context.roomId];
            if (!room) return {};

            room.send(0, {
              x: event.x,
              y: event.y,
            });
          },
        },
      },
    },
    kicked: {},
    error: {
      on: {
        CHANGE_ROOM: {
          target: "joinRoom",
        },
        RETRY: {
          target: "loading",
        },
      },
    },
  },
});
