import { createMachine, Interpreter, assign, TransitionsConfig } from "xstate";
import { fromWei } from "web3-utils";
import { Decimal } from "decimal.js-light";
import { EVENTS, GameEvent, processEvent } from "../events";

import { Context as AuthContext } from "features/auth/lib/authMachine";
import { metamask } from "../../../lib/blockchain/metamask";

import { GameState } from "../types/game";
import { loadSession } from "../actions/loadSession";
import { INITIAL_FARM } from "./constants";
import { autosave } from "../actions/autosave";

export type PastAction = GameEvent & {
  createdAt: Date;
};

export interface Context {
  state: GameState;
  actions: PastAction[];
}

export type BlockchainEvent =
  | {
      type: "SAVE";
    }
  | GameEvent;

// For each game event, convert it to an XState event + handler
const GAME_EVENT_HANDLERS: TransitionsConfig<Context, BlockchainEvent> =
  Object.keys(EVENTS).reduce(
    (events, eventName) => ({
      ...events,
      [eventName]: {
        target: "playing",
        actions: assign((context: Context, event: GameEvent) => ({
          state: processEvent(context.state as GameState, event) as GameState,
          actions: [
            ...context.actions,
            {
              ...event,
              createdAt: new Date(),
            },
          ],
        })),
      },
    }),
    {}
  );

export type BlockchainState = {
  value: "loading" | "playing" | "readonly" | "autosaving" | "error";
  context: Context;
};

export type MachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

export function startGame(authContext: AuthContext) {
  return createMachine<Context, BlockchainEvent, BlockchainState>({
    id: "gameMachine",
    initial: "loading",
    context: {
      actions: [],
      state: INITIAL_FARM,
    },
    states: {
      loading: {
        invoke: {
          src: async () => {
            // Load the farm session
            if (authContext.sessionId) {
              console.log({ authContext });
              const game = await loadSession({
                farmId: Number(authContext.farmId),
                sessionId: authContext.sessionId as string,
                signature: authContext.signature as string,
                hash: authContext.hash as string,
                sender: metamask.myAccount as string,
              });

              console.log({ game });

              if (!game) {
                throw new Error("NO_FARM");
              }

              return {
                state: {
                  ...game,
                  balance: new Decimal(game.balance),
                },
              };
            }

            // They are an anonymous user
            // TODO: Load from Web3

            return { state: INITIAL_FARM };
          },
          onDone: {
            //target: authContext.sessionId ? "playing" : "readonly",
            target: authContext.sessionId ? "playing" : "playing",
            actions: assign({
              state: (context, event) => event.data.state,
            }),
          },
          onError: {
            target: "error",
          },
        },
      },
      playing: {
        on: {
          ...GAME_EVENT_HANDLERS,
          SAVE: {
            target: "autosaving",
          },
        },
      },
      autosaving: {
        on: {
          ...GAME_EVENT_HANDLERS,
        },
        invoke: {
          src: async (context) => {
            await autosave({
              farmId: Number(authContext.farmId),
              sessionId: authContext.sessionId as string,
              sender: metamask.myAccount as string,
              actions: context.actions,
            });
          },
          onDone: {
            target: "playing",
          },
          onError: {
            target: "error",
          },
        },
      },
      readonly: {},
      error: {},
    },
  });
}
