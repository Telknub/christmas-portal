import React from "react";

import { PIXEL_SCALE } from "features/game/lib/constants";
import goblet from "public/assets/sfts/goblet.webp";

export const Goblet: React.FC = () => {
  return (
    <img
      src={goblet}
      style={{
        width: `${PIXEL_SCALE * 16}px`,
        bottom: `${PIXEL_SCALE * 0}px`,
      }}
      className="absolute left-1/2 transform -translate-x-1/2"
      alt="Goblet"
    />
  );
};
