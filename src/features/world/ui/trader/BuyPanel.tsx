import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";

import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";

import { Button } from "components/ui/Button";

import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { OuterPanel } from "components/ui/Panel";
import { Box } from "components/ui/Box";
import Decimal from "decimal.js-light";
import token from "assets/icons/token_2.png";
import lock from "assets/skills/lock.png";
import { TRADE_LIMITS } from "features/game/events/landExpansion/listTrade";
import { getKeys } from "features/game/types/craftables";
import { InventoryItemName } from "features/game/types/game";
import { SUNNYSIDE } from "assets/sunnyside";
import { PIXEL_SCALE } from "features/game/lib/constants";
import {
  Listing,
  getTradeListings,
} from "features/game/actions/getTradeListings";
import { Context as AuthContext } from "features/auth/lib/Provider";
import { hasMaxItems } from "features/game/lib/processEvent";
import { makeListingType } from "lib/utils/makeTradeListingType";
import { Label } from "components/ui/Label";
import { Loading } from "features/auth/components";

export const BuyPanel: React.FC = () => {
  const { t } = useAppTranslation();
  const { gameService } = useContext(Context);
  const { authService } = useContext(AuthContext);
  const [authState] = useActor(authService);

  const [view, setView] = useState<"search" | "list">("search");
  const [search, setSearch] = useState<Partial<InventoryItemName>>("Sunflower");
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing>();
  const [isSearching, setIsSearching] = useState(false);
  const [warning, setWarning] = useState<"pendingTransaction" | "hoarding">();

  const [loading, setLoading] = useState(false);
  const [
    {
      context: { state, transaction, farmId },
    },
  ] = useActor(gameService);
  const inventory = state.inventory;

  const searchView = () => {
    return (
      <div className="p-2">
        <p className="text-xs mt-2">{t("trading.select.resources")}</p>

        <div className="flex flex-wrap mt-2">
          {getKeys(TRADE_LIMITS).map((name) => (
            <Box
              image={ITEM_DETAILS[name].image}
              onClick={() => setSearch(name)}
              key={name}
              isSelected={search === name}
            />
          ))}
        </div>

        <Button
          disabled={search.length === 0}
          onClick={() => {
            onSearch(search);
          }}
        >
          {t("search")}
        </Button>
      </div>
    );
  };

  const onBack = () => {
    setView("search");
    setSearch("Sunflower");
  };

  const listView = (listings: Listing[]) => {
    if (listings.length === 0) {
      return (
        <div className="p-2">
          <img
            src={SUNNYSIDE.icons.arrow_left}
            className="absolute self-start cursor-pointer"
            style={{
              top: `${PIXEL_SCALE * 2}px`,
              left: `${PIXEL_SCALE * 2}px`,
              width: `${PIXEL_SCALE * 11}px`,
            }}
            alt="back"
            onClick={() => onBack()}
          />
          <p className="mt-8">{t("trading.no.listings")}</p>
        </div>
      );
    }

    const confirm = (listing: Listing) => {
      const updatedInventory = getKeys(listing.items).reduce(
        (acc, name) => ({
          ...acc,
          [name]: (inventory[name] ?? new Decimal(0)).add(
            listing.items[name] ?? 0
          ),
        }),
        inventory
      );

      const hasMaxedOut = hasMaxItems({
        current: updatedInventory,
        old: state.previousInventory,
      });

      if (hasMaxedOut) {
        setWarning("hoarding");
        return;
      }

      if (transaction && transaction.expiresAt > Date.now()) {
        setWarning("pendingTransaction");
        return;
      }

      setSelectedListing(listing);
    };

    const onConfirm = async (listing: Listing) => {
      gameService.send("FULFILL_TRADE_LISTING", {
        sellerId: listing.farmId,
        listingId: listing.id,
        listingType: makeListingType(listing.items),
      });
      setLoading(true);
    };

    const Action = (listing: Listing) => {
      if (listing.farmId == farmId) {
        return (
          <div className="flex items-center mt-1  justify-end mr-0.5">
            <Label icon={token} type="info" className="mb-4">
              {t("trading.your.listing")}
            </Label>
          </div>
        );
      }

      if (selectedListing?.id == listing.id) {
        return (
          <Button onClick={() => onConfirm(listing)}>
            <div className="flex items-center">
              <img src={SUNNYSIDE.icons.confirm} className="h-4 mr-1" />
              <span className="text-xs">{t("confirm")}</span>
            </div>
          </Button>
        );
      }

      const hasSFL = state.balance.gte(listing.sfl);
      const disabled = !hasSFL;

      return (
        <Button
          disabled={disabled}
          onClick={() => {
            confirm(listing);
          }}
        >
          {t("buy")}
        </Button>
      );
    };

    if (warning === "hoarding") {
      return (
        <div className="p-1 flex flex-col items-center">
          <img src={lock} className="w-1/5 mb-2" />
          <p className="text-sm mb-1 text-center">
            {t("playerTrade.max.item")}
          </p>
          <p className="text-xs mb-1 text-center">
            {t("playerTrade.Progress")}
          </p>
        </div>
      );
    }

    if (warning === "pendingTransaction") {
      return (
        <div className="p-1 flex flex-col items-center">
          <img src={SUNNYSIDE.icons.timer} className="w-1/6 mb-2" />
          <p className="text-sm mb-1 text-center">
            {t("playerTrade.transaction")}
          </p>
          <p className="text-xs mb-1 text-center">{t("playerTrade.Please")}</p>
        </div>
      );
    }

    if (loading) {
      if (gameService.state.matches("fulfillTradeListing")) {
        return <Loading text="Trading" />;
      }

      if (selectedListing) {
        const listingItem = selectedListing.items[
          getKeys(selectedListing.items)[0]
        ] as number;
        const unitPrice = (selectedListing.sfl / listingItem).toFixed(4);

        return (
          <>
            <div className="p-2">
              <img src={SUNNYSIDE.icons.confirm} className="mx-auto h-6 my-2" />
              <p className="text-sm mb-2 text-center">
                {t("trading.listing.fulfilled")}
              </p>
              <OuterPanel className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex flex-wrap w-52">
                      {getKeys(selectedListing.items).map((item, index) => (
                        <Box
                          image={ITEM_DETAILS[item].image}
                          count={new Decimal(selectedListing.items[item] ?? 0)}
                          disabled
                          key={`items-${index}`}
                        />
                      ))}
                    </div>
                    <p className="text-xxs ml-2">{`${unitPrice} per unit`}</p>
                  </div>

                  <div className="">
                    <div className="flex items-center mt-1  justify-end mr-0.5">
                      <Label icon={token} type="info" className="mb-4">
                        {t("purchased")}
                      </Label>
                    </div>
                    <div className="flex items-center mt-1  justify-end mr-0.5">
                      <p className="text-xs">{`${selectedListing.sfl} SFL`}</p>
                      <img src={token} className="h-6 ml-1" />
                    </div>
                  </div>
                </div>
              </OuterPanel>
            </div>
            <Button
              onClick={() => {
                setLoading(false);
                setView("search");
              }}
            >
              {t("continue")}
            </Button>
          </>
        );
      }
    }

    return (
      <div>
        <img
          src={SUNNYSIDE.icons.arrow_left}
          className="absolute self-start cursor-pointer"
          style={{
            top: `${PIXEL_SCALE * 2}px`,
            left: `${PIXEL_SCALE * 6}px`,
            width: `${PIXEL_SCALE * 11}px`,
          }}
          alt="back"
          onClick={() => onBack()}
        />
        <div className="mt-10">
          {listings.map((listing, index) => {
            // only one resource listing
            const listingItem = listing.items[
              getKeys(listing.items)[0]
            ] as number;
            const unitPrice = (listing.sfl / listingItem).toFixed(4);
            return (
              <OuterPanel className="mb-2" key={`data-${index}`}>
                <div className="flex justify-between">
                  <div className="justify-start">
                    <div className="flex flex-wrap w-52">
                      {getKeys(listing.items).map((item) => (
                        <Box
                          image={ITEM_DETAILS[item].image}
                          count={new Decimal(listing.items[item] ?? 0)}
                          disabled
                          key={`items-${index}`}
                        />
                      ))}
                    </div>
                    <p className="text-xxs ml-2">{`${unitPrice} per unit`}</p>
                  </div>

                  <div className="flex flex-col justify-end">
                    {Action(listing)}

                    <div className="flex justfy-end">
                      <img src={token} className="h-6 mr-2" />
                      <p className="text-xs">{`${listing.sfl} SFL`}</p>
                    </div>
                  </div>
                </div>
              </OuterPanel>
            );
          })}
        </div>
      </div>
    );
  };

  const onSearch = async (resource: Partial<InventoryItemName>) => {
    setIsSearching(true);
    const listings = await getTradeListings(
      resource.toLowerCase(),
      authState.context.user.rawToken
    );

    setListings(listings);
    setIsSearching(false);
    setView("list");
  };

  if (!state.inventory["Gold Pass"]) {
    return (
      <div className="relative">
        <div className="p-1 flex flex-col items-center">
          <img
            src={ITEM_DETAILS["Gold Pass"].image}
            className="w-1/5 mx-auto my-2 img-highlight-heavy"
          />
          <p className="text-sm">{t("bumpkinTrade.goldpass.required")}</p>
          <p className="text-xs mb-2">{t("bumpkinTrade.purchase")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto pr-1 divide-brown-600 scrollable">
      <div className="flex items-start justify-between mb-2">
        {isSearching && <p className="loading">{t("searching")}</p>}
        {!isSearching && (
          <div className="relative w-full">
            {view === "search" && searchView()}
            {view === "list" && listView(listings)}
          </div>
        )}
      </div>
    </div>
  );
};
