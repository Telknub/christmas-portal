import { getKeys } from "../types/craftables";
import { GameState } from "../types/game";
import { GoblinState } from "./goblinMachine";
import { getBumpkinLevel } from "./level";

/**
 * Whether the crafting requirements are met.
 * @param gameState The game state.
 * @param requirements The crafting requirements.
 */
export const craftingRequirementsMet = (
  gameState: Readonly<GameState | GoblinState>,
  requirements: GameState["expansionRequirements"]
) => {
  if (!requirements) {
    return false;
  }

  const hasResources = getKeys(requirements.resources).every((name) =>
    gameState.inventory[name]?.gte(requirements.resources[name] ?? 0)
  );

  const hasLevel = requirements.bumpkinLevel
    ? getBumpkinLevel(gameState.bumpkin?.experience || 0) >=
      (requirements.bumpkinLevel ?? 0)
    : !!gameState.bumpkin;
  const canCraft = hasResources && hasLevel;
  return canCraft;
};
