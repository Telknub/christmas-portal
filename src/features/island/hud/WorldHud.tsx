import React, { useContext, useState } from "react";
import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { Inventory } from "./components/inventory/Inventory";
import { BumpkinProfile } from "./components/BumpkinProfile";
import { BlockBucks } from "./components/BlockBucks";
import Decimal from "decimal.js-light";
import { DepositArgs } from "lib/blockchain/Deposit";
import { Modal } from "components/ui/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Deposit } from "features/goblins/bank/components/Deposit";
import { placeEvent } from "features/game/expansion/placeable/landscapingMachine";
import { Save } from "./components/Save";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { Settings } from "./components/Settings";
import { Leaderboard } from "features/game/expansion/components/leaderboard/Leaderboard";
import { TravelButton } from "./components/deliveries/TravelButton";
import { AuctionCountdown } from "features/retreat/components/auctioneer/AuctionCountdown";
import { CodexButton } from "./components/codex/CodexButton";
import { HudContainer } from "components/ui/HudContainer";

/**
 * Heads up display - a concept used in games for the small overlaid display of information.
 * Balances, Inventory, actions etc.
 */
const HudComponent: React.FC = () => {
  const { gameService, shortcutItem, selectedItem } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositDataLoaded, setDepositDataLoaded] = useState(false);

  const farmId = Number(gameState.context.farmId);

  const autosaving = gameState.matches("autosaving");

  const handleClose = () => {
    setShowDepositModal(false);
  };

  const handleDeposit = (
    args: Pick<DepositArgs, "sfl" | "itemIds" | "itemAmounts">
  ) => {
    gameService.send("DEPOSIT", args);
  };

  const farmAddress = gameService.state?.context?.farmAddress;
  const isFullUser = farmAddress !== undefined;

  return (
    <HudContainer>
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
        isFarming={false}
      />

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
      />
      <div
        className="absolute z-50 flex flex-col justify-between"
        style={{
          left: `${PIXEL_SCALE * 3}px`,
          bottom: `${PIXEL_SCALE * 3}px`,
          width: `${PIXEL_SCALE * 22}px`,
          height: `${PIXEL_SCALE * 23 * 3 + 12}px`,
        }}
      >
        <Leaderboard farmId={farmId} />
        <CodexButton />
        <TravelButton />
      </div>
      <div
        className="absolute z-50 flex flex-col justify-between"
        style={{
          bottom: `${PIXEL_SCALE * 3}px`,
          left: `${PIXEL_SCALE * 28}px`,
        }}
      >
        <AuctionCountdown />
      </div>

      <BumpkinProfile isFullUser={isFullUser} />

      <div
        className="absolute z-50 flex flex-col justify-between"
        style={{
          right: `${PIXEL_SCALE * 3}px`,
          bottom: `${PIXEL_SCALE * 3}px`,
          width: `${PIXEL_SCALE * 22}px`,
          height: `${PIXEL_SCALE * 23 * 2 + 8}px`,
        }}
      >
        <Save />
        <Settings isFarming={false} />
      </div>

      {farmAddress && (
        <Modal show={showDepositModal} onHide={handleClose}>
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
    </HudContainer>
  );
};

export const WorldHud = React.memo(HudComponent);
