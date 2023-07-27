import React, { useState } from "react";
import { InventoryItemName } from "features/game/types/game";
import sunflower from "assets/decorations/bush.png";
import Decimal from "decimal.js-light";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Modal } from "react-bootstrap";
import { LandscapingDecorations } from "./LandscapingDecorations";
import { NPC_WEARABLES } from "lib/npcs";

interface Props {
  show: boolean;
  onHide: () => void;
}

export type TabItems = Record<string, { items: object }>;

export type Inventory = Partial<Record<InventoryItemName, Decimal>>;

export const CraftDecorationsModal: React.FC<Props> = ({ show, onHide }) => {
  const [tab, setTab] = useState(0);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <CloseButtonPanel
        tabs={[{ icon: sunflower, name: "Landscaping" }]}
        setCurrentTab={setTab}
        currentTab={tab}
        onClose={onHide}
        bumpkinParts={NPC_WEARABLES.grimtooth}
      >
        {tab === 0 && <LandscapingDecorations onClose={onHide} />}
      </CloseButtonPanel>
    </Modal>
  );
};
