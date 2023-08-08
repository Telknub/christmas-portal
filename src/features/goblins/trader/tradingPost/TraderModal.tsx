import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";
import { Modal } from "react-bootstrap";

import { Context } from "features/game/GoblinProvider";
import { Panel } from "components/ui/Panel";

import * as AuthProvider from "features/auth/lib/Provider";

import { MachineInterpreter } from "./lib/tradingPostMachine";
import { Selling } from "../selling/Selling";
import { Buying } from "../buying/Buying";
import { Tabs } from "./components/Tabs";
import { Button } from "components/ui/Button";

interface TraderModalProps {
  isOpen: boolean;
  initialTab?: "buying" | "selling";
  onClose: () => void;
}

export const TraderModal: React.FC<TraderModalProps> = ({
  isOpen,
  initialTab = "selling",
  onClose,
}) => {
  const { goblinService } = useContext(Context);
  const [goblinState] = useActor(goblinService);
  const { authService } = useContext(AuthProvider.Context);
  const [authState] = useActor(authService);

  const child = goblinState.children.tradingPost as MachineInterpreter;

  const [machine] = useActor(child);

  const [isSelling, setIsSelling] = useState(initialTab === "selling");

  const proovePersonhood = async () => {
    goblinService.send("PROVE_PERSONHOOD");
    onClose();
  };

  const handleClose = () => {
    onClose();
    child.send("CLOSE");
  };

  const isTrading = machine.matches("trading");
  const isDisabled =
    machine.matches("loading") ||
    machine.matches("updatingSession") ||
    machine.matches("listing") ||
    machine.matches("cancelling") ||
    machine.matches("purchasing");

  const Content = () => {
    if (!goblinState.context.verified) {
      return (
        <>
          <p className="text-sm p-1 m-1">
            Proof of humanity is needed for this feature. Please take a quick
            selfie.
          </p>
          <Button className="mr-1" onClick={proovePersonhood}>
            Start Verification
          </Button>
        </>
      );
    }

    return (
      <>
        {isTrading && isSelling && <Selling />}
        {isTrading && !isSelling && <Buying />}

        {machine.matches("loading") && (
          <span className="loading m-2">Loading</span>
        )}
        {machine.matches("updatingSession") && (
          <span className="loading m-2">Refreshing</span>
        )}

        {machine.matches("listing") && (
          <span className="loading m-2">Listing</span>
        )}
        {machine.matches("cancelling") && (
          <span className="loading m-2">Cancelling</span>
        )}
        {machine.matches("purchasing") && (
          <span className="loading m-2">Purchasing</span>
        )}
      </>
    );
  };

  return (
    <Modal
      centered
      show={isOpen}
      // Prevent modal from closing during asynchronous state (listing, purchasing, cancelling, etc)
      onHide={!isDisabled ? handleClose : undefined}
    >
      <Panel className="relative" hasTabs>
        <Tabs
          disabled={isDisabled}
          isSelling={isSelling}
          setIsSelling={setIsSelling}
          onClose={handleClose}
        />
        <Content />
      </Panel>
    </Modal>
  );
};
