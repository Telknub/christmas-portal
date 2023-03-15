import Decimal from "decimal.js-light";
import { GoblinState } from "features/game/lib/goblinMachine";
import { getBumpkinLevel } from "features/game/lib/level";
import { getKeys, Ingredient } from "features/game/types/craftables";
import { GameState } from "features/game/types/game";
import React from "react";
import { RequirementLabel } from "../RequirementsLabel";

/**
<<<<<<< HEAD
=======
 * The props for the component.
 * @param gameState The game state.
 * @param details The expansion details.
 * @param requirements The expansion requirement.
 * @param actionView The view for displaying the expansion action.
 */
interface Props {
  gameState: GameState | GoblinState;
  details: DetailsProps;
  requirements?: GameState["expansionRequirements"];
  actionView?: JSX.Element;
}

/**
>>>>>>> 60f566d3 (improvements)
 * The props for the details.
 * @param title The title.
 * @param description The description.
 */
interface DetailsProps {
  title: string;
  description: string;
}

/**
 * The props for the crafting requirements.
 * @param resources The item resources requirements.
 * @param sfl The SFL requirements.
 * @param level The level requirements.
 * @param timeSeconds The wait time in seconds for crafting the item.
 */
interface RequirementsProps {
  resources?: Ingredient[];
  sfl?: Decimal;
  level?: number;
  timeSeconds?: number;
}

/**
 * The props for the component.
 * @param gameState The game state.
 * @param details The expansion details.
 * @param requirements The expansion requirement.
 * @param actionView The view for displaying the expansion action.
 */
interface Props {
  gameState: GameState | GoblinState;
  details: DetailsProps;
  requirements?: RequirementsProps;
  actionView?: JSX.Element;
}

/**
 * The view for displaying expansion details, requirements and action.
 * @props The component props.
 */
export const ExpansionRequirements: React.FC<Props> = ({
  gameState,
  details,
  requirements,
  actionView,
}: Props) => {
  const getItemDetail = () => {
    const title = details.title;
    const description = details.description;

    return (
      <>
        <div className="flex space-x-2 justify-start mb-1 items-center sm:flex-col-reverse md:space-x-0">
          <span className="sm:text-center">{title}</span>
        </div>
        <span className="text-xs mt-1 whitespace-pre-line sm:text-center">
          {description}
        </span>
      </>
    );
  };

  const getRequirements = () => {
    if (!requirements) return <></>;

    return (
      <div className="border-t border-white w-full my-2 pt-2 flex justify-between gap-x-3 gap-y-2 flex-wrap sm:flex-col sm:items-center sm:flex-nowrap">
        {/* Item ingredients requirements */}
        {getKeys(requirements.resources)?.map((name, index) => {
          return (
            <RequirementLabel
              key={index}
              type="item"
              item={name}
              balance={gameState.inventory[name] ?? new Decimal(0)}
              requirement={new Decimal(requirements.resources[name] ?? 0)}
            />
          );
        })}

        {/* Level requirement */}
        {!!requirements.bumpkinLevel && (
          <RequirementLabel
            type="level"
            currentLevel={getBumpkinLevel(gameState.bumpkin?.experience ?? 0)}
            requirement={requirements.bumpkinLevel}
          />
        )}

        {/* Time requirement display */}
        {!!requirements.seconds && (
          <RequirementLabel type="time" waitSeconds={requirements.seconds} />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center px-1 py-0">
        {getItemDetail()}
        {getRequirements()}
      </div>
      {actionView}
    </div>
  );
};
