import React, { useState } from "react";
import { PIXEL_SCALE } from "features/game/lib/constants";
import boat from "assets/npcs/island_boat_pirate.png";
import { MapPlacement } from "features/game/expansion/components/MapPlacement";
import { Bumpkin, Inventory } from "features/game/types/game";
import { IslandTravelModal } from "./IslandTravelModal";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

interface IslandTravelProps {
  bumpkin: Bumpkin | undefined;
  inventory?: Inventory;
  isVisiting?: boolean;
  travelAllowed: boolean;
  onTravelDialogOpened?: () => void;
  x: number;
  y: number;
}

export const IslandTravel: React.FC<IslandTravelProps> = ({
  bumpkin,
  inventory,
  x,
  y,
  isVisiting = false,
  travelAllowed,
  onTravelDialogOpened,
}) => {
  const [openIslandList, setOpenIslandList] = useState(false);
  const location = useLocation();

  return (
    <>
      <MapPlacement x={x} y={y}>
        <div
          style={{
            width: `${68 * PIXEL_SCALE}px`,
          }}
        >
          <img
            src={boat}
            onClick={() => setOpenIslandList(true)}
            className={classNames(
              "relative cursor-pointer hover:img-highlight"
            )}
            style={{
              width: `${68 * PIXEL_SCALE}px`,
            }}
          />
        </div>
      </MapPlacement>

      <IslandTravelModal
        isOpen={openIslandList}
        bumpkin={bumpkin}
        inventory={inventory ?? {}}
        onShow={onTravelDialogOpened}
        isVisiting={isVisiting}
        travelAllowed={travelAllowed}
        onClose={() => setOpenIslandList(false)}
      />
    </>
  );
};
