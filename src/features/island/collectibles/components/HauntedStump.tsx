import React from "react";

import hauntedStump from "assets/decorations/haunted_stump.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const HauntedStump: React.FC = () => {
  return (
    <>
      <img
        src={hauntedStump}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute left-1/2 -translate-x-1/2"
        alt="Candles"
      />
    </>
  );
};
