import React, { useContext, useState } from "react";
import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import * as AuthProvider from "features/auth/lib/Provider";
import { Context } from "features/game/GameProvider";
import { Settings } from "./components/Settings";
import { Inventory } from "./components/inventory/Inventory";
import { PlaceableController } from "features/farming/hud/components/PlaceableController";
import { BumpkinProfile } from "./components/BumpkinProfile";
import { Save } from "./components/Save";
import { LandId } from "./components/LandId";
import { InventoryItemName } from "features/game/types/game";
import { BlockBucks } from "./components/BlockBucks";
import Decimal from "decimal.js-light";
import { DepositArgs } from "lib/blockchain/Deposit";
import Modal from "react-bootstrap/esm/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Deposit } from "features/goblins/bank/components/Deposit";

/**
 * Heads up display - a concept used in games for the small overlaid display of information.
 * Balances, Inventory, actions etc.
 */
const HudComponent: React.FC<{ isFarming: boolean }> = ({ isFarming }) => {
  const { authService } = useContext(AuthProvider.Context);
  const { gameService, shortcutItem, selectedItem } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositDataLoaded, setDepositDataLoaded] = useState(false);

  const handleClose = () => {
    setShowDepositModal(false);
  };

  const handleDeposit = (
    args: Pick<DepositArgs, "sfl" | "itemIds" | "itemAmounts">
  ) => {
    gameService.send("DEPOSIT", args);
  };

  const isEditing = gameState.matches("editing");
  const landId = gameState.context.state.id;
  const farmAddress = authService.state.context.address as string;

  return (
    <div
      data-html2canvas-ignore="true"
      aria-label="Hud"
      className="absolute z-40"
    >
      <div hidden={isEditing}>
        <Inventory
          state={gameState.context.state}
          shortcutItem={shortcutItem}
          selectedItem={selectedItem as InventoryItemName}
          onPlace={(selected) => {
            if (selected === "Tree") {
              gameService.send("EDIT", {
                action: "tree.placed",
                placeable: selected,
              });
            } else if (selected === "Crop Plot") {
              gameService.send("EDIT", {
                action: "plot.placed",
                placeable: selected,
              });
            } else if (selected === "Stone Rock") {
              gameService.send("EDIT", {
                action: "stone.placed",
                placeable: selected,
              });
            } else if (selected === "Iron Rock") {
              gameService.send("EDIT", {
                action: "iron.placed",
                placeable: selected,
              });
            } else if (selected === "Gold Rock") {
              gameService.send("EDIT", {
                action: "gold.placed",
                placeable: selected,
              });
            } else if (selected === "Fruit Patch") {
              gameService.send("EDIT", {
                action: "fruitPatch.placed",
                placeable: selected,
              });
            } else {
              gameService.send("EDIT", {
                placeable: selected,
                action: "collectible.placed",
              });
            }
          }}
          onDepositClick={() => setShowDepositModal(true)}
          isSaving={gameState.matches("autosaving")}
          isFarming={isFarming}
        />
      </div>
      {isEditing ? (
        <PlaceableController />
      ) : (
        <>
          <Balance
            farmAddress={gameState.context.state.farmAddress as string}
            onBalanceClick={() => setShowDepositModal(true)}
            balance={gameState.context.state.balance}
          />
          <BlockBucks
            blockBucks={
              gameState.context.state.inventory["Block Buck"] ?? new Decimal(0)
            }
          />
          {landId && <LandId landId={landId} />}
          <Save />
          <BumpkinProfile />
          <Settings isFarming={isFarming} />
        </>
      )}
      <Modal show={showDepositModal} centered>
        <CloseButtonPanel
          title={depositDataLoaded ? "Deposit" : undefined}
          onClose={depositDataLoaded ? handleClose : undefined}
        >
          <Deposit
            farmAddress={farmAddress}
            onDeposit={handleDeposit}
            onLoaded={(loaded) => setDepositDataLoaded(loaded)}
            onClose={handleClose}
          />
        </CloseButtonPanel>
      </Modal>
    </div>
  );
};

export const Hud = React.memo(HudComponent);
