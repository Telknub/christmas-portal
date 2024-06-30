import React from "react";

import shrub from "public/assets/decorations/shrub.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const Shrub: React.FC = () => {
  return (
    <>
      <img
        src={shrub}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute"
        alt="Shrub"
      />
    </>
  );
};
