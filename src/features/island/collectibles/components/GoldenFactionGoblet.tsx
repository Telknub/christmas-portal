import React from "react";

import { PIXEL_SCALE } from "features/game/lib/constants";
import image from "public/assets/factions/golden_faction_goblet.webp";

export const GoldenFactionGoblet: React.FC = () => {
  return (
    <img
      src={image}
      style={{
        width: `${PIXEL_SCALE * 16}px`,
        bottom: `${PIXEL_SCALE * 0}px`,
      }}
      className="absolute left-1/2 transform -translate-x-1/2"
      alt="Golden Faction Goblet"
    />
  );
};
