import React, { useState } from "react";
import { Button } from "components/ui/Button";
import { SUNNYSIDE } from "assets/sunnyside";
import { PIXEL_SCALE } from "features/game/lib/constants";

interface Props {
  onClose: () => void;
}

type Pages = 0 | 1;

export const Tutorial: React.FC<Props> = ({ onClose }) => {
  const [pageNumber, setPageNumber] = useState<Pages>(0);

  const PageOne = () => {
    return (
      <>
        <div className="space-y-3 text-sm px-2 mb-3">
          <p>
            This menu will show you the levels required to unlock new buildings.
          </p>
          <p className="mb-2">
            Some of these can be built multiple times once you reach a certain
            level.
          </p>
        </div>
        <Button onClick={() => setPageNumber(1)}>Next</Button>
      </>
    );
  };

  const PageTwo = () => {
    return (
      <>
        <div className="space-y-3 text-sm px-2 mb-3">
          <p>
            Buildings are an important way to progress through the game as they
            will help you to expand and evolve.
          </p>
          <p className="mb-2">
            Lets start by leveling up our Bumpkin so we can get the Workbench to
            learn about tools.
          </p>
        </div>
        <div className="flex space-x-1">
          <Button onClick={() => setPageNumber(0)}>Back</Button>
          <Button onClick={onClose}>Got it</Button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <img
          src={SUNNYSIDE.icons.hammer}
          className="my-2"
          style={{
            width: `${PIXEL_SCALE * 13}px`,
          }}
        />
      </div>
      {pageNumber === 0 && PageOne()}
      {pageNumber === 1 && PageTwo()}
    </>
  );
};
