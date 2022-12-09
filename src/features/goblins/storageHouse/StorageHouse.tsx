import React from "react";

import resources from "assets/buildings/resources.png";
import token from "assets/resources/wood.png";
import goblin from "assets/npcs/goblin.gif";

import { Action } from "components/ui/Action";
import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { Modal } from "react-bootstrap";
import { StorageModal } from "./components/StorageModal";

export const StorageHouse: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openStorageHouse = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="z-10 absolute"
        style={{
          width: `${GRID_WIDTH_PX * 5}px`,
          right: `${GRID_WIDTH_PX * 18.5}px`,
          top: `${GRID_WIDTH_PX * 14}px`,
        }}
      >
        <div className="cursor-pointer hover:img-highlight">
          <img
            src={goblin}
            style={{
              width: `${GRID_WIDTH_PX * 1}px`,
              right: `${GRID_WIDTH_PX * 1.95}px`,
              top: `${GRID_WIDTH_PX * 2.2}px`,
            }}
            className="absolute"
          />

          <img
            src={resources}
            alt="storage-house"
            onClick={openStorageHouse}
            className="w-full"
          />
          <Action
            className="absolute bottom-7 left-12"
            text="Storage"
            icon={token}
            onClick={openStorageHouse}
          />
        </div>
      </div>
      <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
        <StorageModal onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};
