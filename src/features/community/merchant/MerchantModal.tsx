import React, { useContext } from "react";
import { useActor, useMachine } from "@xstate/react";
import { Modal } from "react-bootstrap";

import { Panel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import * as AuthProvider from "features/auth/lib/Provider";
import { Context } from "features/community/lib/CommunityProvider";
import { frogMachine } from "./lib/frogMachine";

// images
import seal_unrevealed from "features/community/assets/seals/seal_unrevealed.gif";
import close from "assets/icons/close.png";

import { CONFIG } from "lib/config";
import { PIXEL_SCALE } from "features/game/lib/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { authService } = useContext(AuthProvider.Context);
  const [authState] = useActor(authService);
  const { communityService } = useContext(Context);
  const [communityState] = useActor(communityService);
  const [machine, send] = useMachine(frogMachine);
  const { state, errorCode } = machine.context;

  // links
  const openseaLink =
    CONFIG.NETWORK == "mainnet"
      ? "https://opensea.io/collection/project-dignity-seals-collection"
      : "https://testnets.opensea.io/collection/project-dignity-seals";
  const projectDignity = "https://www.dignity-games.com";

  const handleClose = () => onClose();

  return (
    <Modal centered show={isOpen} onHide={handleClose}>
      <Panel className="relative">
        <div className="flex flex-col items-center mt-1 mb-1">
          <h1 className="text-lg mb-2 text-center">
            {`This season's event: Seals!`}
          </h1>
          <p className="text-xs mb-4\2 mt-2 text-center">
            {`Note: This is a Community Feature`}
          </p>
          <p className="text-xxs mb-4\2 mt-2 text-center">
            initiated by{" "}
            <a href={`${projectDignity}/team`} target="_blank" rel="noreferrer">
              Project Dignity
            </a>
          </p>
          <img
            src={seal_unrevealed}
            alt="Random seal unrevealed"
            className="m-2"
            width="200px"
          />
          <span className="text-xs">
            Are you ready to mint seals? Check out our website!
          </span>
          <Button
            className="text-xs mt-2"
            onClick={() => window.open(projectDignity, "_blank")}
          >
            Go to Project Dignity Website
          </Button>
          <Button
            className="text-xs mt-2"
            onClick={() => window.open(openseaLink, "_blank")}
          >
            Check on OpenSea
          </Button>
          <img
            src={close}
            className="absolute cursor-pointer z-20"
            onClick={onClose}
            style={{
              top: `${PIXEL_SCALE * 6}px`,
              right: `${PIXEL_SCALE * 6}px`,
              width: `${PIXEL_SCALE * 11}px`,
            }}
          />
        </div>
      </Panel>
    </Modal>
  );
};
