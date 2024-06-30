import React from "react";

import blackBear from "public/assets/sfts/black_bear.gif";
import shadow from "public/assets/npcs/shadow16px.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const BlackBearry: React.FC = () => {
  return (
    <>
      <img
        src={shadow}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute pointer-events-none"
      />
      <img
        src={blackBear}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 2}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute pointer-events-none"
        alt="Black Bearry"
      />
    </>
  );
};
