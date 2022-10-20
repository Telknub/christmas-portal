import React, { useEffect, useState } from "react";

import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { OuterPanel } from "components/ui/Panel";
import Decimal from "decimal.js-light";

import { BUMPKIN_ITEMS } from "features/bumpkins/types/BumpkinDetails";
import { Tab } from "./ItemsModal";

import token from "assets/icons/token_2.png";
import {
  BumpkinShopItem,
  loadCollection,
  loadCurrentAndUpcomingDrops,
} from "./actions/items";
import classNames from "classnames";

const TAB_CONTENT_HEIGHT = 364;

interface Props {
  tab: Tab;
}

export type Release = {
  releaseDate: number;
  endDate?: number;
  supply: number;
  price: string;
};

export const TabContent: React.FC<Props> = ({ tab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [upcoming, setUpcoming] = useState<BumpkinShopItem[]>([]);
  const [collection, setCollection] = useState<BumpkinShopItem[]>([]);
  const [selected, setSelected] = useState<BumpkinShopItem | undefined>(
    undefined
  );

  useEffect(() => {
    const loadItems = async () => {
      const upcoming = await loadCurrentAndUpcomingDrops();
      const collection = await loadCollection();

      setUpcoming(upcoming);
      setCollection(collection);

      const items = tab === "collection" ? collection : upcoming;

      setSelected(items[0]);

      setIsLoading(false);
    };

    loadItems();
  }, []);

  useEffect(() => {
    const items = tab === "collection" ? collection : upcoming;

    setSelected(items[0]);
  }, [tab, collection, upcoming]);

  const items = tab === "collection" ? collection : upcoming;

  const goToUpcomingDrops = () => {
    window.open("https://testnet.bumpkins.io/#/upcoming-drops", "_blank");
  };

  const goToCollectionItem = () => {
    window.open(
      `https://testnet.bumpkins.io/#/collection/${selected?.tokenId}`,
      "_blank"
    );
  };

  if (isLoading) {
    return (
      <div className="h-60">
        <span className="loading">Loading</span>
      </div>
    );
  }

  if (selected === undefined) {
    return (
      <div className="flex flex-col">
        <span>Currently Unavailable!</span>
        <span>Please try again later.</span>
      </div>
    );
  }

  const PanelDetail = () => {
    if (tab === "collection") {
      return (
        <>
          <span className="text-shadow text-center text-xs leading-5">
            {BUMPKIN_ITEMS[selected.name].description}
          </span>
          <div className="border-t border-white w-full mt-2 py-2 text-center">
            <span className="text-shadow text-xxs text-center mt-2 sm:text-xs">
              Visit Bumpkins.io for more info about this wearable
            </span>
          </div>
          <Button className="text-xs mt-1" onClick={goToCollectionItem}>
            Go to Bumpkins.io
          </Button>
        </>
      );
    }
    const now = Date.now();
    const releaseDate = selected.currentRelease?.releaseDate as number;
    const releaseEndDate = selected.currentRelease?.endDate as number;
    const mintIsLive = releaseDate < now && releaseEndDate > now;

    return (
      <>
        <span className="bg-blue-600 border text-xxs absolute left-0 -top-5 p-1 rounded-md">
          {mintIsLive
            ? "Available now on Bumpkins.io"
            : `Released: ${new Date(releaseDate).toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
                hour12: true,
              })}`}
        </span>
        <span className="text-shadow text-center text-xs leading-5">
          {BUMPKIN_ITEMS[selected.name].description}
        </span>
        <div className="border-t border-white w-full mt-2 pt-2 text-center">
          <div className="flex justify-center items-end my-1">
            <img src={token} className="h-4 mr-1" />
            <span className="text-xs sm:text-sm text-shadow text-center">
              {`$${selected.currentRelease?.price}`}
            </span>
          </div>
        </div>
        <Button className="text-xs mt-1" onClick={goToUpcomingDrops}>
          Go to Bumpkins.io
        </Button>
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <OuterPanel className="flex-1 w-full flex flex-col justify-between items-center">
        <div
          className={classNames(
            "flex flex-col justify-center items-center p-2 relative w-full",
            {
              "mt-2": tab === "upcoming-drops",
            }
          )}
        >
          <span className="text-shadow text-center text-sm">
            {selected.name}
          </span>
          <img
            src={BUMPKIN_ITEMS[selected.name].shopImage}
            className="h-8 my-2"
            alt={selected.name}
          />
          {PanelDetail()}
        </div>
      </OuterPanel>
      <div
        style={{
          maxHeight: TAB_CONTENT_HEIGHT,
        }}
        className="overflow-y-auto w-full pt-1 mr-1 scrollable"
      >
        <div className="flex flex-wrap h-fit justify-center">
          {items.map((item) => (
            <Box
              isSelected={selected === item}
              key={item.name}
              onClick={() => setSelected(item)}
              image={BUMPKIN_ITEMS[item.name].shopImage}
              count={new Decimal(0)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
