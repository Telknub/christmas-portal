import React from "react";
import { Action } from "components/ui/Action";
import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";
import { blacksmithAudio } from "lib/utils/sfx";
import { MapPlacement } from "features/game/expansion/components/MapPlacement";
import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Inventory } from "features/game/types/game";
import { GoblinPirateItems } from "./components/GoblinPirateItems";
import { SUNNYSIDE } from "assets/sunnyside";
import { NPC } from "features/island/bumpkin/components/DynamicMiniNFT";
import { Equipped } from "features/game/types/bumpkin";

const bumpkin: Equipped = {
  body: "Goblin Potion",
  hair: "White Long Hair",
  hat: "Pirate Hat",
  shirt: "Fancy Top",
  pants: "Pirate Pants",
  tool: "Pirate Scimitar",
  background: "Seashore Background",
  shoes: "Black Farmer Boots",
};

interface Props {
  inventory: Inventory;
}

export const RetreatPirate: React.FC<Props> = ({ inventory }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPirate = () => {
    setIsOpen(true);
    //Checks if blacksmithAudio is playing, if false, plays the sound
    if (!blacksmithAudio.playing()) {
      blacksmithAudio.play();
    }
  };

  return (
    <MapPlacement x={16} y={-3} height={3} width={2}>
      <div
        className="relative w-full h-full cursor-pointer hover:img-highlight"
        onClick={openPirate}
      >
        <NPC {...bumpkin} />
        <img
          src={SUNNYSIDE.decorations.treasure_chest}
          className="absolute"
          style={{
            width: `${PIXEL_SCALE * 16}px`,
            left: `${GRID_WIDTH_PX * 1}px`,
            top: `${GRID_WIDTH_PX * 1}px`,
          }}
        />
        <div
          className="flex justify-center absolute w-full pointer-events-none"
          style={{
            bottom: `${PIXEL_SCALE * -3}px`,
          }}
        >
          <Action
            className="pointer-events-none"
            text="Pirate"
            icon={SUNNYSIDE.icons.hammer}
          />
        </div>
      </div>
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <CloseButtonPanel
          bumpkinParts={{
            body: "Goblin Potion",
            hair: "Blacksmith Hair",
            hat: "Pirate Hat",
            pants: "Pirate Pants",
            shirt: "Striped Blue Shirt",
            tool: "Pirate Scimitar",
            background: "Farm Background",
            shoes: "Black Farmer Boots",
            coat: "Pirate General Coat",
          }}
          tabs={[{ name: "Craft", icon: SUNNYSIDE.icons.hammer }]}
          onClose={() => setIsOpen(false)}
        >
          <GoblinPirateItems onClose={() => setIsOpen(false)} />
        </CloseButtonPanel>
      </Modal>
    </MapPlacement>
  );
};
