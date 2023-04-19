import React, { useContext, useEffect, useState } from "react";

import townCenter from "assets/buildings/town_center.png";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { BuildingProps } from "../Building";
import { HayseedHank } from "features/helios/components/hayseedHank/HayseedHank";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import { Airdrop } from "features/game/expansion/components/Airdrop";
import { LetterBox } from "features/farming/mail/LetterBox";
import { PlayerNPC } from "features/island/bumpkin/components/PlayerNPC";
import { SUNNYSIDE } from "assets/sunnyside";
import { Bumpkin } from "features/game/types/game";
import { BuildingImageWrapper } from "../BuildingImageWrapper";

export const TownCenter: React.FC<BuildingProps> = ({ isBuilt, onRemove }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [showHeart, setShowHeart] = useState(false);

  const handleClick = () => {
    if (onRemove) {
      onRemove();
      return;
    }

    if (isBuilt) {
      // Add future on click actions here
      return;
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    gameService.onEvent((event) => {
      if (event.type === "recipe.collected") {
        setShowHeart(true);
        timeout = setTimeout(() => setShowHeart(false), 3000);
      }
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const bumpkin = gameState.context.state.bumpkin as Bumpkin;

  return (
    <div
      className="absolute h-full"
      style={{
        width: `${PIXEL_SCALE * 62}px`,
        bottom: `${PIXEL_SCALE * 0}px`,
        left: `${PIXEL_SCALE * 1}px`,
      }}
    >
      <BuildingImageWrapper onClick={handleClick} nonInteractible={!onRemove}>
        <img
          src={townCenter}
          className="absolute pointer-events-none"
          style={{
            width: `${PIXEL_SCALE * 62}px`,
            bottom: `${PIXEL_SCALE * 0}px`,
            left: `${PIXEL_SCALE * 1}px`,
          }}
        />
      </BuildingImageWrapper>

      <HayseedHank />

      <img
        src={SUNNYSIDE.icons.heart}
        className="absolute animate-pulsate transition-opacity"
        style={{
          width: `${PIXEL_SCALE * 10}px`,
          top: `${PIXEL_SCALE * -6}px`,
          left: `${PIXEL_SCALE * 4}px`,
          opacity: showHeart ? 100 : 0,
        }}
      />

      <div
        className="absolute z-20"
        style={{
          top: `${PIXEL_SCALE * 16}px`,
          left: `${PIXEL_SCALE * 4}px`,
          width: `${PIXEL_SCALE * 16}px`,
          height: `${PIXEL_SCALE * 32}px`,
        }}
      >
        {bumpkin && (
          <PlayerNPC
            body={bumpkin.equipped.body}
            hair={bumpkin.equipped.hair}
            shirt={bumpkin.equipped.shirt}
            pants={bumpkin.equipped.pants}
            hat={bumpkin.equipped.hat}
            suit={bumpkin.equipped.suit}
            onesie={bumpkin.equipped.onesie}
            wings={bumpkin.equipped.wings}
            dress={bumpkin.equipped.dress}
          />
        )}
      </div>

      <div
        className="absolute"
        style={{
          top: 0,
          left: `${PIXEL_SCALE * 4}px`,
        }}
      >
        <LetterBox />
      </div>
      <div
        className="absolute"
        style={{
          top: `${PIXEL_SCALE * 20}px`,
          left: `${PIXEL_SCALE * 24}px`,
        }}
      >
        <Airdrop />
      </div>
    </div>
  );
};
