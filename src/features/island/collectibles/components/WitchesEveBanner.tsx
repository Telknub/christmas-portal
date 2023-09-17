import React from "react";

import banner from "assets/decorations/banners/witches_eve_banner.webp";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const WitchesEveBanner: React.FC = () => {
  return (
    <>
      <img
        src={banner}
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          bottom: `${PIXEL_SCALE * 2}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute"
        alt="Witches' Eve Banner"
      />
    </>
  );
};
