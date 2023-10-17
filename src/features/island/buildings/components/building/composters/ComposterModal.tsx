import React, { useContext, useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { Button } from "components/ui/Button";
import { hasRequirements } from "features/game/events/landExpansion/startComposter";
import { ITEM_DETAILS } from "features/game/types/images";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";

import tutorial from "src/assets/tutorials/composting.png";
import powerup from "src/assets/icons/level_up.png";

import compost from "assets/composters/compost.png";
import basicIdle from "assets/composters/composter_basic.png";
import basicComposting from "assets/composters/composter_basic_closed.png";
import basicReady from "assets/composters/composter_basic_ready.png";
import advancedIdle from "assets/composters/composter_advanced.png";
import advancedComposting from "assets/composters/composter_advanced_closed.png";
import advancedReady from "assets/composters/composter_advanced_ready.png";
import expertIdle from "assets/composters/composter_expert.png";
import expertComposting from "assets/composters/composter_expert_closed.png";
import expertReady from "assets/composters/composter_expert_ready.png";

import {
  ComposterName,
  composterDetails,
} from "features/game/types/composters";
import Decimal from "decimal.js-light";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import { SUNNYSIDE } from "assets/sunnyside";
import { Label } from "components/ui/Label";
import { secondsToString } from "lib/utils/time";
import { GameState, Inventory } from "features/game/types/game";
import { getKeys } from "features/game/types/craftables";
import { RequirementLabel } from "components/ui/RequirementsLabel";
import { SquareIcon } from "components/ui/SquareIcon";

export const COMPOSTER_IMAGES: Record<
  ComposterName,
  {
    idle: string;
    composting: string;
    ready: string;
    width: number;
  }
> = {
  "Compost Bin": {
    composting: basicComposting,
    idle: basicIdle,
    ready: basicReady,
    width: 24,
  },
  "Turbo Composter": {
    composting: advancedComposting,
    idle: advancedIdle,
    ready: advancedReady,
    width: 27,
  },
  "Premium Composter": {
    composting: expertComposting,
    idle: expertIdle,
    ready: expertReady,
    width: 34,
  },
};
const host = window.location.host.replace(/^www\./, "");
const LOCAL_STORAGE_KEY = `composter-read.${host}-${window.location.pathname}`;

function acknowledgeRead() {
  localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toString());
}

function hasRead() {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY);
}

interface Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  startComposter: () => void;
  composterName: ComposterName;
  onCollect: () => void;
  readyAt?: number;
}

export const ComposterModal: React.FC<Props> = ({
  showModal,
  composterName,
  setShowModal,
  startComposter,
  readyAt,
  onCollect,
}) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [tab, setTab] = useState(0);

  const state = gameState.context.state;

  const composterInfo = composterDetails[composterName];

  const composting = !!readyAt && readyAt > Date.now();
  const isReady = readyAt && readyAt < Date.now();

  const disabled = !hasRequirements(state, composterName) || composting;

  useEffect(() => {
    if (showModal && !hasRead()) {
      setTab(1);
    }
  }, [showModal]);

  const Content = () => {
    if (isReady) {
      return (
        <>
          <div className="flex p-2 -mt-2">
            <img
              src={COMPOSTER_IMAGES[composterName].ready}
              className="w-14 object-contain mr-2"
            />
            <div className="mt-2 flex-1">
              <div className="flex flex-wrap">
                <div className="relative flex items-center mr-3 mb-1">
                  <img
                    src={ITEM_DETAILS[composterInfo.produce].image}
                    className="h-5 mr-1"
                  />
                  <Label type="default">
                    {`${composterInfo.produceAmount} ${composterInfo.produce}`}
                  </Label>
                </div>
                <div className="relative flex items-center mb-1">
                  <img
                    src={ITEM_DETAILS[composterInfo.bait].image}
                    className="h-5 mr-1"
                  />
                  <Label type="default">{`1 ${composterInfo.bait}`}</Label>
                </div>
              </div>
              <div className="flex items-center">
                <img src={SUNNYSIDE.icons.confirm} className="h-4 mr-1" />
                <span className="text-xs">Compost Complete</span>
              </div>
            </div>
          </div>

          <Button
            className="text-xxs sm:text-sm mt-1 whitespace-nowrap"
            onClick={onCollect}
          >
            Collect
          </Button>
        </>
      );
    }

    if (composting) {
      return (
        <>
          <div className="flex p-2 -mt-2">
            <img
              src={COMPOSTER_IMAGES[composterName].composting}
              className="w-14 object-contain mr-2"
            />
            <div className="mt-2 flex-1">
              <div className="flex items-center mb-2">
                <img src={SUNNYSIDE.icons.timer} className="h-5 mr-1" />

                <span className="text-xs mr-1">
                  {secondsToString((readyAt - Date.now()) / 1000, {
                    length: "full",
                  })}
                </span>
              </div>
              <div className="flex flex-wrap my-1">
                <div className="relative flex items-center mr-4 mb-2">
                  <img
                    src={ITEM_DETAILS[composterInfo.produce].image}
                    className="h-5 mr-1"
                  />

                  <Label type="default">
                    {`${composterInfo.produceAmount} ${composterInfo.produce}`}
                  </Label>
                </div>
                <div className="relative flex items-center mb-2">
                  <img
                    src={ITEM_DETAILS[composterInfo.bait].image}
                    className="h-5 mr-1"
                  />
                  <Label type="default">{`1 ${composterInfo.bait}`}</Label>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    const FertiliserLabel = () => {
      const fertiliser = composterDetails[composterName].produce;

      if (fertiliser === "Sprout Mix") {
        return (
          <Label
            icon={powerup}
            secondaryIcon={SUNNYSIDE.icons.plant}
            type="success"
            className="text-xs whitespace-pre-line"
          >
            +0.2 Crops
          </Label>
        );
      }

      if (fertiliser === "Fruitful Blend") {
        return (
          <Label
            icon={powerup}
            secondaryIcon={ITEM_DETAILS.Apple.image}
            type="success"
            className="text-xs whitespace-pre-line"
          >
            +0.1 Fruit
          </Label>
        );
      }

      if (fertiliser === "Rapid Root") {
        return (
          <Label
            icon={SUNNYSIDE.icons.stopwatch}
            secondaryIcon={SUNNYSIDE.icons.plant}
            type="info"
            className="text-xs whitespace-pre-line"
          >
            20% Speed
          </Label>
        );
      }

      return null;
    };

    return (
      <>
        <div className="flex flex-col h-full">
          <div className="flex flex-col h-full px-1 py-0">
            <div className="flex flex-wrap my-1">
              <div className="flex space-x-2 justify-start mr-2">
                <SquareIcon
                  icon={
                    ITEM_DETAILS[composterDetails[composterName].produce].image
                  }
                  width={14}
                />
                <div className="block">
                  <p className="text-xs mb-1">
                    {`${composterDetails[composterName].produceAmount} x ${composterDetails[composterName].produce}`}
                  </p>
                  <FertiliserLabel />
                </div>
              </div>
              <div className="flex space-x-1 justify-start">
                <SquareIcon
                  icon={
                    ITEM_DETAILS[composterDetails[composterName].bait].image
                  }
                  width={14}
                />
                <div className="block">
                  <p className="text-xs mb-1">
                    1 x {composterDetails[composterName].bait}
                  </p>
                  <Label
                    icon={SUNNYSIDE.tools.fishing_rod}
                    type="default"
                    className="text-xs whitespace-pre-line"
                  >
                    Fishing bait
                  </Label>
                </div>
              </div>
            </div>
            <div className="border-t border-white w-full my-2 pt-2 flex justify-between gap-x-3 gap-y-2 flex-wrap ">
              {/* Item ingredients requirements */}
              {!!composterInfo.requirements &&
                getKeys(composterInfo.requirements).map(
                  (ingredientName, index) => (
                    <RequirementLabel
                      key={index}
                      type="item"
                      item={ingredientName}
                      balance={
                        gameState.context.state.inventory[ingredientName] ??
                        new Decimal(0)
                      }
                      requirement={
                        (composterInfo.requirements ?? {})[ingredientName] ??
                        new Decimal(0)
                      }
                    />
                  )
                )}

              <RequirementLabel
                type="time"
                waitSeconds={composterInfo.timeToFinishMilliseconds / 1000}
              />
            </div>
          </div>
        </div>

        <Button
          disabled={disabled}
          className="text-xxs sm:text-sm mt-1 whitespace-nowrap"
          onClick={() => startComposter()}
        >
          Compost
        </Button>
      </>
    );
  };

  return (
    <Modal show={showModal} centered onHide={() => setShowModal(false)}>
      <CloseButtonPanel
        onClose={() => {
          setShowModal(false);
        }}
        tabs={[
          { icon: compost, name: "Composter" },
          {
            icon: SUNNYSIDE.icons.expression_confused,
            name: "Guide",
          },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      >
        {tab === 0 && <Content />}
        {tab === 1 && (
          <>
            <div className="p-2">
              <img src={tutorial} className="w-full mx-auto rounded-lg mb-2" />
              <div className="flex mb-2">
                <div className="w-12 flex justify-center">
                  <img
                    src={SUNNYSIDE.icons.timer}
                    className="h-6 mr-2 object-contain"
                  />
                </div>
                <p className="text-xs  flex-1">
                  Place crops in the composter to feed the worms.
                </p>
              </div>
              <div className="flex mb-2">
                <div className="w-12 flex justify-center">
                  <img src={compost} className="h-6 mr-2 object-contain" />
                </div>
                <p className="text-xs  flex-1">
                  A compost cycle produces multiple fertilisers which can be
                  used to boost your crops & fruit.
                </p>
              </div>
              <div className="flex mb-2">
                <div className="w-12 flex justify-center">
                  <img
                    src={SUNNYSIDE.tools.fishing_rod}
                    className="h-6 mr-2 object-contain"
                  />
                </div>
                <p className="text-xs flex-1">
                  Each compost yields worms that can be used as bait for
                  fishing.
                </p>
              </div>
            </div>
            <Button
              className="text-xxs sm:text-sm mt-1 whitespace-nowrap"
              onClick={() => {
                setTab(0);
                acknowledgeRead();
              }}
            >
              Ok
            </Button>
          </>
        )}
      </CloseButtonPanel>
    </Modal>
  );
};

interface CraftingProps {
  gameState: GameState;
  stock?: Decimal;
  isLimitedItem?: boolean;
  details: any;
  boost?: string;
  requirements?: Inventory;
  limit?: number;
  actionView?: JSX.Element;
  hideDescription?: boolean;
  seconds: number;
}
export const CraftingRequirements: React.FC<CraftingProps> = ({
  gameState,
  stock,
  isLimitedItem = false,
  limit,
  details,
  boost,
  requirements,
  actionView,
  hideDescription,
  seconds,
}: CraftingProps) => {
  const getItemDetail = ({
    hideDescription,
  }: {
    hideDescription?: boolean;
  }) => {
    const { image: icon, description, name } = details;
    const title = details.quantity
      ? `${details.quantity} x ${details.item}`
      : name;

    return (
      <>
        <div className="flex space-x-2 justify-start items-center sm:flex-col-reverse md:space-x-0">
          {icon && !!details.item && (
            <div className="sm:mt-2">
              <SquareIcon icon={icon} width={14} />
            </div>
          )}
          <span className="sm:text-center">{title}</span>
        </div>
        {!hideDescription && (
          <span className="text-xs sm:mt-1 whitespace-pre-line sm:text-center">
            {description}
          </span>
        )}
      </>
    );
  };

  const getRequirements = () => {
    if (!requirements) return <></>;

    return (
      <div className="border-t border-white w-full my-2 pt-2 flex justify-between gap-x-3 gap-y-2 flex-wrap sm:flex-col sm:items-center sm:flex-nowrap">
        {/* Item ingredients requirements */}
        {!!requirements &&
          getKeys(requirements).map((ingredientName, index) => (
            <RequirementLabel
              key={index}
              type="item"
              item={ingredientName}
              balance={gameState.inventory[ingredientName] ?? new Decimal(0)}
              requirement={
                (requirements ?? {})[ingredientName] ?? new Decimal(0)
              }
            />
          ))}

        <RequirementLabel type="time" waitSeconds={seconds} />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col h-full px-1 py-0">
        {getItemDetail({ hideDescription })}
        {limit && (
          <p className="my-1 text-xs text-left sm:text-center">{`Max ${limit} per player`}</p>
        )}
        {getRequirements()}
      </div>
      {actionView}
    </div>
  );
};
