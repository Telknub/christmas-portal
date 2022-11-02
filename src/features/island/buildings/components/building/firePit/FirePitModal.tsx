import React from "react";

import { Panel } from "components/ui/Panel";
import { Modal } from "react-bootstrap";
import { getKeys } from "features/game/types/craftables";

import { Recipes } from "../../ui/Recipes";
import {
  Consumable,
  ConsumableName,
  CONSUMABLES,
} from "features/game/types/consumables";
import { DynamicNFT } from "features/bumpkins/components/DynamicNFT";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCook: (name: ConsumableName) => void;
}
export const FirePitModal: React.FC<Props> = ({ isOpen, onCook, onClose }) => {
  const firePitRecipes = getKeys(CONSUMABLES).reduce((acc, name) => {
    if (CONSUMABLES[name].building !== "Fire Pit") {
      return acc;
    }

    return [...acc, CONSUMABLES[name]];
  }, [] as Consumable[]);

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <div className="absolute w-1/2 -left-2 top-[-150px] -z-10">
        <DynamicNFT
          bumpkinParts={{
            body: "Beige Farmer Potion",
            hair: "Buzz Cut",
            pants: "Farmer Pants",
            shirt: "Yellow Farmer Shirt",
            coat: "Chef Apron",
            tool: "Farmer Pitchfork",
            background: "Farm Background",
            shoes: "Black Farmer Boots",
          }}
        />
      </div>
      <Panel>
        <Recipes recipes={firePitRecipes} onCook={onCook} onClose={onClose} />
      </Panel>
    </Modal>
  );
};
