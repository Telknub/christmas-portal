import { getKeys } from "features/game/types/craftables";
import { GameState } from "features/game/types/game";
import { CONFIG } from "lib/config";

const defaultFeatureFlag = ({ inventory }: GameState) =>
  CONFIG.NETWORK === "mumbai" || !!inventory["Beta Pass"]?.gt(0);

const testnetFeatureFlag = () => CONFIG.NETWORK === "mumbai";
/*
 * How to Use:
 * Add the feature name to this list when working on a new feature.
 * When the feature is ready for public release, delete the feature from this list.
 *
 * Do not delete JEST_TEST.
 */
type FeatureName =
  | "JEST_TEST"
  | "PORTALS"
  | "RAFFLE"
  | "RETREAT"
  | "WORLD_MAP"
  | "EASTER"
  | "GOBLIN_EXCHANGE";

// Used for testing production features
export const ADMIN_IDS = [
  1, 2, 3, 39488, 1011, 45, 130170, 29, 7841, 51, 56, 73795, 21303, 2253,
  128015,
];

type FeatureFlag = (game: GameState) => boolean;

const featureFlags: Record<FeatureName, FeatureFlag> = {
  PORTALS: testnetFeatureFlag,
  JEST_TEST: defaultFeatureFlag,
  RAFFLE: defaultFeatureFlag,
  WORLD_MAP: (game) => {
    if (defaultFeatureFlag(game)) return true;

    const hasGoblinBud = getKeys(game.buds ?? {}).some(
      (id) => game.buds?.[id].type === "Retreat"
    );
    return !!hasGoblinBud;
  },
  RETREAT: (game) => {
    if (defaultFeatureFlag(game)) return true;

    const hasGoblinBud = getKeys(game.buds ?? {}).some(
      (id) => game.buds?.[id].type === "Retreat"
    );
    return !!hasGoblinBud;
  },
  EASTER: (game) => {
    // Event ended
    if (Date.now() > new Date("2024-04-05T00:00:00Z").getTime()) return false;

    if (defaultFeatureFlag(game)) return true;

    return Date.now() > new Date("2024-03-31T00:00:00Z").getTime();
  },
  GOBLIN_EXCHANGE: defaultFeatureFlag,
};

export const hasFeatureAccess = (game: GameState, featureName: FeatureName) => {
  return featureFlags[featureName](game);
};
