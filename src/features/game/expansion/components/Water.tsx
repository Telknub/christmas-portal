import React from "react";

import { GRID_WIDTH_PX } from "features/game/lib/constants";

import { Section } from "lib/utils/hooks/useScrollIntoView";

import dragonfly from "assets/decorations/dragonfly.gif";
import Shark from "./water/Shark";

import goblinSwimming from "assets/npcs/goblin_swimming.gif";
import goblinSnorkling from "assets/npcs/goblin_snorkling.gif";
import swimmer from "assets/npcs/swimmer.gif";

export const Water: React.FC = () => {
  return (
    // Container
    <div
      style={{
        height: "inherit",
      }}
      className="absolute inset-0"
    >
      {/* Above Land */}
      <Shark side="top" />

      {/* Below Land */}
      <Shark side="bottom" />

      {/* Navigation Center Point */}
      <div className="h-full w-full relative">
        <span
          id={Section.Water}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <img
          style={{
            width: `${GRID_WIDTH_PX * 1.185}px`,
            left: `${GRID_WIDTH_PX * 42.8}px`,
          }}
          src={dragonfly}
          className="absolute top-1/2 animate-float"
        />

        <img
          src={goblinSwimming}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 6.1}px`,
            left: `${GRID_WIDTH_PX * 36}px`,
            top: `${GRID_WIDTH_PX * 22}px`,
            zIndex: "2",
          }}
        />

        <img
          src={goblinSnorkling}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 3.81}px`,
            left: `${GRID_WIDTH_PX * 30}px`,
            top: `${GRID_WIDTH_PX * 12}px`,
          }}
        />

        <img
          src={swimmer}
          className="absolute "
          style={{
            width: `${GRID_WIDTH_PX * 1}px`,
            left: `${GRID_WIDTH_PX * 42}px`,
            top: `${GRID_WIDTH_PX * 16}px`,
            transform: "scaleX(-1)",
            zIndex: "2",
          }}
        />
      </div>
    </div>
  );
};
