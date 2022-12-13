import React, { useContext } from "react";

import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";

import { Settings } from "./components/Settings";
import { Buildings } from "../buildings/Buildings";
import { Inventory } from "./components/inventory/Inventory";
import { PlaceableController } from "features/farming/hud/components/PlaceableController";
import { BumpkinProfile } from "./components/BumpkinProfile";
import { Save } from "./components/Save";
import { LandId } from "./components/LandId";
import { InventoryItemName } from "features/game/types/game";

/**
 * Heads up display - a concept used in games for the small overlayed display of information.
 * Balances, Inventory, actions etc.
 */
export const Hud: React.FC = () => {
  const { gameService, shortcutItem, selectedItem } = useContext(Context);
  const [gameState] = useActor(gameService);

  const isEditing = gameState.matches("editing");
  const landId = gameState.context.state.id;

  return (
    <div data-html2canvas-ignore="true" aria-label="Hud">
      <Settings />
      {isEditing ? (
        <PlaceableController />
      ) : (
        <>
          <Balance balance={gameState.context.state.balance} />
          <Inventory
            state={gameState.context.state}
            shortcutItem={shortcutItem}
            selectedItem={selectedItem as InventoryItemName}
            onPlace={(selected) => {
              gameService.send("EDIT", {
                placeable: selected,
                action: "collectible.placed",
              });
            }}
            isFarming
          />
          {landId && <LandId landId={landId} />}
          <Buildings />
          <Save />
          <BumpkinProfile />
        </>
      )}
      {/* <AudioPlayer isFarming /> */}
    </div>
  );
};
