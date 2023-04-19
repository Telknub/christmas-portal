import React, { useContext, useState } from "react";
import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import * as AuthProvider from "features/auth/lib/Provider";
import { Context } from "features/game/GameProvider";
import { Settings } from "./components/Settings";
import { Inventory } from "./components/inventory/Inventory";
import { BumpkinProfile } from "./components/BumpkinProfile";
import { Save } from "./components/Save";
import { LandId } from "./components/LandId";
import { BlockBucks } from "./components/BlockBucks";
import Decimal from "decimal.js-light";
import { DepositArgs } from "lib/blockchain/Deposit";
import Modal from "react-bootstrap/esm/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Deposit } from "features/goblins/bank/components/Deposit";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { SUNNYSIDE } from "assets/sunnyside";
import { placeEvent } from "features/game/expansion/placeable/landscapingMachine";

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

  const autosaving = gameState.matches("autosaving");

  const handleClose = () => {
    setShowDepositModal(false);
  };

  const handleDeposit = (
    args: Pick<DepositArgs, "sfl" | "itemIds" | "itemAmounts">
  ) => {
    gameService.send("DEPOSIT", args);
  };

  const landId = gameState.context.state.id;

  const user = authService.state.context.user;
  const isFullUser = user.type === "FULL";
  const farmAddress = isFullUser ? user.farmAddress : undefined;

  return (
    <div
      data-html2canvas-ignore="true"
      aria-label="Hud"
      className="absolute z-40"
    >
      <div>
        <div
          onClick={() => gameService.send("LANDSCAPE")}
          className="fixed flex z-50 cursor-pointer hover:img-highlight"
          style={{
            marginLeft: `${PIXEL_SCALE * 2}px`,
            marginBottom: `${PIXEL_SCALE * 25}px`,
            width: `${PIXEL_SCALE * 22}px`,
            right: `${PIXEL_SCALE * 3}px`,
            top: `${PIXEL_SCALE * 38}px`,
          }}
        >
          <img
            src={SUNNYSIDE.ui.round_button}
            className="absolute"
            style={{
              width: `${PIXEL_SCALE * 22}px`,
            }}
          />
          <img
            src={SUNNYSIDE.icons.hammer}
            className="absolute"
            style={{
              top: `${PIXEL_SCALE * 5}px`,
              left: `${PIXEL_SCALE * 5}px`,
              width: `${PIXEL_SCALE * 12}px`,
            }}
          />
        </div>
        <Inventory
          state={gameState.context.state}
          isFullUser={isFullUser}
          shortcutItem={shortcutItem}
          selectedItem={selectedItem}
          onPlace={(selected) => {
            gameService.send("LANDSCAPE", {
              action: placeEvent(selected),
              placeable: selected,
              multiple: true,
            });
          }}
          onDepositClick={() => setShowDepositModal(true)}
          isSaving={autosaving}
          isFarming={isFarming}
        />
      </div>

      <Balance
        onBalanceClick={
          farmAddress ? () => setShowDepositModal(true) : undefined
        }
        balance={gameState.context.state.balance}
      />
      <BlockBucks
        blockBucks={
          gameState.context.state.inventory["Block Buck"] ?? new Decimal(0)
        }
        isFullUser={isFullUser}
      />
      {landId && <LandId landId={landId} />}
      <Save />
      <BumpkinProfile isFullUser={isFullUser} />
      <Settings isFarming={isFarming} />

      {farmAddress && (
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
      )}
    </div>
  );
};

export const Hud = React.memo(HudComponent);
