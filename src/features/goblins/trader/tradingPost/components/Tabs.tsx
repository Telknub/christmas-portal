import React from "react";

import close from "assets/icons/close.png";
import token from "assets/icons/token.gif";

import { Tab } from "components/ui/Tab";

interface TabsProps {
  isSelling: boolean;
  setIsSelling: (selling: boolean) => void;
  onClose: () => void;
}

export const Tabs: React.FC<TabsProps> = ({
  isSelling,
  setIsSelling,
  onClose,
}) => (
  <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
    <div className="flex">
      <Tab
        className="flex items-center border-b-2 border-brown-300"
        isActive={isSelling}
        onClick={() => setIsSelling(true)}
      >
        <img src={token} className="h-4 sm:h-5 mr-2" />
        <span className="text-sm overflow-hidden text-ellipsis">Sell</span>
      </Tab>
      <Tab
        className="flex items-center border-b-2 border-brown-300"
        isActive={!isSelling}
        onClick={() => setIsSelling(false)}
      >
        <img src={token} className="h-4 sm:h-5 mr-2" />
        <span className="text-sm overflow-hidden text-ellipsis">Buy</span>
      </Tab>
    </div>
    <img
      src={close}
      className="h-6 cursor-pointer mr-2 mb-1"
      onClick={onClose}
    />
  </div>
);
