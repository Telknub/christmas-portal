import React, { useContext, useEffect, useRef, useState } from "react";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { MachineInterpreter } from "./editingMachine";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

import Draggable from "react-draggable";
import { detectCollision } from "./lib/collisionDetection";
import classNames from "classnames";
import { Coordinates } from "../components/MapPlacement";
import {
  BUILDINGS_DIMENSIONS,
  PlaceableName,
} from "features/game/types/buildings";
import { ITEM_DETAILS } from "features/game/types/images";
import {
  ANIMAL_DIMENSIONS,
  COLLECTIBLES_DIMENSIONS,
} from "features/game/types/craftables";
import { BUILDING_COMPONENTS } from "features/island/buildings/components/building/Building";
import { COLLECTIBLE_COMPONENTS } from "features/island/collectibles/Collectible";
import { Chicken } from "features/island/chickens/Chicken";

type Dimensions = {
  height: number;
  width: number;
};

const PLACEABLES: Record<PlaceableName, React.FC<any>> = {
  Chicken: () => <Chicken index={0} />,
  // TODO - others
  ...BUILDING_COMPONENTS,
  ...COLLECTIBLE_COMPONENTS,
};

const DEFAULT_POSITION_X = 0;
const DEFAULT_POSITION_Y = 0;

// TODO - get dynamic bounds for placeable
// const BOUNDS_MIN_X = -15
// const BOUNDS_MAX_X = 5
// const BOUNDS_MIN_Y = -5
// const BOUNDS_MAX_Y = 15

export const Placeable: React.FC = () => {
  const nodeRef = useRef(null);
  const { gameService } = useContext(Context);
  const [imageDimensions, setImageDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    detect({ x: DEFAULT_POSITION_X, y: -DEFAULT_POSITION_Y });
  }, []);

  const child = gameService.state.children.editing as MachineInterpreter;

  const [machine, send] = useActor(child);

  const { placeable, coordinates } = machine.context;
  const { width, height } = {
    ...BUILDINGS_DIMENSIONS,
    ...COLLECTIBLES_DIMENSIONS,
    ...ANIMAL_DIMENSIONS,
  }[placeable];
  const { image } = ITEM_DETAILS[placeable];

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const { naturalHeight, naturalWidth } = e.currentTarget;

    setImageDimensions({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const detect = ({ x, y }: Coordinates) => {
    const collisionDetected = detectCollision(gameService.state.context.state, {
      x,
      y,
      width,
      height,
    });

    send({ type: "UPDATE", coordinates: { x, y }, collisionDetected });
  };

  // TODO - figure out new effect that can be applied on non-images

  // if (machine.matches("placed")) {
  //   return (
  //     <div className="absolute left-1/2 top-1/2">
  //       <div
  //         className="absolute"
  //         style={{
  //           left: coordinates.x * GRID_WIDTH_PX,
  //           top: -coordinates.y * GRID_WIDTH_PX,
  //           height: imageDimensions.height * PIXEL_SCALE,
  //           width: imageDimensions.width * PIXEL_SCALE,
  //         }}
  //       >
  //         <div className="bulge h-full w-full">{PLACEABLES[placeable]({})}</div>
  //         {/* <img
  //           draggable="false"
  //           className="bulge h-full w-full"
  //           src={image}
  //           alt=""
  //           onLoad={handleImageLoad}
  //         /> */}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="absolute left-1/2 top-1/2" style={{ zIndex: 100 }}>
      <Draggable
        // bounds={{ // TODO - apply bounds
        //   left: BOUNDS_MIN_X * GRID_WIDTH_PX,
        //   right: BOUNDS_MAX_X * GRID_WIDTH_PX,
        //   top: BOUNDS_MIN_Y * GRID_WIDTH_PX,
        //   bottom: BOUNDS_MAX_Y * GRID_WIDTH_PX
        // }}
        defaultPosition={{
          x: DEFAULT_POSITION_X * GRID_WIDTH_PX,
          y: DEFAULT_POSITION_Y * GRID_WIDTH_PX,
        }}
        nodeRef={nodeRef}
        grid={[GRID_WIDTH_PX, GRID_WIDTH_PX]}
        onStart={() => {
          send("DRAG");
        }}
        onDrag={(_, data) => {
          const x = Math.round(data.x / GRID_WIDTH_PX);
          const y = Math.round(-data.y / GRID_WIDTH_PX);

          detect({ x, y });
        }}
        onStop={(_, data) => {
          const x = Math.round(data.x / GRID_WIDTH_PX);
          const y = Math.round(-data.y / GRID_WIDTH_PX);

          detect({ x, y });

          send("DROP");
        }}
      >
        <div
          ref={nodeRef}
          data-prevent-drag-scroll
          className={classNames("flex flex-col items-center", {
            "cursor-grab": !machine.matches("dragging"),
            "cursor-grabbing": machine.matches("dragging"),
          })}
          style={{ pointerEvents: "auto" }}
        >
          <div
            draggable={false}
            className=" w-full h-full relative img-highlight pointer-events-none"
            style={{
              width: `${width * GRID_WIDTH_PX}px`,
              height: `${height * GRID_WIDTH_PX}px`,
            }}
          >
            {PLACEABLES[placeable]({})}
          </div>
        </div>
      </Draggable>
    </div>
  );
};
