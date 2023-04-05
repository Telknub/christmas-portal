import React, { useContext } from "react";

import { MapPlacement } from "features/game/expansion/components/MapPlacement";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { EasterHunt } from "features/game/types/game";
import { ITEM_DETAILS } from "features/game/types/images";
import { Context } from "features/game/GameProvider";

export const EasterEgg: React.FC<EasterHunt> = ({ eggs, generatedAt }) => {
  const { gameService } = useContext(Context);

  // 12hrs in milliseconds = 12 * 60 * 60 * 1000
  const eggsGeneratedInTheLast12Hours =
    Date.now() - 12 * 60 * 60 * 1000 < generatedAt;

  return (
    <>
      {eggs &&
        eggs.map((egg, index) =>
          !egg.collectedAt && eggsGeneratedInTheLast12Hours ? (
            <MapPlacement x={egg.x} y={egg.y} key={index}>
              <div className="relative cursor-pointer hover:img-highlight z-50">
                <img
                  style={{
                    width: `${PIXEL_SCALE * 8}px`,
                  }}
                  src={ITEM_DETAILS[egg.name].image}
                  alt={egg.name}
                  onClick={() =>
                    gameService.send("easterEgg.collected", {
                      egg: {
                        x: egg.x,
                        y: egg.y,
                        name: egg.name,
                        island: egg.island,
                      },
                    })
                  }
                />
              </div>
            </MapPlacement>
          ) : null
        )}
    </>
  );
};
