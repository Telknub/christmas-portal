import React, { SyntheticEvent, useContext, useState } from "react";
import { useActor } from "@xstate/react";
import classNames from "classnames";
import Decimal from "decimal.js-light";

import token from "assets/icons/token_2.png";

import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { ToastContext } from "features/game/toast/ToastQueueProvider";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";

import { Stock } from "components/ui/Stock";
import { CloudFlareCaptcha } from "components/ui/CloudFlareCaptcha";
import { TreasureToolName, TREASURE_TOOLS } from "features/game/types/tools";
import { getKeys } from "features/game/types/craftables";
import { Label } from "components/ui/Label";
import { Delayed } from "features/island/buildings/components/building/market/Delayed";
import { INITIAL_STOCK } from "features/game/lib/constants";

interface Props {
  onClose: (e?: SyntheticEvent) => void;
}

export const TreasureShopBuy: React.FC<Props> = ({ onClose }) => {
  const [selectedName, setSelectedName] =
    useState<TreasureToolName>("Sand Shovel");
  const { setToast } = useContext(ToastContext);
  const { gameService, shortcutItem } = useContext(Context);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const selected = TREASURE_TOOLS[selectedName];
  const inventory = state.inventory;

  const price = selected.sfl ?? new Decimal(0);

  const lessIngredients = (amount = 1) =>
    getKeys(selected.ingredients).some((name) =>
      selected.ingredients[name]?.mul(amount).greaterThan(inventory[name] || 0)
    );

  const lessFunds = (amount = 1) => {
    if (!price) return;

    return state.balance.lessThan(price.mul(amount));
  };

  const craft = (event: SyntheticEvent, amount = 1) => {
    event.stopPropagation();
    gameService.send("tool.crafted", {
      tool: selectedName,
    });

    setToast({
      icon: token,
      content: `-${price?.mul(amount)}`,
    });

    getKeys(selected.ingredients).map((name) => {
      const item = ITEM_DETAILS[name];
      setToast({
        icon: item.image,
        content: `-${selected.ingredients[name]?.mul(amount)}`,
      });
    });

    shortcutItem(selectedName);
  };

  const onCaptchaSolved = async (captcha: string | null) => {
    await new Promise((res) => setTimeout(res, 1000));

    gameService.send("SYNC", { captcha });

    onClose();
  };

  const sync = () => {
    gameService.send("SYNC", { captcha: "" });

    onClose();
  };

  const restock = (event: SyntheticEvent) => {
    event.stopPropagation();
    // setShowCaptcha(true);
    sync();
  };

  if (showCaptcha) {
    return (
      <CloudFlareCaptcha
        action="carfting-sync"
        onDone={onCaptchaSolved}
        onExpire={() => setShowCaptcha(false)}
        onError={() => setShowCaptcha(false)}
      />
    );
  }

  const Action = () => {
    if (stock?.equals(0)) {
      return <Delayed restock={restock}></Delayed>;
    }

    return (
      <>
        <Button
          disabled={lessFunds() || lessIngredients() || stock?.lessThan(1)}
          className="text-xs mt-1 whitespace-nowrap"
          onClick={(e) => craft(e)}
        >
          Craft 1
        </Button>
      </>
    );
  };

  const labelState = () => {
    const max = INITIAL_STOCK[selectedName];
    const inventoryCount = inventory[selectedName] ?? new Decimal(0);
    const inventoryFull = max ? inventoryCount.gt(max) : true;

    if (stock?.equals(0)) {
      return (
        <Label type="danger" className="-mt-2 mb-1">
          Sold out
        </Label>
      );
    }
    return (
      <Stock item={{ name: selectedName }} inventoryFull={inventoryFull} />
    );
  };

  const stock = state.stock[selectedName] || new Decimal(0);
  const ingredientCount =
    getKeys(selected.ingredients).length + price.toNumber();

  return (
    <div
      style={{
        minHeight: "200px",
      }}
    >
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="w-full max-h-48 sm:max-h-96 sm:w-3/5 h-fit overflow-y-auto scrollable overflow-x-hidden p-1 mt-1 sm:mt-0 sm:mr-1 flex flex-wrap">
          {getKeys(TREASURE_TOOLS).map((toolName) => (
            <Box
              isSelected={selectedName === toolName}
              key={toolName}
              onClick={() => setSelectedName(toolName)}
              image={ITEM_DETAILS[toolName].image}
              count={inventory[toolName]}
            />
          ))}
        </div>
        <OuterPanel className="flex flex-col w-full sm:flex-1">
          <div className="flex flex-col justify-center items-start sm:items-center p-2 pb-0 relative">
            {labelState()}
            <div className="flex space-x-2 items-center my-1 sm:flex-col-reverse md:space-x-0">
              <img
                src={ITEM_DETAILS[selectedName].image}
                className="w-5 sm:w-8 sm:my-1"
                alt={selectedName}
              />
              <span className="text-center mb-1">{selectedName}</span>
            </div>
            <span className="text-xs sm:text-sm sm:text-center">
              {selected.description}
            </span>
            <div className="border-t border-white w-full my-2" />
            <div className="flex w-full justify-between max-h-14 sm:max-h-full sm:flex-col sm:items-center">
              <div className="mb-1 flex flex-wrap sm:flex-nowrap w-[70%] sm:w-auto">
                {price?.gt(0) && (
                  <div className="flex items-center space-x-1 shrink-0 w-1/2 sm:w-full sm:justify-center my-[1px] sm:mb-1">
                    <div className="w-5">
                      <img src={token} className="h-5 mr-1" />
                    </div>
                    <span
                      className={classNames("text-xs text-center", {
                        "text-red-500": lessFunds(),
                      })}
                    >
                      {`${price?.toNumber()}`}
                    </span>
                  </div>
                )}
                {getKeys(selected.ingredients).map((ingredientName, index) => {
                  const item = ITEM_DETAILS[ingredientName];
                  const inventoryAmount =
                    inventory[ingredientName]?.toDecimalPlaces(1) || 0;
                  const requiredAmount =
                    selected.ingredients[ingredientName]?.toDecimalPlaces(1) ||
                    0;

                  // Ingredient difference
                  const lessIngredient = new Decimal(inventoryAmount).lessThan(
                    requiredAmount
                  );

                  // rendering item remnants
                  const renderRemnants = () => {
                    if (lessIngredient) {
                      // if inventory items is less than required items
                      return (
                        <Label type="danger">{`${inventoryAmount}/${requiredAmount}`}</Label>
                      );
                    }
                    // if inventory items is equal to required items
                    return (
                      <span className="text-xs text-center">
                        {`${requiredAmount}`}
                      </span>
                    );
                  };

                  return (
                    <div
                      className={`flex items-center space-x-1 ${
                        ingredientCount > 2 ? "w-1/2" : "w-full"
                      } shrink-0 sm:justify-center my-[1px] sm:mb-1 sm:w-full`}
                      key={index}
                    >
                      <div className="w-5">
                        <img src={item.image} className="h-5" />
                      </div>
                      {renderRemnants()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {Action()}
        </OuterPanel>
      </div>
    </div>
  );
};
