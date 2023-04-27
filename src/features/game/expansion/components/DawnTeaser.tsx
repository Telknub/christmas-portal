import { useActor } from "@xstate/react";
import React, { useContext, useState } from "react";

import island from "assets/land/dawn_teaser.png";
import { SUNNYSIDE } from "assets/sunnyside";

import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";
import { NPC } from "features/island/bumpkin/components/NPC";
import { Context } from "features/game/GameProvider";

import { MapPlacement } from "./MapPlacement";
import { PromotingModal } from "./Promoting";
import { NPC_WEARABLES } from "lib/npcs";

export const DawnTeaser: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  return (
    <>
      <PromotingModal
        hasPurchased={
          !!gameState.context.state.inventory["Dawn Breaker Banner"]
        }
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <MapPlacement x={0} y={-12} width={6}>
        <img
          src={island}
          style={{
            width: `${PIXEL_SCALE * 94}px`,
          }}
        />

        <div
          className="absolute"
          style={{
            left: `${GRID_WIDTH_PX * 2}px`,
            bottom: `${GRID_WIDTH_PX * 2.2}px`,
          }}
        >
          <NPC
            parts={NPC_WEARABLES.grubnuk}
            onClick={() => setShowModal(true)}
          />
          <img
            src={SUNNYSIDE.icons.expression_chat}
            className="relative z-50"
            style={{
              width: `${PIXEL_SCALE * 9}px`,
              top: `${PIXEL_SCALE * -2}px`,
              left: `${PIXEL_SCALE * 5}px`,
            }}
          />
        </div>
      </MapPlacement>
    </>
  );
};
