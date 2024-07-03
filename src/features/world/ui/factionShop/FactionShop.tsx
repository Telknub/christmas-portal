import React, { useEffect, useState } from "react";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { ITEM_IDS } from "features/game/types/bumpkin";
import { BUMPKIN_ITEM_BUFF_LABELS } from "features/game/types/bumpkinItemBuffs";
import { ITEM_DETAILS } from "features/game/types/images";
import { NPC_WEARABLES } from "lib/npcs";

import { COLLECTIBLE_BUFF_LABELS } from "features/game/types/collectibleItemBuffs";
import { BuffLabel } from "features/game/types";
import { ItemDetail } from "./components/ItemDetail";

import shopIcon from "assets/icons/shop.png";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { getImageUrl } from "lib/utils/getImageURLS";
import { ModalOverlay } from "components/ui/ModalOverlay";
import {
  FACTION_SHOP_ITEMS,
  FactionShopCollectible,
  FactionShopFood,
  FactionShopWearable,
} from "features/game/types/factionShop";
import { ItemsList } from "./components/ItemList";

interface Props {
  onClose: () => void;
}

// type guard for WearablesItem | CollectiblesItem
export const isWearablesItem = (
  item: FactionShopWearable | FactionShopCollectible | FactionShopFood | null,
): item is FactionShopWearable => {
  return (item as FactionShopWearable).name in ITEM_IDS;
};

// type guard for FoodItem
export const isFoodItem = (
  item: FactionShopWearable | FactionShopCollectible | FactionShopFood | null,
): item is FactionShopFood => {
  return (item as FactionShopFood).name in ITEM_DETAILS;
};

export const getItemImage = (
  item: FactionShopWearable | FactionShopCollectible | FactionShopFood | null,
): string => {
  if (!item) return "";

  if (isFoodItem(item)) {
    return ITEM_DETAILS[item.name].image;
  }

  if (isWearablesItem(item)) {
    return getImageUrl(ITEM_IDS[item.name]);
  }

  return ITEM_DETAILS[item.name].image;
};

export const getItemBuffLabel = (
  item: FactionShopWearable | FactionShopCollectible | FactionShopFood | null,
): BuffLabel | undefined => {
  if (!item) return;

  if (isFoodItem(item)) {
    return undefined;
  }
  if (isWearablesItem(item)) {
    return BUMPKIN_ITEM_BUFF_LABELS[item.name];
  }

  return COLLECTIBLE_BUFF_LABELS[item.name];
};

export const FactionShop: React.FC<Props> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<
    FactionShopWearable | FactionShopCollectible | FactionShopFood | null
  >(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedItem && !isVisible) {
      setIsVisible(true);
    }
  }, [selectedItem, isVisible]);

  const handleClickItem = (
    item: FactionShopWearable | FactionShopCollectible | FactionShopFood,
  ) => {
    setSelectedItem(item);
  };

  const wearables = Object.values(FACTION_SHOP_ITEMS).filter(
    (item) => item.type === "wearable",
  );

  const collectibles = Object.values(FACTION_SHOP_ITEMS).filter(
    (item) => item.type === "collectible",
  );

  const food = Object.values(FACTION_SHOP_ITEMS).filter(
    (item) => item.type === "food",
  );
  const { t } = useAppTranslation();
  return (
    <CloseButtonPanel
      bumpkinParts={NPC_WEARABLES["eldric"]}
      tabs={[{ icon: shopIcon, name: "Faction Shop" }]}
      onClose={onClose}
    >
      <div className="relative h-full w-full">
        <div className="flex flex-col p-2 pt-1 space-y-3 overflow-y-auto scrollable max-h-[300px]">
          <span className="text-xs">{t("faction.shop.welcome")}</span>
          {/* Wearables */}
          <ItemsList
            itemsLabel="Wearables"
            type="wearables"
            items={wearables}
            onItemClick={handleClickItem}
          />
          {/* Collectibles */}
          <ItemsList
            itemsLabel="Collectibles"
            type="collectibles"
            items={collectibles}
            onItemClick={handleClickItem}
          />
          {/* Food */}
          <ItemsList
            itemsLabel="Food"
            type="food"
            items={food}
            onItemClick={handleClickItem}
          />
        </div>

        <ModalOverlay
          show={!!selectedItem}
          onBackdropClick={() => setSelectedItem(null)}
        >
          <ItemDetail
            isVisible={isVisible}
            item={selectedItem}
            image={getItemImage(selectedItem)}
            buff={getItemBuffLabel(selectedItem)}
            isWearable={selectedItem ? isWearablesItem(selectedItem) : false}
            onClose={() => setSelectedItem(null)}
          />
        </ModalOverlay>
      </div>
    </CloseButtonPanel>
  );
};
