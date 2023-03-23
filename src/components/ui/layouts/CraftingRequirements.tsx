import Decimal from "decimal.js-light";
import { INITIAL_STOCK } from "features/game/lib/constants";
import { GoblinState } from "features/game/lib/goblinMachine";
import { getBumpkinLevel } from "features/game/lib/level";
import { Ingredient } from "features/game/types/craftables";
import { GameState, InventoryItemName } from "features/game/types/game";
import { ITEM_DETAILS } from "features/game/types/images";
import React from "react";
import { Label } from "../Label";
import { RequirementLabel } from "../RequirementsLabel";
import { SquareIcon } from "../SquareIcon";

/**
 * The props for the details for items.
 * @param type The type is item.
 * @param item The item.
 * @param quantity The item quantity. Leave it undefined if quantity is not displayed.
 */
interface ItemDetailsProps {
  item: InventoryItemName;
  quantity?: Decimal;
}

/**
 * The props for harvests requirement label.
 * @param minHarvest The minimum number of harvests.
 * @param maxHarvest The maximum number of harvests.
 */
interface HarvestsRequirementProps {
  minHarvest: number;
  maxHarvest: number;
}

/**
 * The props for the crafting requirements.
 * @param resources The item resources requirements.
 * @param sfl The SFL requirements.
 * @param showSflIfFree Whether to show free SFL requirement if SFL cost is 0. Defaults to false.
 * @param harvests The min/max harvests for the item.
 * @param xp The XP gained for consuming the item.
 * @param timeSeconds The wait time in seconds for crafting the item.
 * @param level The level requirements.
 */
interface RequirementsProps {
  resources?: Ingredient[];
  sfl?: Decimal;
  showSflIfFree?: boolean;
  harvests?: HarvestsRequirementProps;
  xp?: Decimal;
  timeSeconds?: number;
  level?: number;
}

/**
 * The props for the component.
 * @param gameState The game state.
 * @param stock The stock of the item available to craft.  Undefined if the stock is unlimited.
 * @param isLimitedItem true if the item quantity is limited to a certain number in the blockchain, else false. Defaults to false.
 * @param details The item details.
 * @param boosts The available boosts of the item.
 * @param requirements The item quantity requirement.
 * @param actionView The view for displaying the crafting action.
 */
interface Props {
  gameState: GameState | GoblinState;
  stock?: Decimal;
  isLimitedItem?: boolean;
  details: ItemDetailsProps;
  boosts?: string[];
  requirements?: RequirementsProps;
  actionView?: JSX.Element;
}

/**
 * The view for displaying item name, details, crafting requirements and action.
 * @props The component props.
 */
export const CraftingRequirements: React.FC<Props> = ({
  gameState,
  stock,
  isLimitedItem = false,
  details,
  boosts = [],
  requirements,
  actionView,
}: Props) => {
  const getStock = () => {
    if (!stock) return <></>;

    if (stock.lessThanOrEqualTo(0)) {
      return (
        <div className="flex justify-center mt-0 sm:mb-1">
          <Label type="danger">Sold out</Label>
        </div>
      );
    }

    const inventoryCount = gameState.inventory[details.item] ?? new Decimal(0);
    const limit = INITIAL_STOCK(gameState)[details.item];
    const isInventoryFull =
      limit === undefined ? false : inventoryCount.greaterThan(limit);

    return (
      <div className="flex justify-center mt-0 sm:mb-1">
        <Label type={isInventoryFull ? "danger" : "info"}>
          {`${stock} ${isLimitedItem ? "left" : "in stock"}`}
        </Label>
      </div>
    );
  };

  const getItemDetail = () => {
    const item = ITEM_DETAILS[details.item];
    const icon = item.image;
    const title = details.quantity
      ? `${details.quantity} x ${details.item}`
      : details.item;
    const description = item.description;

    return (
      <>
        <div className="flex space-x-2 justify-start items-center sm:flex-col-reverse md:space-x-0">
          {icon && (
            <div className="sm:mt-2">
              <SquareIcon icon={icon} width={14} />
            </div>
          )}
          <span className="sm:text-center">{title}</span>
        </div>
        <span className="text-xs sm:mt-1 whitespace-pre-line sm:text-center">
          {description}
        </span>
      </>
    );
  };

  const getBoosts = () => {
    if (!boosts) return <></>;

    return (
      <div className="flex flex-col space-y-1 mt-2">
        {boosts.map((boost, index) => {
          return (
            <div key={index} className="flex justify-start sm:justify-center">
              <Label type="info">{boost}</Label>
            </div>
          );
        })}
      </div>
    );
  };

  const getRequirements = () => {
    if (!requirements) return <></>;

    return (
      <div className="border-t border-white w-full my-2 pt-2 flex justify-between gap-x-3 gap-y-2 flex-wrap sm:flex-col sm:items-center sm:flex-nowrap">
        {/* Item ingredients requirements */}
        {requirements.resources?.map((ingredient, index) => {
          return (
            <RequirementLabel
              key={index}
              type="item"
              item={ingredient.item}
              balance={gameState.inventory[ingredient.item] ?? new Decimal(0)}
              requirement={ingredient.amount}
            />
          );
        })}

        {/* SFL requirement */}
        {!!requirements.sfl &&
          (requirements.sfl.greaterThan(0) || requirements.showSflIfFree) && (
            <RequirementLabel
              type="sfl"
              balance={gameState.balance}
              requirement={requirements.sfl}
            />
          )}

        {/* Harvests display */}
        {!!requirements.harvests && (
          <RequirementLabel
            type="harvests"
            minHarvest={requirements.harvests.minHarvest}
            maxHarvest={requirements.harvests.maxHarvest}
          />
        )}

        {/* XP display */}
        {!!requirements.xp && (
          <RequirementLabel type="xp" xp={requirements.xp} />
        )}

        {/* Time requirement display */}
        {!!requirements.timeSeconds && (
          <RequirementLabel
            type="time"
            waitSeconds={requirements.timeSeconds}
          />
        )}

        {/* Level requirement */}
        {!!requirements.level && (
          <RequirementLabel
            type="level"
            currentLevel={getBumpkinLevel(gameState.bumpkin?.experience ?? 0)}
            requirement={requirements.level}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center px-1 py-0">
        {getStock()}
        {getItemDetail()}
        {getBoosts()}
        {getRequirements()}
      </div>
      {actionView}
    </div>
  );
};
