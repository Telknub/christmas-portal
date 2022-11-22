import React from "react";

import level1 from "assets/land/levels/level_1.webp";
import level2 from "assets/land/levels/level_2.webp";
import level3 from "assets/land/levels/level_3.webp";
import level4 from "assets/land/levels/level_4.webp";
import level5 from "assets/land/levels/level_5.webp";
import level6 from "assets/land/levels/level_6.webp";
import level7 from "assets/land/levels/level_7.webp";
import level8 from "assets/land/levels/level_8.webp";
import level9 from "assets/land/levels/level_9.webp";
import level10 from "assets/land/levels/level_10.webp";
import level11 from "assets/land/levels/level_11.webp";
import level12 from "assets/land/levels/level_12.webp";
import level13 from "assets/land/levels/level_13.webp";

import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { LandExpansion } from "features/game/types/game";
import { Section } from "lib/utils/hooks/useScrollIntoView";

interface Props {
  expansions: LandExpansion[];
}

const IMAGE_GRID_WIDTH = 36;

const LEVEL_IMAGES: Record<number, string> = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
  6: level6,
  7: level7,
  8: level8,
  9: level9,
  10: level10,
  11: level11,
  12: level12,
  13: level13,
};

export const LandBase: React.FC<Props> = ({ expansions }) => {
  let expandedCount = expansions.length;

  const latestLand = expansions[expansions.length - 1];

  // Land is still being built show previous layout
  if (latestLand.readyAt > Date.now()) {
    expandedCount -= 1;
  }

  return (
    <img
      id={Section.GenesisBlock}
      src={LEVEL_IMAGES[expandedCount]}
      alt="land"
      className="h-auto"
      style={{
        width: `${IMAGE_GRID_WIDTH * GRID_WIDTH_PX}px`,
      }}
    />
  );
};
