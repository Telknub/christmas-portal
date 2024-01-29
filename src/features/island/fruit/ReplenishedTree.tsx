import React, { useContext } from "react";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { FRUIT, FruitName } from "features/game/types/fruits";
import { FRUIT_LIFECYCLE } from "./fruits";

import { Context } from "features/game/GameProvider";

interface Props {
  fruitName: FruitName;
}

export const ReplenishedTree: React.FC<Props> = ({ fruitName }) => {
  const lifecycle = FRUIT_LIFECYCLE[fruitName];

  const { isBush } = FRUIT()[fruitName];
  const isBanana = fruitName === "Banana";

  const bottom = isBanana ? 8 : 5;
  const left = isBanana ? 1.2 : isBush ? 4 : 3;
  const width = isBanana ? 31 : isBush ? 24 : 26;

  const { gameService } = useContext(Context);

  return (
    <div className="absolute w-full h-full cursor-pointer hover:img-highlight">
      <img
        src={lifecycle.ready}
        className={"absolute pointer-events-none"}
        style={{
          bottom: `${PIXEL_SCALE * bottom}px`,
          left: `${PIXEL_SCALE * left}px`,
          width: `${PIXEL_SCALE * width}px`,
        }}
      />
    </div>
  );
};
