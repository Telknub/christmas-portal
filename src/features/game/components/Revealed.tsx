import React, { useContext } from "react";
import { useActor } from "@xstate/react";

import token from "assets/icons/token_2.png";
import { Button } from "components/ui/Button";

import { Context } from "../GameProvider";
import { getKeys } from "../types/craftables";
import { ITEM_DETAILS } from "../types/images";
import { InventoryItemName } from "../types/game";
import { setImageWidth } from "lib/images";
import { Label } from "components/ui/Label";

export const Revealed: React.FC<{
  onAcknowledged?: () => void;
  id?: string;
}> = ({ onAcknowledged, id }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const handleAcknowledge = () => {
    gameService.send({ type: "CONTINUE", id });
    if (onAcknowledged) onAcknowledged();
  };

  const items = getKeys(gameState.context.revealed?.inventory ?? {});
  const sfl = Number(gameState.context.revealed?.balance ?? 0);

  const streaks = gameState.context.state.dailyRewards.streaks ?? 1;
  const streakBonus = streaks % 5 == 0;

  return (
    <>
      <div className="flex flex-col items-center p-2">
        <p className="text-center text-base mb-3">Congratulations!</p>

        {streakBonus && (
          <Label type="info" className="px-0.5 text-sm">
            3x streak bonus
          </Label>
        )}
        {items.length > 0 && (
          <>
            <div className="flex flex-col items-center mt-2">
              {/* Images */}
              <div className="flex flex-wrap justify-center items-center mb-2 space-x-2 mt-1">
                {sfl > 0 && (
                  <img
                    src={token}
                    className="mb-2"
                    onLoad={(e) => setImageWidth(e.currentTarget)}
                  />
                )}

                {items.map((name, index) => (
                  <img
                    key={`${name}-${index}`}
                    src={ITEM_DETAILS[name as InventoryItemName].image}
                    className="mb-2"
                    onLoad={(e) => setImageWidth(e.currentTarget)}
                    style={{
                      opacity: 0,
                    }}
                  />
                ))}
              </div>

              {/* Text*/}
              <div>
                <p className="text-center text-sm mb-2">You found</p>
                {sfl > 0 && (
                  <p className="text-center text-sm mb-2">{`${sfl} SFL`}</p>
                )}
                {items.map((name, index) => (
                  <p
                    key={`${name}-${index}`}
                    className="text-center text-sm mb-2"
                  >{`${gameState.context.revealed?.inventory[name]} x ${name}`}</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Button onClick={handleAcknowledge}>Continue</Button>
    </>
  );
};
