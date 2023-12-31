import { useActor } from "@xstate/react";
import React, { useContext, useState } from "react";

import festiveTreeImage from "assets/sfts/festive_tree.png";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { Context } from "features/game/GameProvider";
import { Revealing } from "features/game/components/Revealing";
import { Revealed } from "features/game/components/Revealed";
import { Panel } from "components/ui/Panel";
import Modal from "react-bootstrap/esm/Modal";
import classNames from "classnames";
import { Label } from "components/ui/Label";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { NPC_WEARABLES } from "lib/npcs";

interface Props {
  id: string;
}

export const FestiveTree: React.FC<Props> = ({ id }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [showGiftedModal, setShowGiftedModal] = useState(false);
  const [showWrongTimeModal, setShowWrongTimeModal] = useState(false);
  const trees = gameState.context.state.collectibles["Festive Tree"] ?? [];
  const tree = trees.find((t) => t.id === id);

  const [isRevealing, setIsRevealing] = useState(false);

  const shake = () => {
    setIsRevealing(true);

    if (
      tree?.shakenAt &&
      new Date(tree.shakenAt).getFullYear() === new Date().getFullYear()
    ) {
      setShowGiftedModal(true);
      return;
    }

    if (new Date().getMonth() !== 11 || new Date().getDate() < 20) {
      setShowWrongTimeModal(true);
      return;
    }

    gameService.send("REVEAL", {
      event: {
        type: "festiveTree.shook",
        id,
        createdAt: new Date(),
      },
    });
  };

  return (
    <>
      <Modal
        centered
        show={showGiftedModal}
        onHide={() => setShowGiftedModal(false)}
      >
        <CloseButtonPanel
          bumpkinParts={NPC_WEARABLES.santa}
          onClose={() => setShowGiftedModal(false)}
        >
          <div className="p-2">
            <Label type="danger">Greedy Bumpkin Detected</Label>
            <p className="text-sm mt-2">
              This tree has already been gifted. Wait until next Christmas for
              more festivities.
            </p>
          </div>
        </CloseButtonPanel>
      </Modal>

      <Modal
        centered
        show={showWrongTimeModal}
        onHide={() => setShowWrongTimeModal(false)}
      >
        <CloseButtonPanel
          bumpkinParts={NPC_WEARABLES.santa}
          onClose={() => setShowWrongTimeModal(false)}
        >
          <div className="p-2">
            <Label type="danger">Greedy Bumpkin Detected</Label>
            <p className="text-sm mt-2">
              It is not the Festive season. Come back later.
            </p>
          </div>
        </CloseButtonPanel>
      </Modal>

      <div
        className={classNames("absolute w-full h-full", {
          "cursor-pointer hover:img-highlight": true,
        })}
        onClick={shake}
      >
        <img
          src={festiveTreeImage}
          style={{
            width: `${PIXEL_SCALE * 30}px`,
            bottom: `${PIXEL_SCALE * 2}px`,
            left: `${PIXEL_SCALE * 1}px`,
          }}
          className="absolute pointer-events-none"
          alt="Festive Tree"
        />
      </div>

      {gameState.matches("revealing") && isRevealing && (
        <Modal show centered>
          <Panel bumpkinParts={NPC_WEARABLES.santa}>
            <Revealing icon={festiveTreeImage} />
          </Panel>
        </Modal>
      )}
      {gameState.matches("revealed") && isRevealing && (
        <Modal show centered>
          <Panel bumpkinParts={NPC_WEARABLES.santa}>
            <Revealed onAcknowledged={() => setIsRevealing(false)} />
          </Panel>
        </Modal>
      )}
    </>
  );
};
