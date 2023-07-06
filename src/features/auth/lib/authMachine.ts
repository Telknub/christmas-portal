import MetaMaskOnboarding from "@metamask/onboarding";
import { sequence } from "0xsequence";
import { createMachine, Interpreter, State, assign } from "xstate";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

import { loadBanDetails } from "features/game/actions/bans";
import { isFarmBlacklisted } from "features/game/actions/onchain";
import { CONFIG } from "lib/config";
import { ErrorCode, ERRORS } from "lib/errors";

import { wallet, WalletType } from "../../../lib/blockchain/wallet";
import { communityContracts } from "features/community/lib/communityContracts";
import {
  createAccount as createFarmAction,
  saveReferrerId,
} from "../actions/createAccount";
import {
  login,
  Token,
  decodeToken,
  removeSession,
  saveSession,
} from "../actions/login";
import { oauthorise } from "../actions/oauth";
import { CharityAddress } from "../components/CreateFarm";
import { randomID } from "lib/utils/random";
import { createFarmMachine } from "./createFarmMachine";
import { SEQUENCE_CONNECT_OPTIONS } from "./sequence";
import { getFarm, getFarms } from "lib/blockchain/Farm";
import { getCreatedAt } from "lib/blockchain/AccountMinter";
import { getOnboardingComplete } from "../actions/createGuestAccount";
import { analytics } from "lib/analytics";
import { savePromoCode } from "features/game/actions/loadSession";
import { hasFeatureAccess } from "lib/flags";

export const ART_MODE = !CONFIG.API_URL;

const getFarmIdFromUrl = () => {
  const paths = window.location.href.split("/visit/");
  const id = paths[paths.length - 1];
  return parseInt(id);
};

const getDiscordCode = () => {
  const code = new URLSearchParams(window.location.search).get("code");

  return code;
};

const getReferrerID = () => {
  const code = new URLSearchParams(window.location.search).get("ref");

  return code;
};

const getPromoCode = () => {
  const code = new URLSearchParams(window.location.search).get("promo");

  return code;
};

const deleteFarmUrl = () =>
  window.history.pushState({}, "", window.location.pathname);

type Farm = {
  farmId: number;
  address: string;
  createdAt: number;
  blacklistStatus: "OK" | "VERIFY" | "PENDING" | "REJECTED" | "BANNED";
  verificationUrl?: string;
};

interface Authentication {
  token?: Token;
  rawToken?: string;
  web3?: {
    wallet: WalletType;
    provider: any;
  };
  farmId?: number;
}

export interface FullUser extends Authentication {
  type: "FULL";
  farmAddress?: string;
}

export interface Context {
  user: FullUser;
  errorCode?: ErrorCode;
  transactionId?: string;
  blacklistStatus?: "OK" | "VERIFY" | "PENDING" | "REJECTED";
  verificationUrl?: string;
  visitingFarmId?: number;
}

type StartEvent = Farm & {
  type: "START_GAME";
};

type ExploreEvent = {
  type: "EXPLORE";
};

type VisitEvent = {
  type: "VISIT";
  farmId: number;
};

type ReturnEvent = {
  type: "RETURN";
};

type CreateFarmEvent = {
  type: "CREATE_FARM";
  charityAddress: CharityAddress;
  donation: number;
  captcha: string;
};

type LoadFarmEvent = {
  type: "LOAD_FARM";
};

export type BlockchainEvent =
  | StartEvent
  | ExploreEvent
  | VisitEvent
  | ReturnEvent
  | CreateFarmEvent
  | LoadFarmEvent
  | {
      type: "CHAIN_CHANGED";
    }
  | {
      type: "ACCOUNT_CHANGED";
    }
  | {
      type: "REFRESH";
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "CHOOSE_CHARITY";
    }
  | { type: "CONTINUE" }
  | { type: "BACK" }
  | { type: "CONNECT_TO_DISCORD" }
  | { type: "CONFIRM" }
  | { type: "SKIP" }
  | { type: "CONNECT_TO_METAMASK" }
  | { type: "CONNECT_TO_PHANTOM" }
  | { type: "CONNECT_TO_WALLET_CONNECT" }
  | { type: "CONNECT_TO_SEQUENCE" }
  | { type: "CONNECT_TO_OKX" }
  | { type: "SIGN" }
  | { type: "VERIFIED" }
  | { type: "SET_WALLET" }
  | { type: "SET_TOKEN" }
  | { type: "BUY_FULL_ACCOUNT" }
  | { type: "SIGN_IN" }
  | { type: "SELECT_POKO" }
  | { type: "SELECT_MATIC" };

export type BlockchainState = {
  value:
    | "idle"
    | "welcome"
    | "createWallet"
    | "signIn"
    | "initialising"
    | "visiting"
    | "connectingToMetamask"
    | "connectingToPhantom"
    | "connectingToWalletConnect"
    | "connectingToSequence"
    | "connectingToOkx"
    | "connectingAsGuest"
    | "setupContracts"
    | "connectedToWallet"
    | "reconnecting"
    | "connected"
    | "signing"
    | "verifying"
    | "oauthorising"
    | "blacklisted"
    | { connected: "loadingFarm" }
    | { connected: "farmLoaded" }
    | { connected: "offer" }
    | { connected: "selectPaymentMethod" }
    | { connected: "creatingPokoFarm" }
    | { connected: "creatingFarm" }
    | { connected: "funding" }
    | { connected: "countdown" }
    | { connected: "readyToStart" }
    | { connected: "authorised" }
    | { connected: "blacklisted" }
    | "exploring"
    | "checkFarm"
    | "unauthorised";
  context: Context;
};

export type MachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

export type AuthMachineState = State<Context, BlockchainEvent, BlockchainState>;

export const authMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>(
  {
    id: "authMachine",
    initial: ART_MODE ? "connected" : "idle",
    context: {
      user: ART_MODE
        ? {
            type: "FULL",
            // Random ID
            farmId: Math.floor(Math.random() * (500 + 1)),
          }
        : { type: "FULL" },
    },
    states: {
      idle: {
        id: "idle",
        entry: () => {
          const referrerId = getReferrerID();

          if (referrerId) {
            saveReferrerId(referrerId);
          }

          const promoCode = getPromoCode();
          if (promoCode) {
            savePromoCode(promoCode);
          }
        },
        always: [
          {
            target: "welcome",
            cond: () => !getOnboardingComplete(),
          },
          {
            target: "signIn",
          },
        ],
        on: {
          SIGN_IN: {
            target: "signIn",
          },
        },
      },
      welcome: {
        on: {
          SIGN_IN: {
            target: "signIn",
            actions: () => analytics.logEvent("connect_wallet"),
          },
          CONTINUE: {
            target: "createWallet",
            actions: () => analytics.logEvent("create_account"),
          },
        },
      },

      createWallet: {
        on: {
          CONTINUE: {
            target: "signIn",
            actions: () => analytics.logEvent("connect_wallet"),
          },
        },
      },

      signIn: {
        id: "signIn",
        on: {
          CONNECT_TO_METAMASK: {
            target: "connectingToMetamask",
          },
          CONNECT_TO_PHANTOM: {
            target: "connectingToPhantom",
          },
          CONNECT_TO_WALLET_CONNECT: {
            target: "connectingToWalletConnect",
          },
          CONNECT_TO_SEQUENCE: {
            target: "connectingToSequence",
          },
          CONNECT_TO_OKX: {
            target: "connectingToOkx",
          },
          BACK: {
            target: "welcome",
          },
        },
      },
      reconnecting: {
        id: "reconnecting",
        always: [
          {
            target: "connectingToMetamask",
            cond: (context) => context.user.web3?.wallet === "METAMASK",
          },
          {
            target: "connectingToPhantom",
            cond: (context) => context.user.web3?.wallet === "PHANTOM",
          },
          {
            target: "connectingToSequence",
            cond: (context) => context.user.web3?.wallet === "SEQUENCE",
          },
          {
            target: "connectingToOkx",
            cond: (context) => context.user.web3?.wallet === "OKX",
          },
          {
            target: "connectingToWalletConnect",
            cond: (context) => !!context.user.web3?.wallet,
          },
          { target: "idle" },
        ],
      },
      connectingToPhantom: {
        id: "connectingToPhantom",
        invoke: {
          src: "initPhantom",
          onDone: [
            {
              target: "setupContracts",
              actions: "assignUser",
            },
          ],
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      connectingToMetamask: {
        id: "connectingToMetamask",
        invoke: {
          src: "initMetamask",
          onDone: [
            {
              target: "setupContracts",
              actions: "assignUser",
            },
          ],
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      connectingToWalletConnect: {
        id: "connectingToWalletConnect",
        invoke: {
          src: "initWalletConnect",
          onDone: [
            {
              target: "setupContracts",
              actions: "assignUser",
            },
          ],
          onError: [
            {
              target: "idle",
              cond: (_, event) => event.data.message === "User closed modal",
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      connectingToSequence: {
        id: "connectingToSequence",
        invoke: {
          src: "initSequence",
          onDone: [
            {
              target: "setupContracts",
              actions: "assignUser",
            },
          ],
          onError: [
            {
              target: "idle",
              cond: (_, event) =>
                event.data.message === ERRORS.SEQUENCE_NOT_CONNECTED,
            },
            {
              target: "unauthorised",
              actions: "assignErrorMessage",
            },
          ],
        },
      },
      connectingToOkx: {
        id: "connectingToOkx",
        invoke: {
          src: "initOkx",
          onDone: [
            {
              target: "setupContracts",
              actions: "assignUser",
            },
          ],
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      setupContracts: {
        invoke: {
          src: async (context) => {
            console.log({ isWeb3: context.user.web3 });
            if (context.user.web3) {
              await wallet.initialise(
                context.user.web3.provider,
                context.user.web3.wallet
              );
              await communityContracts.initialise(context.user.web3.provider);
            }
          },
          onDone: [
            {
              target: "checkFarm",
              cond: "isVisitingUrl",
              actions: assign({
                visitingFarmId: (_context) => getFarmIdFromUrl(),
              }),
            },
            {
              target: "signing",
              actions: (context) =>
                analytics.logEvent("wallet_connected", {
                  wallet: context.user.web3?.wallet,
                }),
            },
            // TODO check with sequence if we need intermediate state
            // {
            //   target: "connectedToWallet",
            //   actions: (context) =>
            //     analytics.logEvent("wallet_connected", {
            //       wallet: context.user.web3?.wallet,
            //     }),
            // },
          ],
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      signing: {
        entry: "setTransactionId",
        invoke: {
          src: "login",
          onDone: [
            {
              target: "oauthorising",
              cond: "hasDiscordCode",
            },
            {
              target: "connected",
              cond: (_, event) =>
                !!decodeToken(event.data.token).userAccess.verified,
              actions: "assignToken",
            },
            {
              target: "verifying",
              actions: "assignToken",
            },
          ],
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      verifying: {
        on: {
          VERIFIED: {
            target: "connected",
            actions: [
              "assignToken",
              (_, event) =>
                saveSession((event as any).data.account, {
                  token: (event as any).data.token,
                }),
            ],
          },
        },
      },
      oauthorising: {
        entry: "setTransactionId",
        invoke: {
          src: "oauthorise",
          onDone: {
            target: "connected.loadingFarm",
            actions: "assignToken",
          },
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      connected: {
        initial: ART_MODE ? "authorised" : "loadingFarm",
        states: {
          loadingFarm: {
            id: "loadingFarm",
            entry: "setTransactionId",
            invoke: {
              src: "loadFarm",
              onDone: [
                {
                  target: "countdown",
                  cond: "isFresh",
                },
                {
                  // event.data can be undefined if the player has no farms
                  cond: (_, event) => event.data?.blacklistStatus === "BANNED",
                  actions: "assignFullUser",
                  target: "blacklisted",
                },
                {
                  target: "authorised",
                  actions: "assignFullUser",
                  cond: "hasFarm",
                },

                { target: "offer" },
              ],
              onError: [
                {
                  target: "#loadingFarm",
                  cond: () => !wallet.isAlchemy,
                  actions: () => {
                    wallet.overrideProvider();
                  },
                },
                {
                  target: "#unauthorised",
                  actions: "assignErrorMessage",
                },
              ],
            },
          },
          funding: {
            invoke: {
              id: "createFarmMachine",
              src: createFarmMachine,
              data: {
                token: (context: Context) => context.user.rawToken,
              },
              onError: {
                target: "#unauthorised",
                actions: "assignErrorMessage",
              },
            },
            on: {
              CREATE_FARM: {
                target: "creatingFarm",
                actions: () => analytics.logEvent("mint_farm"),
              },
              REFRESH: {
                target: "#reconnecting",
              },
            },
          },
          selectPaymentMethod: {
            on: {
              BACK: {
                target: "offer",
              },
              SELECT_POKO: {
                target: "creatingPokoFarm",
                actions: () => analytics.logEvent("select_poko"),
              },
              SELECT_MATIC: {
                target: "funding",
                actions: () => analytics.logEvent("select_matic"),
              },
            },
          },
          creatingPokoFarm: {
            on: {
              CONTINUE: {
                target: "#reconnecting",
              },
            },
          },
          creatingFarm: {
            entry: "setTransactionId",
            invoke: {
              src: "createFarm",
              onDone: {
                target: "#reconnecting",
              },
              onError: {
                target: "#unauthorised",
                actions: "assignErrorMessage",
              },
            },
          },
          countdown: {
            on: {
              REFRESH: {
                target: "#reconnecting",
              },
            },
          },
          offer: {
            entry: () => analytics.logEvent("offer_seen"),
            on: {
              CONTINUE: [
                {
                  target: "selectPaymentMethod",
                  actions: () => analytics.logEvent("offer_accepted"),
                  cond: () => hasFeatureAccess({}, "MINT_ACCOUNT_WITH_POKO"),
                },
                {
                  target: "funding",
                  actions: () => analytics.logEvent("offer_accepted"),
                },
              ],
            },
          },
          readyToStart: {
            invoke: {
              src: async () => ({
                skipSplash: window.location.hash.includes("retreat"),
              }),
              onDone: {
                cond: (_, event) => event.data.skipSplash,
                target: "authorised",
              },
            },
            on: {
              START_GAME: [
                {
                  cond: (context) => context.blacklistStatus !== "OK",
                  target: "blacklisted",
                },
                {
                  target: "authorised",
                },
              ],
              EXPLORE: {
                target: "#exploring",
              },
            },
          },
          blacklisted: {
            on: {
              SKIP: {
                target: "authorised",
              },
            },
          },
          authorised: {
            id: "authorised",
            entry: [
              "clearTransactionId",
              (context) => {
                if (window.location.hash.includes("retreat")) return;
                if (window.location.hash.includes("world")) return;

                if (!ART_MODE) {
                  window.location.href = `${window.location.pathname}#/land/${context.user.farmId}`;
                }
              },
              (context) =>
                analytics.initialise({
                  id: context.user.farmId as number,
                  type: context.user.type,
                  wallet: context.user.web3?.wallet as string,
                }),
              () => analytics.logEvent("login"),
            ],
            on: {
              RETURN: {
                target: "#reconnecting",
                actions: ["refreshFarm", "deleteFarmIdUrl"],
              },
              REFRESH: {
                target: "#reconnecting",
              },
              EXPLORE: {
                target: "#exploring",
              },
              LOGOUT: {
                target: "#idle",
                actions: ["clearSession", "refreshFarm"],
              },
              SET_WALLET: {
                actions: "assignUser",
              },
              SET_TOKEN: {
                actions: [
                  "assignToken",
                  (_, event) =>
                    saveSession((event as any).data.account, {
                      token: (event as any).data.token,
                    }),
                ],
              },
              BUY_FULL_ACCOUNT: {
                target: "funding",
              },
              SIGN_IN: {
                target: "#signIn",
              },
            },
          },
          supplyReached: {},
        },
      },
      unauthorised: {
        id: "unauthorised",
      },
      exploring: {
        id: "exploring",
        on: {
          LOAD_FARM: {
            target: "#loadingFarm",
          },
          VISIT: {
            target: "checkFarm",
            actions: assign({ visitingFarmId: (_, event) => event.farmId }),
          },
        },
      },
      // An anonymous user is visiting a farm
      checkFarm: {
        invoke: {
          src: "visitFarm",
          onDone: [
            {
              target: "blacklisted",
              cond: (_, event) => event.data.blacklistStatus !== "OK",
            },
            {
              target: "visiting",
            },
          ],
          onError: {
            target: "unauthorised",
            actions: "assignErrorMessage",
          },
        },
      },
      blacklisted: {},
      visiting: {
        entry: (context) => {
          window.location.href = `${window.location.pathname}#/visit/${context.visitingFarmId}`;
        },
        on: {
          RETURN: {
            target: "reconnecting",
            actions: ["refreshFarm", "deleteFarmIdUrl"],
          },
        },
      },
    },
    on: {
      CHAIN_CHANGED: {
        target: "reconnecting",
        actions: "refreshFarm",
      },
      ACCOUNT_CHANGED: {
        target: "reconnecting",
        actions: "refreshFarm",
      },
      REFRESH: {
        target: "reconnecting",
        actions: "refreshFarm",
      },
    },
  },
  {
    services: {
      initMetamask: async () => {
        analytics.logEvent("connect_to_metamask");
        const _window = window as any;

        // TODO add type support
        if (_window.ethereum) {
          const provider = _window.ethereum;

          await provider.request({
            method: "eth_requestAccounts",
          });

          return { web3: { wallet: "METAMASK", provider } };
        } else {
          const onboarding = new MetaMaskOnboarding();
          onboarding.startOnboarding();
        }
      },
      initPhantom: async () => {
        analytics.logEvent("connect_to_phantom");
        const _window = window as any;

        if (_window.phantom) {
          // _window.phantom doesn't seem to handle polygon atm
          // therefore we will continue to use the provider it attaches to window.ethereum
          const provider = _window.ethereum;

          try {
            await provider.request({
              method: "eth_requestAccounts",
            });
          } catch (e) {
            throw new Error(ERRORS.WALLET_INITIALISATION_FAILED);
          }

          return { web3: { wallet: "PHANTOM", provider } };
        } else {
          throw new Error(ERRORS.NO_WEB3);
        }
      },
      initWalletConnect: async () => {
        analytics.logEvent("connect_to_walletconnect");

        const provider = await EthereumProvider.init({
          chains: [CONFIG.POLYGON_CHAIN_ID],
          projectId: CONFIG.WALLETCONNECT_PROJECT_ID,
          showQrModal: true,
          qrModalOptions: {
            themeVariables: { "--wcm-z-index": "1100" }, // Ensures modal appears above splash
          },
        });

        await provider.enable();

        return { web3: { wallet: "WALLETCONNECT", provider } };
      },
      initSequence: async () => {
        analytics.logEvent("connect_to_sequence");
        const network = CONFIG.NETWORK === "mainnet" ? "polygon" : "mumbai";

        const sequenceWallet = await sequence.initWallet(network);
        await sequenceWallet.connect(SEQUENCE_CONNECT_OPTIONS);

        if (!sequenceWallet.isConnected()) {
          throw Error(ERRORS.SEQUENCE_NOT_CONNECTED);
        }

        const provider = sequenceWallet.getProvider();

        return { web3: { wallet: "SEQUENCE", provider } };
      },
      initOkx: async () => {
        analytics.logEvent("connect_to_okx");
        const _window = window as any;

        if (typeof _window.okxwallet !== "undefined") {
          // _window.phantom doesn't seem to handle polygon atm
          // therefore we will continue to use the provider it attaches to window.ethereum
          const provider = _window.ethereum;

          try {
            await provider.request({
              method: "eth_requestAccounts",
            });
          } catch (e) {
            throw new Error(ERRORS.WALLET_INITIALISATION_FAILED);
          }

          return { web3: { wallet: "OKX", provider } };
        } else {
          throw new Error(ERRORS.NO_WEB3);
        }
      },
      loadFarm: async (context): Promise<Farm | undefined> => {
        if (!wallet.myAccount) return;

        const farmAccounts = await getFarms(
          wallet.web3Provider,
          wallet.myAccount
        );

        if (farmAccounts?.length === 0) return;

        const createdAt = await getCreatedAt(
          wallet.web3Provider,
          wallet.myAccount,
          wallet.myAccount as string
        );

        // V1 just support 1 farm per account - in future let them choose between the NFTs they hold
        const farmAccount = farmAccounts[0];

        const { verificationUrl, isBanned } = await loadBanDetails(
          farmAccount.tokenId,
          context.user.rawToken as string,
          context.transactionId as string
        );

        return {
          farmId: parseInt(farmAccount.tokenId),
          address: farmAccount.account,
          createdAt,
          blacklistStatus: isBanned ? "BANNED" : "OK",
          verificationUrl,
        };
      },
      createFarm: async (context: Context, event: any) => {
        if (!context.user.rawToken) throw new Error("No token");
        if (!wallet.myAccount) throw new Error("No account");

        const { charityAddress, captcha } = event as CreateFarmEvent;

        await createFarmAction({
          charity: charityAddress,
          token: context.user.rawToken,
          captcha,
          transactionId: context.transactionId as string,
          account: wallet.myAccount,
        });
      },
      login: async (context): Promise<{ token: string | null }> => {
        let token: string | null = null;

        console.log("Try it", wallet.myAccount);
        if (wallet.myAccount) {
          ({ token } = await login(
            context.transactionId as string,
            wallet.myAccount
          ));
        }
        console.log({ token });

        return { token };
      },
      oauthorise: async (context) => {
        if (!wallet.myAccount) throw new Error("No account");

        const code = getDiscordCode() as string;
        // Navigates to Discord OAuth Flow
        const { token } = await oauthorise(
          code,
          context.transactionId as string,
          wallet.myAccount
        );

        return { token };
      },
      visitFarm: async (context: Context): Promise<Farm> => {
        if (!context.visitingFarmId) throw new Error("No Visiting Farm ID");

        const farmAccount = await getFarm(
          wallet.web3Provider,
          context.visitingFarmId
        );
        const isBlacklisted = await isFarmBlacklisted(context.visitingFarmId);

        return {
          farmId: parseInt(farmAccount.tokenId),
          address: farmAccount.account,
          createdAt: 0,
          blacklistStatus: isBlacklisted ? "REJECTED" : "OK",
        };
      },
    },
    actions: {
      assignFullUser: assign<Context, any>({
        user: (context, event) => ({
          ...context.user,
          type: "FULL",
          web3: context.user.web3,
          farmId: event.data.farmId,
          farmAddress: event.data.address,
        }),
        blacklistStatus: (_, event) => event.data.blacklistStatus,
        verificationUrl: (_, event) => event.data.verificationUrl,
      }),
      assignToken: assign<Context, any>({
        user: (context, event) => ({
          ...context.user,
          token: decodeToken(event.data.token),
          rawToken: event.data.token,
        }),
      }),
      assignErrorMessage: assign<Context, any>({
        errorCode: (_context, event) => event.data.message,
      }),
      assignUser: assign<Context, any>({
        user: (_context, event) => ({
          type: "FULL",
          web3: event.data.web3,
        }),
      }),
      refreshFarm: assign<Context, any>({
        visitingFarmId: undefined,
      }),
      clearSession: () => removeSession(wallet.myAccount as string),
      deleteFarmIdUrl: deleteFarmUrl,
      setTransactionId: assign<Context, any>({
        transactionId: () => randomID(),
      }),
      clearTransactionId: assign<Context, any>({
        transactionId: () => undefined,
      }),
    },
    guards: {
      isFresh: (context: Context, event: any) => {
        if (!event.data?.farmId) {
          return false;
        }

        const secondsElapsed =
          Date.now() / 1000 - (event.data as Farm).createdAt;
        return secondsElapsed < 60;
      },
      hasFarm: (context: Context, event: any) => {
        // If coming from the loadingFarm transition the farmId with show up on the event
        // else we check for it on the context
        if (event.data?.farmId) {
          const { farmId } = event.data;

          return !!farmId;
        }

        if (context.user.type === "FULL") return !!context.user.farmId;

        return false;
      },
      isVisitingUrl: () => window.location.href.includes("visit"),
      hasDiscordCode: () => !!getDiscordCode(),
    },
  }
);
