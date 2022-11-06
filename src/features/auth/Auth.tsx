import React, { useContext } from "react";
import { useActor } from "@xstate/react";
import Modal from "react-bootstrap/esm/Modal";

import * as AuthProvider from "features/auth/lib/Provider";

import { ErrorMessage } from "./ErrorMessage";
import { Panel } from "components/ui/Panel";
import {
  NoFarm,
  CreatingFarm,
  Loading,
  StartFarm,
  VisitFarm,
  CreateFarm,
} from "./components";

import jumpingGoblin from "assets/npcs/goblin_jump.gif";
import curly from "assets/npcs/curly_hair.png";
import { Signing } from "./components/Signing";
import { ErrorCode } from "lib/errors";
import { SupplyReached } from "./components/SupplyReached";
import { Countdown } from "./components/Countdown";
import { Blacklisted } from "features/game/components/Blacklisted";

export const Auth: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const [authState] = useActor(authService);

  return (
    <Modal
      centered
      show={
        !authState.matches({ connected: "authorised" }) &&
        !authState.matches({ connected: "visitingContributor" }) &&
        !authState.matches("visiting")
      }
      backdrop={false}
    >
      <div className="relative">
        <img
          id="curly"
          src={curly}
          className="absolute w-54 -top-11 right-20 -z-10 scale-[4]"
        />
        <img
          src={jumpingGoblin}
          className="absolute w-54 -top-[59px] right-[25rem] -z-10 scale-[4]"
        />
        <Panel>
          {(authState.matches({ connected: "loadingFarm" }) ||
            authState.matches("checkFarm") ||
            authState.matches({ connected: "checkingSupply" }) ||
            authState.matches({ connected: "checkingAccess" })) && <Loading />}
          {authState.matches("connecting") && <Loading text="Connecting" />}
          {authState.matches("signing") && <Signing />}
          {authState.matches({ connected: "noFarmLoaded" }) && <NoFarm />}
          {authState.matches({ connected: "supplyReached" }) && (
            <SupplyReached />
          )}
          {authState.matches("oauthorising") && <Loading />}
          {authState.matches({ connected: "donating" }) && <CreateFarm />}
          {authState.matches({ connected: "countdown" }) && <Countdown />}
          {authState.matches({ connected: "creatingFarm" }) && <CreatingFarm />}
          {authState.matches({ connected: "readyToStart" }) && <StartFarm />}
          {(authState.matches({ connected: "blacklisted" }) ||
            authState.matches("blacklisted")) && (
            <Blacklisted
              verificationUrl={authState.context.verificationUrl}
              blacklistStatus={authState.context.blacklistStatus}
            />
          )}
          {authState.matches("exploring") && <VisitFarm />}
          {authState.matches("unauthorised") && (
            <ErrorMessage
              errorCode={authState.context.errorCode as ErrorCode}
            />
          )}
        </Panel>
      </div>
    </Modal>
  );
};
