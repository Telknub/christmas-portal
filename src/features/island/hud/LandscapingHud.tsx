import React, { useContext, useState } from "react";
import { Balance } from "components/Balance";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { BlockBucks } from "./components/BlockBucks";
import Decimal from "decimal.js-light";
import { PIXEL_SCALE } from "features/game/lib/constants";

import { SUNNYSIDE } from "assets/sunnyside";
import scarecrow from "assets/icons/scarecrow.png";
import bush from "assets/icons/decoration.png";
import chest from "assets/icons/chest.png";
import lightning from "assets/icons/lightning.png";

import { InnerPanel, OuterPanel } from "components/ui/Panel";
import { Box } from "components/ui/Box";
import {
  MachineInterpreter,
  RESOURCE_PLACE_EVENTS,
  placeEvent,
} from "features/game/expansion/placeable/landscapingMachine";
import { Label } from "components/ui/Label";
import { PlaceableController } from "features/farming/hud/components/PlaceableController";
import { LandscapingChest } from "./components/LandscapingChest";
import { getChestItems } from "./components/inventory/utils/inventory";
import { getKeys } from "features/game/types/craftables";
import { CraftDecorationsModal } from "./components/decorations/CraftDecorationsModal";
import { CraftEquipmentModal } from "./components/equipment/CraftEquipmentModal";
import { pixelTabBorderMiddleStyle } from "features/game/lib/style";
import { CraftBuildingModal } from "./components/buildings/CraftBuildingModal";
import { ITEM_DETAILS } from "features/game/types/images";

const LandscapingHudComponent: React.FC<{ isFarming: boolean }> = () => {
  const { gameService, shortcutItem, selectedItem } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [showChest, setShowChest] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);
  const [showBuildings, setShowBuildings] = useState(false);

  const child = gameService.state.children.landscaping as MachineInterpreter;

  const [state, send] = useActor(child);

  const chestItems = getChestItems(gameState.context.state);
  return (
    <div
      data-html2canvas-ignore="true"
      aria-label="Hud"
      className="absolute z-40"
    >
      <Balance
        farmAddress={gameState.context.state.farmAddress as string}
        balance={gameState.context.state.balance}
      />
      <BlockBucks
        blockBucks={
          gameState.context.state.inventory["Block Buck"] ?? new Decimal(0)
        }
      />

      {state.matches({ editing: "idle" }) && (
        <>
          <div
            onClick={() => send("CANCEL")}
            className="fixed flex z-50 cursor-pointer hover:img-highlight"
            style={{
              marginLeft: `${PIXEL_SCALE * 2}px`,
              marginBottom: `${PIXEL_SCALE * 25}px`,
              width: `${PIXEL_SCALE * 22}px`,
              right: `${PIXEL_SCALE * 3}px`,
              top: `${PIXEL_SCALE * 38}px`,
            }}
          >
            <img
              src={SUNNYSIDE.ui.round_button}
              className="absolute"
              style={{
                width: `${PIXEL_SCALE * 22}px`,
              }}
            />
            <img
              src={SUNNYSIDE.icons.cancel}
              className="absolute"
              style={{
                top: `${PIXEL_SCALE * 5}px`,
                left: `${PIXEL_SCALE * 5}px`,
                width: `${PIXEL_SCALE * 12}px`,
              }}
            />
          </div>

          <div
            className="flex flex-col items-center fixed z-50"
            style={{
              right: `${PIXEL_SCALE * 1}px`,
              top: `${PIXEL_SCALE * 64}px`,
            }}
          >
            <Box isSelected image={SUNNYSIDE.icons.drag} />
          </div>
          <div className="fixed  bottom-2 w-full flex justify-center">
            <OuterPanel
              style={{
                bottom: `${PIXEL_SCALE * 2}px`,
              }}
              className="relative"
            >
              <div
                className={"bg-brown-600 flex items-center px-2 absolute"}
                style={{
                  ...pixelTabBorderMiddleStyle,
                  height: "30px",
                  top: "-30px",
                  left: "calc(50% - 45px)",
                }}
              >
                <img src={SUNNYSIDE.icons.hammer} className="h-4 mr-1" />
                <p className="text-xs">Build</p>
              </div>
              <div
                className="flex justify-center"
                style={{
                  height: `${PIXEL_SCALE * 24}px`,
                }}
              >
                <InnerPanel
                  className="relative p-2 flex items-center justify-center mr-2  cursor-pointer hover:bg-brown-200"
                  style={{
                    width: `${PIXEL_SCALE * 24}px`,
                  }}
                  onClick={() => setShowEquipment(true)}
                >
                  <img
                    src={scarecrow}
                    style={{
                      height: `${PIXEL_SCALE * 18}px`,
                    }}
                  />
                  <img
                    src={lightning}
                    className="absolute"
                    style={{
                      height: `${PIXEL_SCALE * 10}px`,
                      top: `${PIXEL_SCALE * -0.5}px`,
                      right: `${PIXEL_SCALE * -0.5}px`,
                    }}
                  />
                </InnerPanel>
                <InnerPanel
                  className="relative p-2 flex items-center justify-center mr-2  cursor-pointer hover:bg-brown-200"
                  style={{
                    width: `${PIXEL_SCALE * 24}px`,
                  }}
                  onClick={() => setShowBuildings(true)}
                >
                  <img
                    src={ITEM_DETAILS["Water Well"].image}
                    style={{
                      height: `${PIXEL_SCALE * 18}px`,
                    }}
                  />
                </InnerPanel>
                <InnerPanel
                  className="relative p-2 flex items-center justify-center mr-2 cursor-pointer hover:bg-brown-200"
                  style={{
                    width: `${PIXEL_SCALE * 24}px`,
                  }}
                  onClick={() => setShowDecorations(true)}
                >
                  <img src={bush} className="h-full" />
                </InnerPanel>
                <InnerPanel
                  className="relative p-2 flex items-center justify-center mr-2 cursor-pointer hover:bg-brown-200"
                  style={{
                    width: `${PIXEL_SCALE * 24}px`,
                  }}
                  onClick={() => setShowChest(true)}
                >
                  <Label
                    type="default"
                    className="px-0.5 text-xxs absolute -top-2 -right-2"
                  >
                    {getKeys(chestItems).reduce(
                      (acc, key) => acc + (chestItems[key]?.toNumber() ?? 0),
                      0
                    )}
                  </Label>
                  <img src={chest} className="h-full  " />
                </InnerPanel>
              </div>
            </OuterPanel>
          </div>
        </>
      )}

      <LandscapingChest
        state={gameState.context.state}
        onHide={() => setShowChest(false)}
        show={showChest}
        onPlace={(selected) => {
          child.send("SELECT", {
            action: placeEvent(selected),
            placeable: selected,
            multiple: true,
          });
        }}
      />

      <CraftDecorationsModal
        onHide={() => setShowDecorations(false)}
        show={showDecorations}
        state={gameState.context.state}
      />

      <CraftEquipmentModal
        onHide={() => setShowEquipment(false)}
        show={showEquipment}
        state={gameState.context.state}
      />

      <CraftBuildingModal
        onHide={() => setShowBuildings(false)}
        show={showBuildings}
        state={gameState.context.state}
      />

      <PlaceableController />
    </div>
  );
};

export const LandscapingHud = React.memo(LandscapingHudComponent);
