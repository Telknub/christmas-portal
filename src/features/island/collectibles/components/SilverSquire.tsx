import React from "react";

import { PIXEL_SCALE } from "features/game/lib/constants";
import image from "public/assets/sfts/silver_squire.webp";

export const SilverSquire: React.FC = () => {
  return (
    <img
      src={image}
      style={{
        width: `${PIXEL_SCALE * 9}px`,
        bottom: `${PIXEL_SCALE * 2}px`,
      }}
      className="absolute left-1/2 transform -translate-x-1/2"
      alt="SilverSquire"
    />
  );
};
