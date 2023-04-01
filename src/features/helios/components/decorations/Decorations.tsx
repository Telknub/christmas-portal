import React from "react";

import { PIXEL_SCALE } from "features/game/lib/constants";

import building from "assets/buildings/decorations.png";
import retroGirl from "assets/npcs/retro_girl.gif";
import shadow from "assets/npcs/shadow.png";

import { Modal } from "react-bootstrap";
import { DecorationShopItems } from "./component/DecorationShopItems";
import { MapPlacement } from "features/game/expansion/components/MapPlacement";

export const Decorations: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <MapPlacement x={-6} y={-5} height={3} width={5}>
        <div
          className="relative w-full h-full cursor-pointer hover:img-highlight"
          onClick={handleClick}
        >
          <img
            src={shadow}
            className="absolute"
            style={{
              width: `${PIXEL_SCALE * 15}px`,
              left: `${PIXEL_SCALE * 2}px`,
              bottom: `${PIXEL_SCALE * 4}px`,
            }}
          />
          <img
            src={retroGirl}
            className="absolute"
            style={{
              width: `${PIXEL_SCALE * 14}px`,
              left: `${PIXEL_SCALE * 2}px`,
              bottom: `${PIXEL_SCALE * 6}px`,
            }}
          />
          <img
            src={building}
            className="absolute"
            style={{
              width: `${PIXEL_SCALE * 50}px`,
              right: `${PIXEL_SCALE * 8}px`,
              bottom: `${PIXEL_SCALE * 6}px`,
            }}
          />
        </div>
      </MapPlacement>
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <DecorationShopItems onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};
