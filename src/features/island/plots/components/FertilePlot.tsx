import React, { useState } from "react";

import { CROPS, CropName } from "features/game/types/crops";
import { ITEM_DETAILS } from "features/game/types/images";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { GrowthStage, Soil } from "features/island/plots/components/Soil";
import { Bar, ProgressBar } from "components/ui/ProgressBar";
import { TimerPopover } from "../../common/TimerPopover";
import { getTimeLeft } from "lib/utils/time";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";
import { Fertilisers } from "features/game/types/game";
import classNames from "classnames";

interface Props {
  cropName?: CropName;
  plantedAt?: number;
  fertilisers?: Fertilisers;
  procAnimation?: JSX.Element;
  touchCount: number;
  showTimers: boolean;
}

const FertilePlotComponent: React.FC<Props> = ({
  cropName,
  plantedAt,
  fertilisers,
  procAnimation,
  touchCount,
  showTimers,
}) => {
  const [showTimerPopover, setShowTimerPopover] = useState(false);

  const harvestSeconds = cropName ? CROPS()[cropName].harvestSeconds : 0;
  const timeLeft = plantedAt ? getTimeLeft(plantedAt, harvestSeconds) : 0;
  const isGrowing = timeLeft > 0;

  useUiRefresher({ active: isGrowing });

  const growPercentage = 100 - (timeLeft / harvestSeconds) * 100;
  const stage: GrowthStage | undefined = !cropName
    ? undefined
    : growPercentage >= 100
    ? "ready"
    : growPercentage >= 50
    ? "almost"
    : growPercentage >= 25
    ? "halfway"
    : "seedling";

  const handleMouseEnter = () => {
    // show details if field is growing
    if (isGrowing) {
      // set state to show details
      setShowTimerPopover(true);
    }
  };

  const handleMouseLeave = () => {
    // set state to hide details
    setShowTimerPopover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative"
    >
      <div
        className={classNames("w-full h-full relative", {
          "cursor-pointer hover:img-highlight": !stage || stage === "ready",
        })}
      >
        {/* Crop base image */}
        <div
          className="relative pointer-events-none"
          style={{
            width: `${PIXEL_SCALE * 16}px`,
          }}
        >
          <Soil cropName={cropName} stage={stage} />
        </div>
      </div>

      {/* Fertilisers */}
      {!!fertilisers && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * -6}px`,
            left: `${PIXEL_SCALE * 9}px`,
            width: `${PIXEL_SCALE * 10}px`,
          }}
        >
          {fertilisers.map(({ name }) => (
            <img
              key={name}
              src={ITEM_DETAILS[name].image}
              style={{
                width: `${PIXEL_SCALE * 10}px`,
                marginBottom: `${PIXEL_SCALE * 1}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Time popover */}
      {!!cropName && isGrowing && (
        <TimerPopover
          image={ITEM_DETAILS[cropName].image}
          name={cropName}
          showPopover={showTimerPopover}
          timeLeft={timeLeft}
        />
      )}

      {/* Health bar for collecting rewards */}
      {!!touchCount && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * 9}px`,
            width: `${PIXEL_SCALE * 15}px`,
          }}
        >
          <Bar percentage={100 - touchCount * 50} type="health" />
        </div>
      )}

      {/* Progres bar for growing crops */}
      {showTimers && timeLeft > 0 && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * 9}px`,
            width: `${PIXEL_SCALE * 15}px`,
          }}
        >
          <ProgressBar
            percentage={growPercentage}
            seconds={timeLeft}
            type="progress"
            formatLength="short"
          />
        </div>
      )}

      {/* Firework animation */}
      {procAnimation}
    </div>
  );
};

export const FertilePlot = React.memo(FertilePlotComponent);
