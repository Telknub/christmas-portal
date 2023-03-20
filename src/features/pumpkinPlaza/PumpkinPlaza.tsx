import React, { useContext, useLayoutEffect } from "react";
import { useActor } from "@xstate/react";

import background from "assets/land/pumpkin_island.png";

import { Context } from "features/game/GameProvider";
import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { IslandTravel } from "features/game/expansion/components/travel/IslandTravel";
import { Hud } from "features/island/hud/Hud";

import { upcomingParty } from "./lib/streaming";
import { hasFeatureAccess } from "lib/flags";

import { Room } from "./Room";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { ALLOWED_PLAZA_AREA } from "./lib/restrictedArea";
import { Leprechaun } from "./components/Leprechaun";

export const PLAZA_ROOM_ID = "plaza";

export const PumpkinPlaza: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [scrollIntoView] = useScrollIntoView();

  useLayoutEffect(() => {
    // Start with island centered
    scrollIntoView(Section.PumpkinPlaza, "auto");
  }, []);

  const party = upcomingParty();
  const isBetaTester = hasFeatureAccess(
    gameState.context.state.inventory,
    "PUMPKIN_PLAZA"
  );
  const isPartyActive =
    isBetaTester || (Date.now() > party.startAt && Date.now() < party.endAt);

  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${15 * GRID_WIDTH_PX}px`,
          height: `${17 * GRID_WIDTH_PX}px`,
        }}
      >
        <img src={background} className="absolute inset-0 w-full h-full" />
      </div>
      <Hud isFarming={false} />
      <Room
        canAccess={isPartyActive}
        allowedArea={ALLOWED_PLAZA_AREA}
        roomId={PLAZA_ROOM_ID}
        spawnPoint={{
          x: 1750,
          y: 1480,
        }}
      />
      <Leprechaun x={44} y={19} />
      <div
        id={Section.PumpkinPlaza}
        className="absolute"
        style={{
          left: 1750,
          top: 1480,
        }}
      />
      <IslandTravel
        inventory={gameState.context.state.inventory}
        bumpkin={gameState.context.state.bumpkin}
        x={1.5}
        y={-5.5}
        onTravelDialogOpened={() => gameService.send("SAVE")}
        travelAllowed={!gameState.matches("autosaving")}
      />
    </>
  );
};
