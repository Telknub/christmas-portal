import React, { useState } from "react";

import { MapPlacement } from "features/game/expansion/components/MapPlacement";

import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { ITEM_DETAILS } from "features/game/types/images";
import { getEntries } from "features/game/types/craftables";
import { Label } from "components/ui/Label";
import { SUNNYSIDE } from "assets/sunnyside";
import { secondsToString } from "lib/utils/time";
import {
  BOOST_TREASURE,
  isBoostTreasure,
  isBeachBountyTreasure,
  isDecorationTreasure,
  TIME_LIMITED_TREASURE,
  TreasureName,
  TREASURES,
} from "features/game/types/treasure";
import { NPC } from "features/island/bumpkin/components/DynamicMiniNFT";
import { Equipped } from "features/game/types/bumpkin";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";

enum RarityOrder {
  "rare",
  "good",
  "average",
}

const TREASURE_TROVE_ITEMS = getEntries(TREASURES)
  // Skip the time limited treasure, this is displayed separately
  .filter(([name]) => name !== TIME_LIMITED_TREASURE.name)
  // Sort by name first
  .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
  // Then sort by rarity
  .sort(
    ([, treasureA], [, treasureB]) =>
      RarityOrder[treasureA.type] - RarityOrder[treasureB.type]
  );

const TIME_LIMITED_TREASURE_END_DATE =
  (TIME_LIMITED_TREASURE.endDate - Date.now()) / 1000;

const getTreasurePurpose = (treasureName: TreasureName) => {
  if (isBoostTreasure(treasureName))
    return <span className="text-[12px]">{BOOST_TREASURE[treasureName]}</span>;
  if (isBeachBountyTreasure(treasureName))
    return <span className="text-[12px]">Beach Bounty</span>;
  if (isDecorationTreasure(treasureName))
    return <span className="text-[12px]">Decoration</span>;
};

const TreasureTroveItem: React.FC<{
  treasureName: keyof typeof TREASURES;
  rarity: "good" | "average" | "rare";
}> = ({ treasureName, rarity }) => (
  <div key={treasureName} className="flex">
    <div className="justify-center items-center flex mr-2">
      <img
        src={ITEM_DETAILS[treasureName].image}
        className="w-9 h-9 object-contain"
      />
    </div>
    <div className="flex flex-col w-full justify-center">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm mb-1 leading-5">{treasureName}</span>
          {getTreasurePurpose(treasureName)}
        </div>
        <div className="flex items-center">
          {rarity === "rare" && <Label type="warning">Rare</Label>}
          {rarity === "good" && <Label type="success">Uncommon</Label>}
          {rarity === "average" && (
            <Label className="bg-silver-500">Common</Label>
          )}
        </div>
      </div>
    </div>
  </div>
);

const bumpkin: Equipped = {
  body: "Pirate Potion",
  hair: "White Long Hair",
  hat: "Pirate Hat",
  shirt: "Fancy Top",
  pants: "Pirate Pants",
  tool: "Pirate Scimitar",
  background: "Seashore Background",
  shoes: "Black Farmer Boots",
};

const TreasureTroveModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Refresh the countdown timer on the time limited treasure
  useUiRefresher();

  return (
    <CloseButtonPanel
      onClose={() => onClose()}
      title={"Treasure Trove"}
      bumpkinParts={bumpkin}
    >
      <div
        className="flex flex-col p-2 overflow-y-auto scrollable overflow-x-hidden divide-y-2 divide-dashed divide-brown-600"
        style={{ maxHeight: 400 }}
      >
        <div className="pb-2">
          <div className="flex items-start justify-between pb-2">
            <span className="text-xs italic">Time Limited Treasure!</span>
            <Label type="info" className="flex items-center whitespace-nowrap">
              <img
                src={SUNNYSIDE.icons.stopwatch}
                className="w-3 left-0 mr-1"
              />
              {`${secondsToString(TIME_LIMITED_TREASURE_END_DATE, {
                length: "medium",
                isShortFormat: true,
              })} left`}
            </Label>
          </div>
          <TreasureTroveItem
            treasureName={TIME_LIMITED_TREASURE.name}
            rarity={TREASURES[TIME_LIMITED_TREASURE.name].type}
          />
        </div>

        <div className="pt-2 space-y-3">
          {TREASURE_TROVE_ITEMS.map(([name, treasure]) => (
            <TreasureTroveItem
              key={name}
              treasureName={name}
              rarity={treasure.type}
            />
          ))}
        </div>
      </div>
    </CloseButtonPanel>
  );
};

export const TreasureTrove: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <MapPlacement x={-5} y={1} height={1} width={1}>
      <NPC onClick={() => setShowModal(true)} {...bumpkin} />
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <TreasureTroveModal onClose={() => setShowModal(false)} />
      </Modal>
    </MapPlacement>
  );
};
