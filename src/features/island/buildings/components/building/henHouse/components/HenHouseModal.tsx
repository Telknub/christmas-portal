import React, { useContext, useState } from "react";

import plus from "assets/icons/plus.png";
import boxChicken from "assets/animals/chickens/box_chicken.png";
import token from "assets/icons/token_2.png";

import { OuterPanel, Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";
import { ANIMALS, getKeys } from "features/game/types/craftables";
import { Box } from "components/ui/Box";
import classNames from "classnames";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { Button } from "components/ui/Button";
import Decimal from "decimal.js-light";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { getSupportedChickens } from "features/game/events/landExpansion/utils";
import { Label } from "components/ui/Label";
import { SUNNYSIDE } from "assets/sunnyside";

interface Props {
  onClose: () => void;
}

export const HenHouseModal: React.FC<Props> = ({ onClose }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const inventory = state.inventory;

  // V1 may have ones without coords
  const workingChickenCount = new Decimal(
    getKeys(state.chickens).filter(
      (index) => state.chickens[index].coordinates
    ).length
  );
  const ownedChickenCount = new Decimal(inventory.Chicken || 0);
  const lazyChickenCount = workingChickenCount.greaterThan(ownedChickenCount)
    ? new Decimal(0)
    : ownedChickenCount.minus(workingChickenCount);

  const availableSpots = getSupportedChickens(state);
  const henHouseFull = ownedChickenCount.greaterThanOrEqualTo(availableSpots);
  const workingCapacityFull =
    workingChickenCount.greaterThanOrEqualTo(availableSpots);

  const price = ANIMALS()["Chicken"].tokenAmount;
  const lessFunds = () => {
    if (price === undefined) return true;
    return state.balance.lessThan(price);
  };

  const canBuyChicken = !henHouseFull && !workingCapacityFull && !lessFunds();
  const canPlaceLazyChicken =
    !workingCapacityFull && lazyChickenCount.greaterThanOrEqualTo(1);

  const [selectedChicken, setSelectedChicken] = useState<
    "working" | "lazy" | "buy"
  >(canPlaceLazyChicken ? "lazy" : canBuyChicken ? "buy" : "working");

  const handleBuy = () => {
    gameService.send("LANDSCAPE", {
      placeable: "Chicken",
      action: "chicken.bought",
      // Not used yet
      requirements: {
        sfl: new Decimal(0),
        ingredients: {},
      },
    });
    onClose();
  };

  const handlePlace = () => {
    gameService.send("LANDSCAPE", {
      placeable: "Chicken",
      action: "chicken.placed",
      // Not used yet
      requirements: {
        sfl: new Decimal(0),
        ingredients: {},
      },
    });
    onClose();
  };

  const isSaving = gameState.matches("autosaving");

  const Details = () => {
    if (selectedChicken === "buy") {
      return (
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-center">Chicken</span>
          <img
            src={SUNNYSIDE.resource.chicken}
            className="h-16 img-highlight mt-1"
            alt="chicken"
          />
          <span className="text-center mt-2 text-sm">
            Feed wheat and collect eggs
          </span>
          <>
            <div className="border-t border-white w-full mt-2 pt-1">
              <div className="flex justify-center items-end">
                <img src={token} className="h-5 mr-1" />
                <span
                  className={classNames("text-xs text-center mt-2 ", {
                    "text-red-500": lessFunds(),
                  })}
                >
                  {`${price?.toString()}`}
                </span>
              </div>
            </div>
            <Button
              disabled={!canBuyChicken || isSaving}
              className="text-xs mt-3 whitespace-nowrap"
              onClick={handleBuy}
            >
              {isSaving ? "Saving..." : "Buy"}
            </Button>
          </>
        </div>
      );
    }

    if (selectedChicken === "lazy") {
      return (
        <div className="flex flex-col justify-center items-center p-2 relative">
          <span className="text-center">Lazy Chicken</span>
          <img
            src={boxChicken}
            className="h-16 img-highlight mt-1"
            alt="chicken"
          />
          <div className="flex mt-2 relative">
            <span className="text-center text-sm">
              Put your chicken to work to start collecting eggs!
            </span>
          </div>

          <Button
            className="text-xs mt-3 whitespace-nowrap"
            onClick={handlePlace}
            disabled={!canPlaceLazyChicken || isSaving}
          >
            {isSaving ? "Saving..." : "Place"}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center items-center p-2 relative">
        <span className="text-center">Working Chicken</span>
        <img
          src={SUNNYSIDE.resource.chicken}
          className="h-16 img-highlight mt-1"
          alt="chicken"
        />
        <span className="text-center mt-2 text-sm">
          Already placed and working hard!
        </span>
      </div>
    );
  };

  return (
    <Panel className="relative" hasTabs>
      <div
        className="absolute flex"
        style={{
          top: `${PIXEL_SCALE * 1}px`,
          left: `${PIXEL_SCALE * 1}px`,
          right: `${PIXEL_SCALE * 1}px`,
        }}
      >
        <Tab isActive>
          <img src={SUNNYSIDE.resource.chicken} className="h-5 mr-2" />
          <span className="text-sm">Chickens</span>
        </Tab>
        <img
          src={SUNNYSIDE.icons.close}
          className="absolute cursor-pointer z-20"
          onClick={onClose}
          style={{
            top: `${PIXEL_SCALE * 1}px`,
            right: `${PIXEL_SCALE * 1}px`,
            width: `${PIXEL_SCALE * 11}px`,
          }}
        />
      </div>

      <div
        style={{
          minHeight: "200px",
        }}
      >
        <div className="flex flex-col-reverse sm:flex-row">
          <div
            className="w-full sm:w-3/5 h-fit overflow-y-auto scrollable overflow-x-hidden p-1 mt-1 sm:mt-0 sm:mr-1 flex flex-wrap"
            style={{ maxHeight: 400 }}
          >
            <div className="flex flex-wrap">
              <Box
                isSelected={selectedChicken === "working"}
                key="working-chicken"
                count={workingChickenCount}
                onClick={() => setSelectedChicken("working")}
                image={SUNNYSIDE.resource.chicken}
              />
              <Box
                isSelected={selectedChicken === "lazy"}
                key="lazy-chicken"
                count={lazyChickenCount}
                onClick={() => setSelectedChicken("lazy")}
                image={boxChicken}
              />
              <Box
                isSelected={selectedChicken === "buy"}
                key="buy-chicken"
                onClick={() => setSelectedChicken("buy")}
                image={plus}
              />
            </div>
            <div className="flex flex-col items-baseline w-full">
              <Label
                type={workingCapacityFull ? "danger" : "info"}
                className="sm:mr-auto m-1"
              >
                {`Capacity ${workingChickenCount}/${availableSpots}`}
              </Label>
              {workingCapacityFull && (
                <p className="text-xs mx-1 mb-1">
                  Build an extra Hen House to farm more chickens
                </p>
              )}
            </div>
          </div>
          <OuterPanel className="w-full flex-1">{Details()}</OuterPanel>
        </div>
      </div>
    </Panel>
  );
};
