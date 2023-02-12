import { getDailyCode, trackDailyReward } from "lib/blockchain/DailyReward";
import { wallet } from "lib/blockchain/wallet";
import { ERRORS } from "lib/errors";
import { assign, createMachine, Interpreter, State } from "xstate";

export interface DailyRewardContext {
  lastUsedCode: number;
  bumpkinLevel: number;
  code: number;
  openedAt: number;
}

/**
 * The Reward Chest can be opened every 24 hours.
 * A user must first 'unlock' it - submit an onchain transaction
 * A user can then  open it - submit a server request (dailyReward.opened)
 */
export type DailyRewardState = {
  value:
    | "initialising"
    | "idle"
    | "loading"
    | "comingSoon"
    | "locked"
    | "unlocking"
    | "unlocked"
    | "opening"
    | "opened"
    | "error";
  context: DailyRewardContext;
};

type DailyRewardEvent =
  | { type: "OPEN" }
  | { type: "LOAD" }
  | { type: "UNLOCK" }
  | { type: "ACKNOWLEDGE" };

export type MachineState = State<
  DailyRewardContext,
  DailyRewardEvent,
  DailyRewardState
>;

export type MachineInterpreter = Interpreter<
  DailyRewardContext,
  any,
  DailyRewardEvent,
  DailyRewardState
>;

export const canDig = (dugAt?: number) => {
  if (!dugAt) return true;

  const today = new Date().toISOString().substring(0, 10);

  return new Date(dugAt).toISOString().substring(0, 10) !== today;
};

export const rewardChestMachine = createMachine<
  DailyRewardContext,
  DailyRewardEvent,
  DailyRewardState
>({
  initial: "initialising",
  states: {
    initialising: {
      always: [
        // {
        //   target: "opened",
        //   cond: (context) => {
        //     console.log({ openedAt: context.openedAt });
        //     if (!context.openedAt) {
        //       return false;
        //     }

        //     // Recently opened
        //     const today = new Date().toISOString().substring(0, 10);
        //     return (
        //       new Date(context.openedAt).toISOString().substring(0, 10) ===
        //       today
        //     );
        //   },
        // },
        {
          target: "comingSoon",
          cond: (context) => {
            console.log({ level: context.bumpkinLevel });
            return context.bumpkinLevel < 3;
          },
        },
        { target: "idle" },
      ],
    },
    comingSoon: {},
    idle: {
      on: {
        LOAD: "loading",
      },
    },
    loading: {
      invoke: {
        src: async (c) => {
          const code = await getDailyCode(
            wallet.web3Provider,
            wallet.myAccount
          );
          console.log({ server: c.code, onChain: code });

          return { code };
        },
        onDone: [
          {
            target: "unlocked",
            cond: (context, event) => context.lastUsedCode !== event.data.code,
            actions: assign({
              code: (_, event) => event.data.code,
            }),
          },
          {
            target: "locked",
            actions: assign({
              code: (_, event) => event.data.code,
            }),
          },
        ],
        onError: {
          target: "error",
        },
      },
    },
    locked: {
      on: {
        UNLOCK: "unlocking",
      },
    },
    unlocking: {
      invoke: {
        src: async (context) => {
          const nextCode = (context.code + 1) % 100;
          console.log({ nextCode });
          await trackDailyReward({
            web3: wallet.web3Provider,
            account: wallet.myAccount,
            code: nextCode,
          });

          return { nextCode };
        },
        onDone: [
          {
            target: "unlocked",
            cond: (context, event) => context.lastUsedCode !== event.data.code,
            actions: assign({
              code: (_, event) => event.data.nextCode,
            }),
          },
        ],
        onError: [
          {
            target: "loading",
            cond: (_, event: any) =>
              event.data.message === ERRORS.REJECTED_TRANSACTION,
          },
          {
            target: "error",
          },
        ],
      },
    },
    unlocked: {
      on: {
        OPEN: "opening",
      },
    },
    opening: {
      on: {
        ACKNOWLEDGE: "opened",
      },
    },
    opened: {},
    error: {
      on: {
        LOAD: "loading",
      },
    },
  },
});
