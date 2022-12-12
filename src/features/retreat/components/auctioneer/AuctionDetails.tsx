import React from "react";

import { Button } from "components/ui/Button";
import token from "assets/icons/token_2.png";
import bg from "assets/ui/brown_background.png";
import calendar from "assets/icons/calendar.png";
import stopwatch from "assets/icons/stopwatch.png";

import { Label } from "components/ui/Label";
import { AuctioneerItem } from "./actions/auctioneerItems";
import { ITEM_DETAILS } from "features/game/types/images";
import { useCountdown } from "lib/utils/hooks/useCountdown";
import Decimal from "decimal.js-light";
import { GoblinState } from "features/game/lib/goblinMachine";
import { getKeys } from "features/game/types/craftables";
import { setImageWidth } from "lib/images";
import { formatDateTime, secondsToString } from "lib/utils/time";
import { InventoryItemName } from "features/game/types/game";
import classNames from "classnames";

type Props = {
  isMinting: boolean;
  item: AuctioneerItem;
  game: GoblinState;
  isUpcomingItem?: boolean;
  onMint: () => void;
};

type TimeObject = {
  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
};

const TimerDisplay = ({ time }: TimeObject) => {
  const timeKeys = getKeys(time);

  return (
    <div className="flex w-full justify-evenly">
      {timeKeys.map((key) => {
        const value = time[key];
        const label = value === 1 ? `${key.slice(0, -1)}` : key;

        return (
          <div className="flex flex-col w-1/4 items-center mr-1" key={key}>
            <p className="text-sm">{`${value}`}</p>
            <p className="text-xxs font-thin">{label}</p>
          </div>
        );
      })}
    </div>
  );
};

export const AuctionDetails: React.FC<Props> = ({
  item: { name, releases, totalMinted, currentRelease },
  isMinting,
  game,
  isUpcomingItem,
  onMint,
}) => {
  const releaseDate = currentRelease?.releaseDate as number;
  const releaseEndDate = currentRelease?.endDate as number;
  const start = useCountdown(releaseDate);
  const end = useCountdown(releaseEndDate);

  const makeSFLRequiredLabel = (sfl: number) => {
    if (game.balance.lt(sfl)) {
      <div className="flex items-center space-x-1">
        <img src={token} className="h-5 mr-1" />
        <Label type="danger">{`${game.balance.toString()}/${sfl}`}</Label>
      </div>;
    }

    return (
      <div className="flex items-center space-x-1">
        <img src={token} className="h-5 mr-1" />
        <span className="text-xxs">{sfl}</span>
      </div>
    );
  };

  const makeIngredients = (
    ingredients?: {
      item: InventoryItemName;
      amount: number;
    }[]
  ) => {
    if (!ingredients) return null;

    return ingredients.map((ingredient) => {
      const inventoryItemAmount =
        game.inventory[ingredient.item] ?? new Decimal(0);
      const hasIngredient = inventoryItemAmount.gte(ingredient.amount);

      if (!hasIngredient) {
        return (
          <div className="flex items-center space-x-1" key={ingredient.item}>
            <img src={ITEM_DETAILS[ingredient.item].image} className="h-5" />
            <Label type="danger">{`${inventoryItemAmount}/${ingredient.amount}`}</Label>
          </div>
        );
      }

      return (
        <div className="flex items-center space-x-1" key={ingredient.item}>
          <img src={ITEM_DETAILS[ingredient.item].image} className="h-5" />
          <span className="text-xxs">{ingredient.amount}</span>
        </div>
      );
    });
  };

  const isMintStarted =
    !start.days && !start.hours && !start.minutes && !start.seconds;

  const isMintComplete =
    !end.days && !end.hours && !end.minutes && !end.seconds;

  const hasIngredients =
    currentRelease?.ingredients.every((ingredient) =>
      (game.inventory[ingredient.item] ?? new Decimal(0)).gte(ingredient.amount)
    ) ?? false;

  const currentSupply = releases.reduce(
    (supply, release) =>
      release.releaseDate < Date.now() ? supply + release.supply : supply,
    0
  );

  const remainingSupply = currentSupply - (totalMinted ?? 0);
  const isSoldOut = remainingSupply <= 0;

  const makeLabel = () => {
    if (isUpcomingItem) return null;

    if (isMintStarted && remainingSupply > 0) {
      return (
        <Label type="info" className="mb-2">
          {`${totalMinted ?? 0}/${currentSupply} Minted`}
        </Label>
      );
    }

    if (isMintStarted && isSoldOut) {
      return (
        <Label type="danger" className="mb-2">
          Sold out
        </Label>
      );
    }

    return (
      <Label type="info" className="mb-2">
        {`Supply: ${currentSupply}`}
      </Label>
    );
  };

  console.log({ isUpcomingItem });

  // If on the Auction tab showing the current release then don't show its details
  // in the list of releases below as its details will be showcased
  const releasesList = isUpcomingItem ? releases : releases.slice(1);
  const currentSflPrice = Number(currentRelease?.price || new Decimal(0));

  return (
    <div className="w-full p-2 flex flex-col items-center">
      <div className="w-full p-2 flex flex-col items-center mx-auto">
        <p className="mb-2">{name}</p>
        <p className="text-center text-sm mb-2">
          {ITEM_DETAILS[name].description}
        </p>
        {makeLabel()}
        <div className="relative mb-2">
          <img src={bg} className="w-64 object-contain rounded-md" />
          <div className="absolute inset-0">
            <img
              src={ITEM_DETAILS[name].image}
              className="absolute z-20 object-cover mb-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onLoad={(e) => setImageWidth(e.currentTarget)}
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full">
              <div className="flex flex-col items-center w-full">
                {isMintStarted && (
                  <Label type="warning" className="mb-2">
                    Closes in
                  </Label>
                )}
                {(!isMintStarted || isUpcomingItem) && (
                  <Label type="warning" className="mb-2">
                    Opens in
                  </Label>
                )}

                <TimerDisplay time={isMintStarted ? end : start} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-3">
        {currentSflPrice > 0 && makeSFLRequiredLabel(currentSflPrice)}
        {makeIngredients(currentRelease?.ingredients)}
      </div>

      {!isUpcomingItem && !isSoldOut && (
        <Button
          disabled={
            !isMintStarted || isMintComplete || isMinting || !hasIngredients
          }
          onClick={onMint}
        >
          Mint
        </Button>
      )}

      {releasesList.length > 0 && (
        <div
          className={classNames("flex flex-col items-start w-full", {
            "mt-4": !isUpcomingItem,
          })}
        >
          <p className="mb-2">
            {isUpcomingItem ? "Releases" : "More Releases"}
          </p>
          {releasesList.map((release, index) => {
            const availableSupply = release?.supply ?? 0;
            const sfl = Number(release.price ?? 0);

            return (
              <div
                className="border-b last:border-b-0 border-white w-full py-3"
                key={index}
              >
                <div className="flex flex-col items-start mb-2 space-y-2 w-full">
                  <Label
                    type="info"
                    className="mb-1"
                  >{`Supply: ${availableSupply}`}</Label>
                  <div className="flex items-center space-x-2">
                    <img src={calendar} className="w-4" alt="calendar" />
                    <span className="text-xxs">
                      {formatDateTime(
                        new Date(release.releaseDate).toISOString()
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={stopwatch} className="w-4" alt="timer" />
                    <span className="text-xxs">{`Available for ${secondsToString(
                      (release.endDate - release.releaseDate) / 1000,
                      { length: "short" }
                    )}`}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-1">
                  {sfl > 0 && makeSFLRequiredLabel(sfl)}
                  {makeIngredients(release.ingredients)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
