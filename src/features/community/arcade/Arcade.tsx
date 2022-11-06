import React from "react";

import { ArcadeModal } from "features/community/arcade/ArcadeModal";

import { GRID_WIDTH_PX } from "features/game/lib/constants";
import arcade from "assets/community/arcade/arcade_machine.png";

export const Arcade: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="relative"
      style={{
        width: `${GRID_WIDTH_PX * 3}px`,
        height: `${GRID_WIDTH_PX * 3}px`,
        left: `${GRID_WIDTH_PX * 24}px`,
        top: `${GRID_WIDTH_PX * 28.5}px`,
      }}
    >
      <div className="cursor-pointer hover:img-highlight relative">
        <img
          id="arcade"
          src={arcade}
          className="relative hover:cursor-pointer hover:img-highlight"
          style={{
            width: `${GRID_WIDTH_PX * 1}px`,
          }}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <ArcadeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
