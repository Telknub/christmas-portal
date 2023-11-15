import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";

import { EXPANSION_ORIGINS, LAND_SIZE } from "../lib/constants";
import { UpcomingExpansionModal } from "./UpcomingExpansionModal";
import { MapPlacement } from "./MapPlacement";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { Pontoon } from "./Pontoon";

import { Context } from "features/game/GameProvider";
import { SUNNYSIDE } from "assets/sunnyside";
import landComplete from "assets/land/land_complete.png";
import lockIcon from "assets/skills/lock.png";

import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { useActor } from "@xstate/react";
import { Revealing } from "features/game/components/Revealing";
import { Panel } from "components/ui/Panel";
import { Revealed } from "features/game/components/Revealed";
import { gameAnalytics } from "lib/gameAnalytics";
import { ModalContext } from "features/game/components/modal/ModalProvider";
import { RequirementLabel } from "components/ui/RequirementsLabel";
import Decimal from "decimal.js-light";
import { getKeys } from "features/game/types/craftables";
import { getBumpkinLevel } from "features/game/lib/level";
import { Label } from "components/ui/Label";
import { NPC_WEARABLES } from "lib/npcs";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { ITEM_DETAILS } from "features/game/types/images";
import { expansionRequirements } from "features/game/types/expansions";

const host = window.location.host.replace(/^www\./, "");
const LOCAL_STORAGE_KEY = `expansion-read.${host}-${window.location.pathname}`;

function acknowledgeRead() {
  localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toString());
}

function hasRead() {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY);
}

/**
 * The next piece of land to expand into
 */
export const UpcomingExpansion: React.FC = () => {
  const [showLockedModal, setShowLockedModal] = useState(false);

  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [showIntro, setShowIntro] = useState(!hasRead());
  const { openModal } = useContext(ModalContext);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showBumpkinModal, setShowBumpkinModal] = useState(false);

  const state = gameState.context.state;

  const playing = gameState.matches("playing");

  useEffect(() => {
    if (isRevealing && playing) {
      setIsRevealing(false);
    }
  }, [gameState.value]);

  const onExpand = () => {
    gameService.send("land.expanded");
    gameService.send("SAVE");

    const blockBucks =
      gameState.context.state.expansionRequirements?.resources["Block Buck"] ??
      0;
    if (blockBucks) {
      gameAnalytics.trackSink({
        currency: "Block Buck",
        amount: blockBucks,
        item: "Basic Land",
        type: "Fee",
      });
    }

    const expansions =
      (gameState.context.state.inventory["Basic Land"]?.toNumber() ?? 3) + 1;
    gameAnalytics.trackMilestone({
      event: `Farm:Expanding:Expansion${expansions}`,
    });

    setShowBumpkinModal(false);
  };

  const onReveal = () => {
    setIsRevealing(true);
    const state = gameService.send("land.revealed");

    if (state.context.state.inventory["Basic Land"]?.eq(4)) {
      openModal("FIRST_EXPANSION");
    }

    if (state.context.state.inventory["Basic Land"]?.eq(5)) {
      openModal("SECOND_EXPANSION");
    }
  };

  const Content = () => {
    useUiRefresher({
      active:
        state.expansionConstruction &&
        state.expansionConstruction?.readyAt > Date.now(),
    });

    // Land is still being built
    if (state.expansionConstruction) {
      const origin =
        EXPANSION_ORIGINS[state.inventory["Basic Land"]?.toNumber() ?? 3];

      // Being Built
      if (state.expansionConstruction.readyAt > Date.now()) {
        return (
          <MapPlacement
            x={origin.x - LAND_SIZE / 2}
            y={origin.y + LAND_SIZE / 2}
            height={LAND_SIZE}
            width={LAND_SIZE}
          >
            <Pontoon expansion={state.expansionConstruction} />
          </MapPlacement>
        );
      }

      // Ready
      return (
        <MapPlacement
          x={origin.x - LAND_SIZE / 2}
          y={origin.y + LAND_SIZE / 2}
          height={LAND_SIZE}
          width={LAND_SIZE}
        >
          <img
            src={landComplete}
            className="absolute cursor-pointer hover:img-highlight"
            onClick={onReveal}
            style={{
              width: `${PIXEL_SCALE * 66}px`,
              left: `${PIXEL_SCALE * 18}px`,
              bottom: `${PIXEL_SCALE * 12}px`,
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: `${PIXEL_SCALE * 20}px`,
              left: `${PIXEL_SCALE * 42}px`,
              bottom: `${PIXEL_SCALE * 36}px`,
            }}
          >
            <img src={SUNNYSIDE.icons.disc} className="w-full" />
            <img
              src={SUNNYSIDE.icons.confirm}
              className="absolute"
              style={{
                width: `${PIXEL_SCALE * 12}px`,
                left: `${PIXEL_SCALE * 4}px`,
                bottom: `${PIXEL_SCALE * 5}px`,
              }}
            />
          </div>
        </MapPlacement>
      );
    }

    const nextPosition =
      EXPANSION_ORIGINS[state.inventory["Basic Land"]?.toNumber() ?? 0];

    const requirements = state.expansionRequirements;

    const isLocked =
      getBumpkinLevel(state.bumpkin?.experience ?? 0) <
      (state.expansionRequirements?.bumpkinLevel ?? 0);
    return (
      <>
        <Modal
          centered
          show={showLockedModal}
          onHide={() => setShowLockedModal(false)}
        >
          <CloseButtonPanel onClose={() => setShowLockedModal(false)}>
            <div className="flex flex-col items-center">
              <Label className="mt-2" icon={lockIcon} type="danger">
                {`Level ${state.expansionRequirements?.bumpkinLevel} required`}
              </Label>
              <img
                src={ITEM_DETAILS.Hammer.image}
                className="w-20 mx-auto my-2"
              />
              <p className="text-sm text-center mb-2">
                Visit the Fire Pit to cook food and feed your Bumpkin.
              </p>
            </div>
          </CloseButtonPanel>
        </Modal>

        <MapPlacement
          x={nextPosition.x - LAND_SIZE / 2}
          y={nextPosition.y + LAND_SIZE / 2}
          height={LAND_SIZE}
          width={LAND_SIZE}
        >
          <div className="w-full h-full flex flex-col items-center justify-center opacity-90 hover:opacity-100">
            <img
              src={SUNNYSIDE.icons.expand}
              width={18 * PIXEL_SCALE}
              className="relative cursor-pointer hover:img-highlight"
              onClick={() => {
                if (isLocked) {
                  setShowLockedModal(true);
                } else {
                  setShowBumpkinModal(true);
                }
              }}
            />
            {state.expansionRequirements && (
              <>
                <div className="flex mt-2">
                  {getKeys(state.expansionRequirements?.resources ?? {}).map(
                    (name) => (
                      <div className="mr-3 flex items-center" key={name}>
                        <RequirementLabel
                          type="item"
                          item={name}
                          requirement={
                            new Decimal(
                              state.expansionRequirements?.resources[name] ?? 0
                            )
                          }
                          balance={state.inventory[name] ?? new Decimal(0)}
                        />
                        {state.inventory[name]?.gte(
                          state.expansionRequirements?.resources[name] ?? 0
                        ) && (
                          <img
                            src={SUNNYSIDE.icons.confirm}
                            className="h-4 ml-0.5"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
                {isLocked && (
                  <Label
                    type="default"
                    icon={lockIcon}
                    className="mt-2"
                  >{`Level ${state.expansionRequirements?.bumpkinLevel}`}</Label>
                )}
              </>
            )}
          </div>
        </MapPlacement>
      </>
    );
  };

  return (
    <>
      <Content />

      {gameState.matches("revealing") && isRevealing && (
        <Modal show centered>
          <CloseButtonPanel>
            <Revealing icon={SUNNYSIDE.npcs.goblin_hammering} />
          </CloseButtonPanel>
        </Modal>
      )}

      {gameState.matches("revealed") && isRevealing && (
        <Modal show centered>
          <Panel>
            <Revealed />
          </Panel>
        </Modal>
      )}
      <Modal
        show={showBumpkinModal}
        onHide={() => setShowBumpkinModal(false)}
        centered
      >
        {showIntro && (
          <SpeakingModal
            message={[
              {
                text: "Greetings, budding farmer! I am Grimbly, a seasoned Goblin Builder.",
              },
              {
                text: "With the right materials and my ancient crafting skills, we can turn your island into a masterpiece.",
              },
            ]}
            onClose={() => {
              acknowledgeRead();
              setShowIntro(false);
            }}
            bumpkinParts={NPC_WEARABLES.grimbly}
          />
        )}

        {!showIntro && (
          <CloseButtonPanel
            bumpkinParts={NPC_WEARABLES.grimbly}
            title="Expand your land"
            onClose={() => setShowBumpkinModal(false)}
          >
            <UpcomingExpansionModal
              gameState={state}
              onClose={() => setShowBumpkinModal(false)}
              onExpand={onExpand}
            />
          </CloseButtonPanel>
        )}
      </Modal>
    </>
  );
};
