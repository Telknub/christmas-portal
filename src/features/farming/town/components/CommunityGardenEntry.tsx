import React, { useState } from "react";

import { GRID_WIDTH_PX } from "features/game/lib/constants";

import merchant from "assets/npcs/merchant.gif";
import humanSign from "assets/buildings/human_sign.png";
import arrowUp from "assets/icons/arrow_up.png";
import { CommunityGardenModal } from "./CommunityGardenModal";
import { merchantAudio } from "lib/utils/sfx";

export const CommunityGardenEntry: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openMerchant = () => {
    setShowModal(true);
    //Checks if merchantAudio is playing, if false, plays the sound
    if (!merchantAudio.playing()) {
      merchantAudio.play();
    }
  };

  return (
    <>
      <div
        className="absolute hover:img-highlight cursor-pointer"
        style={{
          right: `${GRID_WIDTH_PX * 53}px`,
          width: `${GRID_WIDTH_PX * 5}px`,
          height: `${GRID_WIDTH_PX * 4}px`,
          top: `${GRID_WIDTH_PX * 1}px`,
        }}
        onClick={openMerchant}
      >
        <img
          src={humanSign}
          className="absolute"
          style={{
            width: `${GRID_WIDTH_PX * 1.5}px`,
            right: `${GRID_WIDTH_PX * 3}px`,
            top: `${GRID_WIDTH_PX * 0.8}px`,
          }}
        />
        <img
          src={merchant}
          alt="merchant"
          className="absolute"
          style={{
            width: `${GRID_WIDTH_PX * 3}px`,
            right: `${GRID_WIDTH_PX * 0.5}px`,
            top: `${GRID_WIDTH_PX * 1.5}px`,
          }}
        />
        <img
          src={arrowUp}
          className="absolute animate-float"
          style={{
            width: `${GRID_WIDTH_PX * 0.7}px`,
            right: `${GRID_WIDTH_PX * 2}px`,
            top: `${GRID_WIDTH_PX * 0}px`,
          }}
        />
      </div>
      {showModal && (
        <CommunityGardenModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
