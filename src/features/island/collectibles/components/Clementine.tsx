import React from "react";

import image from "public/assets/decorations/clementine.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const Clementine: React.FC = () => {
  return (
    <>
      <img
        src={image}
        style={{
          width: `${PIXEL_SCALE * 9}px`,
          bottom: `${PIXEL_SCALE * 3}px`,
          left: `${PIXEL_SCALE * 3.5}px`,
        }}
        className="absolute"
        alt="Clementine"
      />
    </>
  );
};
