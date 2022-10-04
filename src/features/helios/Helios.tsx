import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import React, { useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import background from "assets/land/helios.png";
import { GameProvider } from "features/game/GameProvider";
import { ToastProvider } from "features/game/toast/ToastQueueProvider";
import waterMovement from "assets/decorations/water_movement.png";
import { HeliosCakeStall } from "./components/cakeStall/HeliosCakeStall";
import { Decorations } from "./components/decorations/Decorations";
import { Fertilisers } from "./components/fertilisers/Fertilisers";
import { FarmersMarket } from "./components/farmersMarket/FarmersMarket";
import { HeliosSunflower } from "./components/HeliosSunflower";
import { HeliosBlacksmith } from "./components/blacksmith/HeliosBlacksmith";

export const Helios: React.FC = () => {
  const container = useRef(null);

  const [scrollIntoView] = useScrollIntoView();

  useEffect(() => {
    // Start with crops centered
    scrollIntoView(Section.Merchant, "auto");
  }, [scrollIntoView]);

  // Load data
  return (
    <GameProvider>
      <ToastProvider>
        <ScrollContainer
          className="relative w-full h-full bg-[#0099db] overflow-scroll"
          innerRef={container}
        >
          <div
            className="relative flex"
            style={{
              width: `${40 * GRID_WIDTH_PX}px`,
              height: `${40 * GRID_WIDTH_PX}px`,
            }}
          >
            <img
              src={background}
              className="absolute inset-0 w-full h-full z-10"
            />
            <Decorations />
            <HeliosCakeStall />
            <HeliosBlacksmith />
            <Fertilisers />
            <FarmersMarket />
            <HeliosSunflower />
          </div>
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              width: `${80 * GRID_WIDTH_PX}px`,
              height: `${80 * GRID_WIDTH_PX}px`,
              backgroundImage: `url(${waterMovement})`,
              backgroundSize: "400px",
              imageRendering: "pixelated",
            }}
          />
        </ScrollContainer>
      </ToastProvider>
    </GameProvider>
  );
};
