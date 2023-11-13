import React, { useContext } from "react";

import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";

import { Inventory } from "./components/inventory/Inventory";
import { InnerPanel } from "components/ui/Panel";
import { BumpkinProfile } from "./components/BumpkinProfile";
import { InventoryItemName } from "features/game/types/game";
import { Settings } from "./components/Settings";
import { createPortal } from "react-dom";
import { TravelButton } from "./components/deliveries/TravelButton";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { BlockBucks } from "./components/BlockBucks";
import Decimal from "decimal.js-light";

/**
 * Heads up display - a concept used in games for the small overlaid display of information.
 * Balances, Inventory, actions etc.
 */
export const VisitingHud: React.FC = () => {
  const { gameService, shortcutItem, selectedItem } = useContext(Context);
  const [gameState] = useActor(gameService);

  return createPortal(
    <div
      data-html2canvas-ignore="true"
      aria-label="Hud"
      className="absolute z-40"
    >
      {!gameState.matches("landToVisitNotFound") && (
        <InnerPanel className="fixed px-2 pt-1 pb-2 bottom-2 left-1/2 -translate-x-1/2 z-50">
          <span className="text-white">{`Visiting #${gameState.context.farmId}`}</span>
        </InnerPanel>
      )}
      <Balance balance={gameState.context.state.balance} />
      <BlockBucks
        blockBucks={
          gameState.context.state.inventory["Block Buck"] ?? new Decimal(0)
        }
        isVisiting={true}
      />
      <Inventory
        state={gameState.context.state}
        shortcutItem={shortcutItem}
        selectedItem={selectedItem as InventoryItemName}
        isFarming={false}
        isFullUser={false}
      />
      <BumpkinProfile isFullUser={false} />
      <div
        className="fixed z-50"
        style={{
          right: `${PIXEL_SCALE * 3}px`,
          bottom: `${PIXEL_SCALE * 3}px`,
          width: `${PIXEL_SCALE * 22}px`,
          height: `${PIXEL_SCALE * 23}px`,
        }}
      >
        <Settings isFarming={false} />
      </div>
      <div
        className="fixed z-50"
        style={{
          left: `${PIXEL_SCALE * 3}px`,
          bottom: `${PIXEL_SCALE * 3}px`,
          width: `${PIXEL_SCALE * 22}px`,
          height: `${PIXEL_SCALE * 23}px`,
        }}
      >
        <TravelButton isVisiting={true} />
      </div>
    </div>,
    document.body
  );
};
