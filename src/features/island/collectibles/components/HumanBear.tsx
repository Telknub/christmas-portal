import React from "react";

import humanBear from "public/assets/sfts/bears/human_bear.webp";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const HumanBear: React.FC = () => {
  return (
    <>
      <img
        src={humanBear}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute"
        alt="Human Bear"
      />
    </>
  );
};
