import React from "react";

import bear from "public/assets/sfts/bears/bear_trap.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const BearTrap: React.FC = () => {
  return (
    <>
      <img
        src={bear}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute"
        alt="Bear Trap"
      />
    </>
  );
};
