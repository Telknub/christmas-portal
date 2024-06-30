import React from "react";

import mysteriousParsnip from "public/assets/sfts/mysterious_parsnip.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const MysteriousParsnip: React.FC = () => {
  return (
    <img
      src={mysteriousParsnip}
      style={{
        width: `${PIXEL_SCALE * 16}px`,
        bottom: `${PIXEL_SCALE * 0}px`,
      }}
      className="absolute"
      alt="Mysterious Parsnip"
    />
  );
};
