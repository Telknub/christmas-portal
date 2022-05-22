import React, { useEffect, useState, useContext } from "react";
import { useActor } from "@xstate/react";
import { metamask } from "lib/blockchain/metamask";
import { Panel } from "components/ui/Panel";
import { Modal } from "react-bootstrap";
import { ItemsModal } from "./ItemsModal";
import { Button } from "components/ui/Button";
import { Minting } from "features/game/components/Minting";
import { ErrorMessage } from "features/auth/ErrorMessage";

import brokenRocket from "assets/mom/mom_broken_rocket.gif";
import fixedRocket from "assets/mom/mom_fixed_rocket.png";
import launchingRocket from "assets/mom/mom_launching_rocket.gif";
import burnMark from "assets/mom/mom_burnt_ground.png";
import close from "assets/icons/close.png";
import observatory from "assets/nfts/mom/observatory.gif";
import { melonDuskAudio, rocketLaunchAudio } from "lib/utils/sfx";
import momNpc from "assets/mom/mom_npc.gif";
import scaffoldingLeft from "assets/mom/scaffolding_left.png";
import scaffoldingRight from "assets/mom/scaffolding_right.png";
import support from "assets/mom/launch-pad-material-2.png";
import platform from "assets/mom/launch-pad-material-3.png";
import woodPile from "assets/mom/launch-pad-material-4.png";
import goblinHammering from "assets/mom/goblin_mechanic_1.gif";
import goblinWelding from "assets/mom/goblin_mechanic_2.gif";
import goblinForeman from "assets/mom/goblin_mechanic_3.gif";
import metalSheetsPileFew from "assets/mom/metal-sheets-pile-few.png";
import metalSheetsPileMany from "assets/mom/metal-sheets-pile-many.png";

import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { Context } from "features/game/GoblinProvider";

const ROCKET_LAUNCH_TO_DIALOG_TIMEOUT = 4000;
const MELON_DUSK_SEEN = "isMelonDuskSeen";

export const Rocket: React.FC = () => {
  const { goblinService } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(goblinService);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [isRocketLaunchComplete, setIsRocketLaunchComplete] = useState(false);
  const [hasCompletedMission, setHasCompletedMission] = useState(false);
  const [isMintingObservatory, setIsMintingObservatory] = useState(false);
  const [observatoryMintError, setObservatoryMintError] =
    useState<Error | null>(null);

  const isRocketFixed = (state.inventory["Engine Core"]?.toNumber() || 0) > 0;
  const hasCompletedQuest = (state.inventory.Observatory?.toNumber() || 0) > 0;

  // Check if player has already completed mission
  useEffect(() => {
    (async () => {
      const isComplete = await metamask
        .getMillionOnMars()
        .hasCompletedMission();

      setHasCompletedMission(isComplete);
      // If player has already completed mission, then the launch is also complete
      setIsRocketLaunchComplete(isComplete);
    })();
  }, []);

  useEffect(() => {
    if (!isRocketLaunching) {
      return;
    }
    melonDuskAudio.stop();
    rocketLaunchAudio.play();
    setTimeout(() => {
      setIsRocketLaunching(false);
      setIsRocketLaunchComplete(true);
      setIsDialogOpen(true);
      melonDuskAudio.play();
    }, ROCKET_LAUNCH_TO_DIALOG_TIMEOUT);
  }, [isRocketLaunching]);

  const handleLaunchRocket = () => {
    setIsDialogOpen(false);
    if (isRocketLaunching) {
      // Don't launch again if it's already launching
      return;
    }
    setIsRocketLaunching(true);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    if (
      isMelonDuskSeen &&
      !isRocketFixed &&
      !hasCompletedMission &&
      !hasCompletedQuest
    ) {
      handleOpenItemsDialog();
    }
    if (!melonDuskAudio.playing()) {
      melonDuskAudio.play();
    }
  };

  const handleCloseDialog = () => {
    melonDuskAudio.stop();
    setIsDialogOpen(false);
    setObservatoryMintError(null);
  };

  const handleOpenItemsDialog = () => {
    localStorage.setItem(MELON_DUSK_SEEN, JSON.stringify(true));
    setIsItemsOpen(true);
  };

  const handleMintObservatory = async () => {
    setIsMintingObservatory(true);
    try {
      await metamask.getMillionOnMars().trade();
      setIsMintingObservatory(false);
      goblinService.send("REFRESH");
      // TODO - show loading text until blockchain state is refreshed - don't show dialog immediately.
      handleOpenDialog();
    } catch (err) {
      setObservatoryMintError(err as Error);
    }
  };

  const rocketImage =
    isRocketLaunching || isRocketLaunchComplete
      ? burnMark
      : isRocketFixed
      ? fixedRocket
      : brokenRocket;

  const isMelonDuskSeen = localStorage.getItem(MELON_DUSK_SEEN);

  const content = () => {
    if (hasCompletedQuest) {
      return (
        <span className="text-shadow block my-2 text-xs sm:text-sm">
          Enjoy your new observatory captain! Go back to your farm and sync on
          chain to start using it.
        </span>
      );
    }

    if (hasCompletedMission) {
      return (
        <>
          <span className="text-shadow block my-2 text-xs sm:text-sm">
            Great job on Mars Interplanetary Farmer! In exchange for your token
            received on Mars, I will give you something to remember me by. After
            this trade, go back to your farm and sync on chain to see it.t.
          </span>
          <img className="mx-auto mb-2" src={observatory} alt="Observatory" />
          <Button className="text-sm" onClick={handleMintObservatory}>
            Mint Now
          </Button>
        </>
      );
    }

    if (isRocketFixed && isRocketLaunchComplete) {
      return (
        <>
          <span className="text-shadow block my-4">
            When you complete your mission on Mars, come back and talk with me.
          </span>
          <p className="text-xs sm:text-sm text-shadow text-white p-1 mb-2">
            {/* TODO - Add MoM href link */}
            <a
              className="underline"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to continue your mission
            </a>
          </p>
        </>
      );
    }

    if (isRocketFixed && !isRocketLaunchComplete) {
      return (
        <>
          <span className="text-shadow block my-4">
            Rocket is ready to launch, whenever you&apos;re ready captain!
          </span>
          <Button className="text-sm" onClick={handleLaunchRocket}>
            Launch Rocket
          </Button>
        </>
      );
    }

    return (
      <>
        <span className="text-shadow mr-4 block">
          Help! My rocket has crash landed and needs repairs. Can you help me
          fix it?
        </span>
        <Button className="text-sm" onClick={handleOpenItemsDialog}>
          Fix rocket
        </Button>
      </>
    );
  };

  return (
    <>
      <div
        className="absolute"
        style={{
          width: `${GRID_WIDTH_PX * 5}px`,
          right: `${GRID_WIDTH_PX * 18}px`,
          top: `${GRID_WIDTH_PX * 15}px`,
        }}
        onClick={handleOpenDialog}
      >
        <div className="absolute cursor-pointer hover:img-highlight w-full">
          <img
            src={momNpc}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 1.2}px`,
              top: `${GRID_WIDTH_PX * 3.3}px`,
              right: `${GRID_WIDTH_PX * 3.92}px`,
              zIndex: 2,
            }}
          />
          <img src={rocketImage} className="w-56 relative z-10" />

          <img
            src={scaffoldingLeft}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 2.62}px`,
              top: `${GRID_WIDTH_PX * 0.83}px`,
              left: `${GRID_WIDTH_PX * -0.48}px`,
              zIndex: 1,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={scaffoldingRight}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 2.5}px`,
              top: `${GRID_WIDTH_PX * 0.78}px`,
              right: `${GRID_WIDTH_PX * -1.26}px`,
              zIndex: 1,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={support}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 5}px`,
              top: `${GRID_WIDTH_PX * 1.38}px`,
              left: `${GRID_WIDTH_PX * 0.31}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={platform}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 2.14}px`,
              top: `${GRID_WIDTH_PX * 1.69}px`,
              right: `${GRID_WIDTH_PX * -4.5}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={woodPile}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 1.1}px`,
              top: `${GRID_WIDTH_PX * 4.25}px`,
              right: `${GRID_WIDTH_PX * -3}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={goblinForeman}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 0.95}px`,
              left: `${GRID_WIDTH_PX * 5}px`,
              bottom: `${GRID_WIDTH_PX * -0.01}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={goblinWelding}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 1.55}px`,
              right: `${GRID_WIDTH_PX * 3.6}px`,
              bottom: `${GRID_WIDTH_PX * -1}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={goblinHammering}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 1.55}px`,
              left: `${GRID_WIDTH_PX * 3.7}px`,
              bottom: `${GRID_WIDTH_PX * -2.25}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={metalSheetsPileMany}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 1}px`,
              right: `${GRID_WIDTH_PX * 2.7}px`,
              bottom: `${GRID_WIDTH_PX * -3}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
          <img
            src={metalSheetsPileFew}
            style={{
              position: "absolute",
              width: `${GRID_WIDTH_PX * 1}px`,
              right: `${GRID_WIDTH_PX * 2.1}px`,
              bottom: `${GRID_WIDTH_PX * -3.5}px`,
              visibility: `${isMelonDuskSeen ? `visible` : `hidden`}`,
            }}
          />
        </div>
      </div>

      {isRocketLaunching && (
        <img
          src={launchingRocket}
          className="absolute launching"
          style={{
            width: `${GRID_WIDTH_PX * 5}px`,
            top: `${GRID_WIDTH_PX * 14}px`,
            left: `${GRID_WIDTH_PX * 2}px`,
            zIndex: 100,
          }}
        />
      )}

      <Modal centered show={isDialogOpen} onHide={handleCloseDialog}>
        {isMintingObservatory && (
          <Panel className="text-shadow">
            {/* TODO - use a better errorCode strategy */}
            {observatoryMintError === null ? (
              <Minting />
            ) : (
              <ErrorMessage errorCode="FAILED_REQUEST" />
            )}
          </Panel>
        )}
        {!isMintingObservatory && isItemsOpen && (
          <ItemsModal isOpen={isDialogOpen} onClose={handleCloseDialog} />
        )}
        {!isMintingObservatory && !isItemsOpen && (
          <Panel>
            <img
              src={close}
              className="h-6 top-4 right-4 absolute cursor-pointer"
              onClick={handleCloseDialog}
            />
            <div className="flex items-start pr-6">
              <img src={momNpc} className="w-16 img-highlight mr-2" />
              <div className="flex-1">
                <span className="text-shadow block">Melon Dusk</span>
                {content()}
              </div>
            </div>
          </Panel>
        )}
      </Modal>
    </>
  );
};
