import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "@xstate/react";

import { useInterval } from "lib/utils/hooks/useInterval";
import * as AuthProvider from "features/auth/lib/Provider";

import { Loading } from "features/auth/components";
import { ErrorCode } from "lib/errors";
import { ErrorMessage } from "features/auth/ErrorMessage";
import { screenTracker } from "lib/utils/screen";
import { Refreshing } from "features/auth/components/Refreshing";
import { AddingSFL } from "features/auth/components/AddingSFL";
import { Context } from "../GameProvider";
import { INITIAL_SESSION, MachineState, StateValues } from "../lib/gameMachine";
import { ToastProvider } from "../toast/ToastProvider";
import { ToastPanel } from "../toast/ToastPanel";
import { Panel } from "components/ui/Panel";
import { Success } from "../components/Success";
import { Syncing } from "../components/Syncing";

import { Notifications } from "../components/Notifications";
import { Hoarding } from "../components/Hoarding";
import { NoBumpkin } from "features/island/bumpkin/NoBumpkin";
import { Swarming } from "../components/Swarming";
import { Cooldown } from "../components/Cooldown";
import { Route, Routes } from "react-router-dom";
import { Land } from "./Land";
import { Helios } from "features/helios/Helios";
import { VisitingHud } from "features/island/hud/VisitingHud";
import { VisitLandExpansionForm } from "./components/VisitLandExpansionForm";

import land from "assets/land/islands/island.webp";
import { TreasureIsland } from "features/treasureIsland/TreasureIsland";
import { getBumpkinLevel } from "../lib/level";
import { SnowKingdom } from "features/snowKingdom/SnowKingdom";
import { IslandNotFound } from "./components/IslandNotFound";
import { Studios } from "features/studios/Studios";
import { Rules } from "../components/Rules";
import { PumpkinPlaza } from "features/pumpkinPlaza/PumpkinPlaza";
import { BeachParty } from "features/pumpkinPlaza/BeachParty";
import { HeadQuarters } from "features/pumpkinPlaza/HeadQuarters";
import { StoneHaven } from "features/pumpkinPlaza/StoneHaven";
import { WalletOnboarding } from "features/tutorials/wallet/WalletOnboarding";
import { Introduction } from "./components/Introduction";
import { NoTownCenter } from "../components/NoTownCenter";
import { Promoting } from "./components/Promoting";
import { Purchasing } from "../components/Purchasing";

export const AUTO_SAVE_INTERVAL = 1000 * 30; // autosave every 30 seconds
const SHOW_MODAL: Record<StateValues, boolean> = {
  loading: true,
  playingFullGame: false,
  playingGuestGame: false,
  playing: false,
  autosaving: false,
  syncing: true,
  synced: true,
  error: true,
  purchasing: true,
  refreshing: true,
  deposited: true,
  hoarding: true,
  landscaping: false,
  noBumpkinFound: true,
  noTownCenter: true,
  swarming: true,
  coolingDown: true,
  gameRules: true,
  randomising: false,
  visiting: false,
  loadLandToVisit: true,
  landToVisitNotFound: true,
  revealing: false,
  revealed: false,
  buyingSFL: true,
  depositing: true,
  upgradingGuestGame: false,
  introduction: false,
  promoting: false,
};

// State change selectors
const isLoading = (state: MachineState) => state.matches("loading");
const isRefreshing = (state: MachineState) => state.matches("refreshing");
const isBuyingSFL = (state: MachineState) => state.matches("buyingSFL");
const isDeposited = (state: MachineState) => state.matches("deposited");
const isError = (state: MachineState) => state.matches("error");
const isSynced = (state: MachineState) => state.matches("synced");
const isSyncing = (state: MachineState) => state.matches("syncing");
const isHoarding = (state: MachineState) => state.matches("hoarding");
const isVisiting = (state: MachineState) => state.matches("visiting");
const isSwarming = (state: MachineState) => state.matches("swarming");
const isPurchasing = (state: MachineState) => state.matches("purchasing");
const isNoTownCenter = (state: MachineState) => state.matches("noTownCenter");
const isNoBumpkinFound = (state: MachineState) =>
  state.matches("noBumpkinFound");
const isCoolingDown = (state: MachineState) => state.matches("coolingDown");
const isGameRules = (state: MachineState) => state.matches("gameRules");
const isDepositing = (state: MachineState) => state.matches("depositing");
const isLoadingLandToVisit = (state: MachineState) =>
  state.matches("loadLandToVisit");
const isLoadingSession = (state: MachineState) =>
  state.matches("loading") && state.context.sessionId === INITIAL_SESSION;
const isLandToVisitNotFound = (state: MachineState) =>
  state.matches("landToVisitNotFound");
const bumpkinLevel = (state: MachineState) =>
  getBumpkinLevel(state.context.state.bumpkin?.experience ?? 0);
const currentState = (state: MachineState) => state.value;
const getErrorCode = (state: MachineState) => state.context.errorCode;
const getActions = (state: MachineState) => state.context.actions;
const isUpgradingGuestGame = (state: MachineState) =>
  state.matches("upgradingGuestGame");

export const Game: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const { gameService } = useContext(Context);

  const loading = useSelector(gameService, isLoading);
  const refreshing = useSelector(gameService, isRefreshing);
  const buyingSFL = useSelector(gameService, isBuyingSFL);
  const deposited = useSelector(gameService, isDeposited);
  const error = useSelector(gameService, isError);
  const synced = useSelector(gameService, isSynced);
  const syncing = useSelector(gameService, isSyncing);
  const purchasing = useSelector(gameService, isPurchasing);
  const hoarding = useSelector(gameService, isHoarding);
  const swarming = useSelector(gameService, isSwarming);
  const noBumpkinFound = useSelector(gameService, isNoBumpkinFound);
  const noTownCenter = useSelector(gameService, isNoTownCenter);
  const coolingDown = useSelector(gameService, isCoolingDown);
  const gameRules = useSelector(gameService, isGameRules);
  const depositing = useSelector(gameService, isDepositing);
  const visiting = useSelector(gameService, isVisiting);
  const loadingLandToVisit = useSelector(gameService, isLoadingLandToVisit);
  const loadingSession = useSelector(gameService, isLoadingSession);
  const landToVisitNotFound = useSelector(gameService, isLandToVisitNotFound);
  const level = useSelector(gameService, bumpkinLevel);
  const state = useSelector(gameService, currentState);
  const errorCode = useSelector(gameService, getErrorCode);
  const actions = useSelector(gameService, getActions);
  const upgradingGuestGame = useSelector(gameService, isUpgradingGuestGame);

  useInterval(() => {
    gameService.send("SAVE");
  }, AUTO_SAVE_INTERVAL);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (actions.length === 0) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // cleanup on every gameState update
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [actions]);

  useEffect(() => {
    const save = () => {
      gameService.send("SAVE");
    };

    window.addEventListener("blur", save);

    screenTracker.start(authService);

    // cleanup on every gameState update
    return () => {
      window.removeEventListener("blur", save);
      screenTracker.pause();
    };
  }, []);

  if (loadingSession || loadingLandToVisit) {
    return (
      <div className="h-screen w-full fixed top-0" style={{ zIndex: 1050 }}>
        <Modal show centered backdrop={false}>
          <Panel>
            <Loading />
          </Panel>
        </Modal>
      </div>
    );
  }

  const GameContent = () => {
    if (landToVisitNotFound) {
      return (
        <>
          <div className="absolute z-20">
            <VisitingHud />
          </div>
          <div className="relative">
            <Modal centered show backdrop={false}>
              <Panel
                bumpkinParts={{
                  body: "Beige Farmer Potion",
                  hair: "Rancher Hair",
                  pants: "Farmer Overalls",
                  shirt: "Red Farmer Shirt",
                  tool: "Farmer Pitchfork",
                  background: "Farm Background",
                  shoes: "Black Farmer Boots",
                }}
              >
                <div className="flex flex-col items-center">
                  <h2 className="text-center">Island Not Found!</h2>
                  <img src={land} className="h-9 my-3" />
                </div>
                <VisitLandExpansionForm />
              </Panel>
            </Modal>
          </div>
        </>
      );
    }

    if (visiting) {
      return (
        <>
          <div className="absolute z-10 w-full h-full">
            <Routes>
              <Route path="/:id" element={<Land />} />
            </Routes>
          </div>
          <div className="absolute z-20">
            <VisitingHud />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="absolute w-full h-full z-10">
          <Routes>
            <Route path="/" element={<Land />} />
            <Route path="/helios" element={<Helios key="helios" />} />
            <Route path="/snow" element={<SnowKingdom key="snow" />} />
            <Route path="/plaza" element={<PumpkinPlaza key="plaza" />} />
            <Route path="/beach" element={<BeachParty key="beach-party" />} />
            <Route
              path="/headquarters"
              element={<HeadQuarters key="headquarters" />}
            />
            {level >= 10 && (
              <Route
                path="/treasure-island"
                element={<TreasureIsland key="treasure" />}
              />
            )}

            {level >= 20 && (
              <Route
                path="/stone-haven"
                element={<StoneHaven key="stone-haven" />}
              />
            )}
            {level >= 50 && (
              <Route path="/snow" element={<SnowKingdom key="snow" />} />
            )}
            <Route path="/studios" element={<Studios key="hq" />} />

            <Route path="*" element={<IslandNotFound />} />
          </Routes>
        </div>
      </>
    );
  };

  return (
    <ToastProvider>
      <ToastPanel />

      <Modal show={SHOW_MODAL[state as StateValues]} centered>
        <Panel>
          {loading && <Loading />}
          {refreshing && <Refreshing />}
          {buyingSFL && <AddingSFL />}
          {deposited && <Notifications />}
          {error && <ErrorMessage errorCode={errorCode as ErrorCode} />}
          {synced && <Success />}
          {syncing && <Syncing />}
          {purchasing && <Purchasing />}
          {hoarding && <Hoarding />}
          {swarming && <Swarming />}
          {noBumpkinFound && <NoBumpkin />}
          {noTownCenter && <NoTownCenter />}
          {coolingDown && <Cooldown />}
          {gameRules && <Rules />}
          {depositing && <Loading text="Depositing" />}
        </Panel>
      </Modal>

      {upgradingGuestGame && <WalletOnboarding />}
      <Promoting />
      <Introduction />

      {GameContent()}
    </ToastProvider>
  );
};
