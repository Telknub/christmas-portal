import React, { useContext, useLayoutEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import * as Auth from "features/auth/lib/Provider";

import { useParams } from "react-router-dom";
import { WorldNavigation } from "./WorldNavigation";
import { GameProvider } from "features/game/GameProvider";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

export const World: React.FC = () => {
  const { authService } = useContext(Auth.Context);
  // catching and passing scroll container to keyboard listeners
  const [container, setContainer] = useState<HTMLElement>();
  const { id } = useParams();

  useLayoutEffect(() => {
    container?.scrollTo(400, container.scrollHeight);
  }, [container]);

  // Load data
  return (
    <GameProvider key={id}>
      {/* <ToastProvider> */}
      <ScrollContainer
        className="bg-green-500 overflow-scroll relative w-full h-full page-scroll-container"
        innerRef={(container) => setContainer(container as HTMLElement)}
        ignoreElements={"*[data-prevent-drag-scroll]"}
      >
        <div
          className="relative"
          style={{
            width: `${40 * GRID_WIDTH_PX}px`,
            height: `${40 * GRID_WIDTH_PX}px`,
          }}
          // TODO dynamic game board size based on tile dimensions
        >
          <WorldNavigation scrollContainer={container as HTMLElement} />
        </div>
      </ScrollContainer>
      {/* </ToastProvider> */}
    </GameProvider>
  );
};
