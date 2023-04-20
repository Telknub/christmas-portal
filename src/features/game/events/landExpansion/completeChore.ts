import Decimal from "decimal.js-light";
import { trackActivity } from "features/game/types/bumpkinActivity";
import { CHORES } from "features/game/types/chores";
import { getKeys } from "features/game/types/craftables";
import { GameState } from "features/game/types/game";
import { getProgress } from "features/helios/components/hayseedHank/lib/HayseedHankTask";
import { CONFIG } from "lib/config";
import { analytics } from "lib/analytics";
import cloneDeep from "lodash.clonedeep";
import { startChore } from "./startChore";

export type CompleteChoreAction = {
  type: "chore.completed";
};

type Options = {
  state: Readonly<GameState>;
  action: CompleteChoreAction;
  createdAt?: number;
};

const clone = (state: GameState): GameState => {
  return cloneDeep(state);
};

export function completeChore({
  state,
  createdAt = Date.now(),
}: Options): GameState {
  let game = clone(state);

  if (!game.bumpkin) {
    throw new Error("No Bumpkin Found");
  }

  if (!game.hayseedHank.progress) {
    throw new Error("Chore has not started");
  }

  if (game.bumpkin.id !== game.hayseedHank.progress?.bumpkinId) {
    throw new Error("Not the same Bumpkin");
  }

  const activity = game.hayseedHank.chore.activity;

  const progress = getProgress(game);

  if (progress < game.hayseedHank.chore.requirement) {
    throw new Error("Chore is not completed");
  }

  // Add rewards
  getKeys(game.hayseedHank.chore.reward.items ?? {}).forEach((name) => {
    const previous = game.inventory[name] ?? new Decimal(0);
    game.inventory[name] = previous.add(
      game.hayseedHank.chore.reward.items?.[name] ?? 0
    );
  });

  const choreIndex = (game.hayseedHank.choresCompleted + 1) % CHORES.length;
  const nextChore = CHORES[choreIndex + 1];

  // Front-end testing only - real chore is hidden as a surpise on the backend
  if (!CONFIG.API_URL) {
    game.hayseedHank.chore = nextChore;
  }

  game.hayseedHank.choresCompleted += 1;
  delete game.hayseedHank.progress;

  // Increment activity
  game.bumpkin.activity = trackActivity(
    "Chore Completed",
    game.bumpkin.activity
  );

  if (game.hayseedHank.choresCompleted === 1) {
    game.conversations.push("betty-intro");
  }

  if (game.hayseedHank.choresCompleted === 2) {
    game.conversations.push("bruce-intro");
  }

  if (game.hayseedHank.choresCompleted === 3) {
    game.conversations.push("blacksmith-intro");
  }

  if (game.hayseedHank.choresCompleted === 4) {
    // TODO - once scarecrow gets crafted
    // game.conversations.push("hank-crafting");
  }

  /* TODO
    1. Betty's Water Well Conversation
    2. Job Board Conversation
    2. Kitchen Conversation
    3. Hen House Conversation
    4. Fruit Conversation
  */

  // Automatically start next chore
  if (!CONFIG.API_URL) {
    game = startChore({
      state: game,
      action: {
        type: "chore.started",
      },
    });
  }

  analytics.logEvent("chore_complete", {
    choreIndex,
  });

  return game;
}
