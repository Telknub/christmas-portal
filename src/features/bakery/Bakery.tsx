import React from "react";
import { Modal } from "react-bootstrap";

import blacksmith from "assets/buildings/blacksmith.png";
import hammer from "assets/icons/hammer.png";

import { Crafting } from "./components/Crafting";
import { Action } from "components/ui/Action";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

export const Bakery: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className="z-10 absolute"
      // TODO some sort of coordinate system
      style={{
        width: `${GRID_WIDTH_PX * 3}px`,
        height: `${GRID_WIDTH_PX * 2.5}px`,
        left: `calc(50% - ${GRID_WIDTH_PX * 1}px)`,
        top: `calc(50% - ${GRID_WIDTH_PX * 11.3}px)`,
      }}
    >
      <img
        src={blacksmith}
        alt="market"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:img-highlight"
        style={{
          width: "100px",
        }}
      />
      <Action
        className="absolute -bottom-8 left-0"
        text="Bake"
        icon={hammer}
        onClick={() => setIsOpen(true)}
      />
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Crafting onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};
