import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import { getKeys } from "features/game/types/craftables";
import chefHat from "src/assets/icons/chef_hat.png";

import { Recipes } from "../../ui/Recipes";
import {
  Cookable,
  CookableName,
  COOKABLES,
} from "features/game/types/consumables";
import { MachineInterpreter } from "features/island/buildings/lib/craftingMachine";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCook: (name: CookableName) => void;
  crafting: boolean;
  itemInProgress?: CookableName;
  craftingService?: MachineInterpreter;
}
export const KitchenModal: React.FC<Props> = ({
  isOpen,
  onCook,
  onClose,
  crafting,
  itemInProgress,
  craftingService,
}) => {
  const kitchenRecipes = getKeys(COOKABLES).reduce((acc, name) => {
    if (COOKABLES[name]?.disabled) {
      return acc;
    }

    if (COOKABLES[name].building !== "Kitchen") {
      return acc;
    }

    return [...acc, COOKABLES[name]];
  }, [] as Cookable[]);
  const [selected, setSelected] = useState<Cookable>(
    kitchenRecipes.find((recipe) => recipe.name === itemInProgress) ||
      kitchenRecipes[0]
  );

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <CloseButtonPanel
        bumpkinParts={{
          body: "Light Brown Farmer Potion",
          hair: "Explorer Hair",
          pants: "Lumberjack Overalls",
          shirt: "Blue Farmer Shirt",
          tool: "Axe",
          background: "Farm Background",
          shoes: "Black Farmer Boots",
        }}
        tabs={[{ icon: chefHat, name: "Kitchen" }]}
        onClose={onClose}
      >
        <Recipes
          selected={selected}
          setSelected={setSelected}
          recipes={kitchenRecipes}
          onCook={onCook}
          onClose={onClose}
          crafting={crafting}
          craftingService={craftingService}
        />
      </CloseButtonPanel>
    </Modal>
  );
};
