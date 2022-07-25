import React, { useContext, useEffect, useRef, useState } from "react";

import Spritesheet, {
  SpriteSheetInstance,
} from "components/animation/SpriteAnimator";

import sparkSheet from "assets/resources/shrub/shrub_sheet.png";
import dropSheet from "assets/resources/shrub/shrub_chopped_sheet.png";
import choppedShrub from "assets/resources/shrub/chopped_shrub.png";
import wood from "assets/resources/wood.png";

import { Context } from "features/game/GameProvider";
import { ToastContext } from "features/game/toast/ToastQueueProvider";
import classNames from "classnames";
import { useActor } from "@xstate/react";

import { getTimeLeft } from "lib/utils/time";

import { canChop } from "features/game/events/chopShrub";
import { chopAudio, treeFallAudio } from "lib/utils/sfx";
import { HealthBar } from "components/ui/HealthBar";
import { TimeLeftPanel } from "components/ui/TimeLeftPanel";
import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { LandExpansionTree } from "features/game/types/game";

const POPOVER_TIME_MS = 1000;
const HITS = 2;

// 10 minutes
const SHRUB_RECOVERY_TIME = 10 * 60;

interface Props {
  shrubIndex: number;
  expansionIndex: number;
}

export const Shrub: React.FC<Props> = ({ shrubIndex, expansionIndex }) => {
  const { gameService } = useContext(Context);
  const [game] = useActor(gameService);

  const [showPopover, setShowPopover] = useState(true);
  const [popover, setPopover] = useState<JSX.Element | null>();

  const [touchCount, setTouchCount] = useState(0);
  // When to hide the shrub that pops out
  const [collecting, setCollecting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sparkGif = useRef<SpriteSheetInstance>();
  const choppedGif = useRef<SpriteSheetInstance>();

  const [showShrubTimeLeft, setShowShrubTimeLeft] = useState(false);
  const expansion = game.context.state.expansions[expansionIndex];
  const shrub = expansion.shrubs?.[shrubIndex] as LandExpansionTree;

  // Users will need to refresh to chop the tree again
  const chopped = !canChop(shrub);
  const { setToast } = useContext(ToastContext);

  // Reset the shake count when clicking outside of the component
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setTouchCount(0);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const displayPopover = async (element: JSX.Element) => {
    setPopover(element);
    setShowPopover(true);

    await new Promise((resolve) => setTimeout(resolve, POPOVER_TIME_MS));
    setShowPopover(false);
  };

  // Show/Hide Time left on hover

  const handleMouseHoverShrub = () => {
    if (chopped) setShowShrubTimeLeft(true);
  };

  const handleMouseLeaveShrub = () => {
    setShowShrubTimeLeft(false);
  };

  const strike = () => {
    const isPlaying = sparkGif.current?.getInfo("isPlaying");

    if (!isPlaying) {
      chopAudio.play();

      sparkGif.current?.goToAndPlay(0);

      setTouchCount((count) => count + 1);

      // On second strike, chop
      if (touchCount > 0 && touchCount === HITS - 1) {
        chop();
        treeFallAudio.play();
        setTouchCount(0);
      }
    } else return;
  };

  const chop = async () => {
    setTouchCount(0);

    try {
      gameService.send("shrub.chopped", {
        index: shrubIndex,
        expansionIndex,
      });
      setCollecting(true);
      choppedGif.current?.goToAndPlay(0);

      displayPopover(
        <div className="flex">
          <img src={wood} className="w-5 h-5 mr-2" />
          <span className="text-sm text-white text-shadow">{`+${shrub.wood.amount}`}</span>
        </div>
      );

      setToast({
        icon: wood,
        content: `+${shrub.wood.amount}`,
      });

      await new Promise((res) => setTimeout(res, 2000));
      setCollecting(false);
    } catch (e: any) {
      displayPopover(
        <span className="text-xs text-white text-shadow">{e.message}</span>
      );
    }
  };

  const timeLeft = getTimeLeft(shrub.wood.choppedAt, SHRUB_RECOVERY_TIME);

  return (
    <div
      className="relative z-10"
      style={{ height: "100px" }}
      onMouseEnter={handleMouseHoverShrub}
      onMouseLeave={handleMouseLeaveShrub}
    >
      {!chopped && (
        <div
          ref={containerRef}
          className="group cursor-pointer w-full h-full"
          onClick={strike}
        >
          <Spritesheet
            className="group-hover:img-highlight pointer-events-none z-10"
            style={{
              position: "absolute",
              left: "-41px",
              top: "-25px",
              imageRendering: "pixelated",
              width: `${GRID_WIDTH_PX * 3}px`,
            }}
            getInstance={(spritesheet) => {
              sparkGif.current = spritesheet;
            }}
            image={sparkSheet}
            widthFrame={48}
            heightFrame={48}
            fps={24}
            steps={7}
            direction={`forward`}
            autoplay={false}
            loop={false}
            onLoopComplete={(spritesheet) => {
              spritesheet.pause();
            }}
          />
        </div>
      )}

      <Spritesheet
        style={{
          position: "absolute",
          left: "-90px",
          top: "-30px",
          opacity: collecting ? 1 : 0,
          transition: "opacity 0.2s ease-in",
          width: `${GRID_WIDTH_PX * 4.17}px`,
          imageRendering: "pixelated",
        }}
        className="pointer-events-none z-20"
        getInstance={(spritesheet) => {
          choppedGif.current = spritesheet;
        }}
        image={dropSheet}
        widthFrame={67}
        heightFrame={42}
        fps={20}
        steps={15}
        direction={`forward`}
        autoplay={false}
        loop={false}
        onLoopComplete={(spritesheet) => {
          spritesheet.pause();
        }}
      />

      {chopped && (
        <>
          <img
            src={choppedShrub}
            className="pointer-events-none -z-10 opacity-50 absolute"
            style={{ top: "12px", left: "22px", width: `${GRID_WIDTH_PX}px` }}
          />
        </>
      )}

      <div
        className={classNames("absolute transition-opacity content-center", {
          "opacity-100": touchCount > 0,
          "opacity-0": touchCount === 0,
        })}
        style={{ left: "24px", top: "64px" }}
      >
        <HealthBar percentage={collecting ? 0 : 100 - (touchCount / 2) * 100} />
      </div>

      {chopped && (
        <div className="absolute top-9">
          <TimeLeftPanel timeLeft={timeLeft} showTimeLeft={showShrubTimeLeft} />
        </div>
      )}

      <div
        className={classNames(
          "transition-opacity absolute top-24 w-40 left-20 z-20 pointer-events-none",
          {
            "opacity-100": showPopover,
            "opacity-0": !showPopover,
          }
        )}
      >
        {popover}
      </div>
    </div>
  );
};
