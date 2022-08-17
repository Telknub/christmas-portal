import React from "react";
import { Modal } from "react-bootstrap";

import close from "assets/icons/close.png";
import sword from "src/assets/icons/sword.png";

import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";
import { Rare } from "features/goblins/Rare";
import { LimitedItemType } from "features/game/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ItemsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <Panel className="pt-5 relative">
        <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
          <div className="flex">
            <Tab isActive={true}>
              <img src={sword} className="h-5 mr-2" />
              <span className="text-sm text-shadow">Rewards</span>
            </Tab>
          </div>
          <img
            src={close}
            className="h-6 cursor-pointer mr-2 mb-1"
            onClick={onClose}
          />
        </div>

        <div
          style={{
            minHeight: "200px",
          }}
        >
          <Rare type={LimitedItemType.WarTentItem} onClose={onClose} />
        </div>
      </Panel>
    </Modal>
  );
};
