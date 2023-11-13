import React, { SyntheticEvent, useContext, useState } from "react";
import { useActor } from "@xstate/react";
import Decimal from "decimal.js-light";

import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";

import { WorkbenchToolName, WORKBENCH_TOOLS } from "features/game/types/tools";
import { getKeys } from "features/game/types/craftables";
import { Restock } from "features/island/buildings/components/building/market/Restock";
import { SplitScreenView } from "components/ui/SplitScreenView";
import { CraftingRequirements } from "components/ui/layouts/CraftingRequirements";
import { makeBulkBuyAmount } from "../../market/lib/makeBulkBuyAmount";
import { gameAnalytics } from "lib/gameAnalytics";

interface Props {
  onClose: (e?: SyntheticEvent) => void;
}

export const Tools: React.FC<Props> = ({ onClose }) => {
  const [selectedName, setSelectedName] = useState<WorkbenchToolName>("Axe");
  const { gameService, shortcutItem } = useContext(Context);

  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const selected = WORKBENCH_TOOLS()[selectedName];
  const inventory = state.inventory;

  const price = selected.sfl;

  const lessIngredients = (amount = 1) =>
    getKeys(selected.ingredients).some((name) =>
      selected.ingredients[name]?.mul(amount).greaterThan(inventory[name] || 0)
    );

  const lessFunds = (amount = 1) => {
    if (!price) return;

    return state.balance.lessThan(price.mul(amount));
  };

  const onToolClick = (toolName: WorkbenchToolName) => {
    setSelectedName(toolName);
    shortcutItem(toolName);
  };

  const craft = (event: SyntheticEvent, amount: number) => {
    event.stopPropagation();
    const state = gameService.send("tool.crafted", {
      tool: selectedName,
      amount,
    });

    if (state.context.state.bumpkin?.activity?.["Axe Crafted"] === 1) {
      gameAnalytics.trackMilestone({
        event: "Tutorial:AxeCrafted:Completed",
      });
    }

    shortcutItem(selectedName);
  };

  const stock = state.stock[selectedName] || new Decimal(0);

  const bulkToolCraftAmount = makeBulkBuyAmount(stock);

  const Action = () => {
    if (stock.equals(0)) {
      return <Restock onClose={onClose}></Restock>;
    }

    return (
      <div className="flex space-x-1 sm:space-x-0 sm:space-y-1 sm:flex-col w-full">
        <Button
          disabled={lessFunds() || lessIngredients() || stock.lessThan(1)}
          onClick={(e) => craft(e, 1)}
        >
          Craft 1
        </Button>
        {bulkToolCraftAmount > 1 && (
          <Button
            disabled={
              lessFunds(bulkToolCraftAmount) ||
              lessIngredients(bulkToolCraftAmount)
            }
            onClick={(e) => craft(e, bulkToolCraftAmount)}
          >
            Craft {bulkToolCraftAmount}
          </Button>
        )}
      </div>
    );
  };

  return (
    <SplitScreenView
      panel={
        <CraftingRequirements
          gameState={state}
          stock={stock}
          details={{
            item: selectedName,
          }}
          requirements={{
            sfl: price,
            resources: selected.ingredients,
          }}
          actionView={Action()}
        />
      }
      content={
        <>
          {getKeys(WORKBENCH_TOOLS()).map((toolName) => (
            <Box
              isSelected={selectedName === toolName}
              key={toolName}
              onClick={() => onToolClick(toolName)}
              image={ITEM_DETAILS[toolName].image}
              count={inventory[toolName]}
            />
          ))}
        </>
      }
    />
  );
};
