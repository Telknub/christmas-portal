import React, { useContext } from "react";
import { Button } from "components/ui/Button";
import { ITEM_DETAILS } from "features/game/types/images";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import { ModalContext } from "features/game/components/modal/ModalProvider";
import stockIcon from "assets/icons/stock.webp";
import { gameAnalytics } from "lib/gameAnalytics";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { BB_TO_GEM_RATIO } from "features/game/types/game";
import { TimerDisplay } from "features/retreat/components/auctioneer/AuctionDetails";

import { Label } from "components/ui/Label";
import confetti from "canvas-confetti";
import { Box } from "components/ui/Box";
import Decimal from "decimal.js-light";
import { INITIAL_STOCK, StockableName } from "features/game/lib/constants";
import { TREASURE_TOOLS, WORKBENCH_TOOLS } from "features/game/types/tools";
import { SEEDS } from "features/game/types/seeds";
import { CROP_LIFECYCLE } from "features/island/plots/lib/plant";

interface RestockModalProps {
  onClose: () => void;
  shipmentTime?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const FullRestockModal: React.FC<RestockModalProps> = ({
  onClose,
  shipmentTime,
}) => {
  const { t } = useAppTranslation();
  const { openModal } = useContext(ModalContext);

  const { gameService, showAnimations } = useContext(Context);
  const [gameState] = useActor(gameService);

  const canRestock = gameState.context.state.inventory["Gem"]?.gte(20);

  const handleRestock = () => {
    if (!canRestock) {
      openModal("BUY_GEMS");
      return;
    }

    gameService.send("shops.restocked");

    gameAnalytics.trackSink({
      currency: "Gem",
      amount: 1 * BB_TO_GEM_RATIO,
      item: "Stock",
      type: "Fee",
    });

    if (showAnimations) confetti();
    onClose();
  };

  const getRestockAmount = (item: StockableName, amount: Decimal): Decimal => {
    const remainingStock = gameState.context.state.stock[item];

    // If there's no stock left
    if (!remainingStock) {
      // return total stock amount
      return amount;
    } else {
      // else return difference between total and remaining stock
      return amount.sub(remainingStock);
    }
  };

  const restockTools = Object.entries(INITIAL_STOCK(gameState.context.state))
    .filter((item) => item[0] in { ...WORKBENCH_TOOLS, ...TREASURE_TOOLS })
    .filter(([item, amount]) => {
      const restockAmount = getRestockAmount(item as StockableName, amount);
      return restockAmount.gt(0);
    });

  const restockSeeds = Object.entries(INITIAL_STOCK(gameState.context.state))
    .filter((item) => item[0] in SEEDS())
    .filter(([item, amount]) => {
      const restockAmount = getRestockAmount(item as StockableName, amount);
      return restockAmount.gt(0);
    });

  return (
    <>
      <div className="p-1">
        <Label type="default" className="mb-2" icon={stockIcon}>
          {t("restock")}
        </Label>
        <p className="mb-1">{t("gems.buyReplenish")}</p>
      </div>
      <div className="mt-1 h-40 overflow-y-auto overflow-x-hidden scrollable pl-1">
        <div className="mb-2 text-xs">{`The following items will be restocked:`}</div>
        {restockTools.length > 0 && (
          <Label
            icon={ITEM_DETAILS.Axe.image}
            type="default"
            className="ml-2 mb-1"
          >
            {t("tools")}
          </Label>
        )}
        <div className="flex flex-wrap mb-2">
          {restockTools.map(([item, amount]) => {
            const restockAmount = getRestockAmount(
              item as StockableName,
              amount,
            );
            return (
              <Box
                key={item}
                count={restockAmount}
                image={ITEM_DETAILS[item as StockableName].image}
              />
            );
          })}
        </div>
        {restockSeeds.length > 0 && (
          <Label
            icon={CROP_LIFECYCLE.Sunflower.seed}
            type="default"
            className="ml-2 mb-1"
          >
            {t("seeds")}
          </Label>
        )}
        <div className="flex flex-wrap mb-2">
          {restockSeeds.map(([item, amount]) => {
            const restockAmount = getRestockAmount(
              item as StockableName,
              amount,
            );
            return (
              <Box
                key={item}
                count={restockAmount}
                image={ITEM_DETAILS[item as StockableName].image}
              />
            );
          })}
        </div>
      </div>
      <p className="text-xs p-1 pb-1.5 italic">{t("gems.restockToMaxStock")}</p>{" "}
      {shipmentTime && (
        <div className="px-1 text-xs flex flex-wrap mb-2">
          <span className="mr-2">{t("gems.nextFreeShipment")}</span>
          <TimerDisplay time={shipmentTime} />
        </div>
      )}
      <div className="flex justify-content-around mt-2 space-x-1">
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button className="relative" onClick={handleRestock}>
          {t("restock")}
          <img
            src={ITEM_DETAILS["Gem"].image}
            className="h-5 absolute right-1 top-1"
          />
        </Button>
      </div>
    </>
  );
};
