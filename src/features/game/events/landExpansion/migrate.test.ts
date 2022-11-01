import Decimal from "decimal.js-light";
import { INITIAL_FARM } from "features/game/lib/constants";
import { GameState } from "features/game/types/game";
import { migrate } from "./migrate";

const GAME_STATE: GameState = { ...INITIAL_FARM, inventory: {} };

describe("Migrate", () => {
  it("requires player to have at least 10.000 XP", () => {
    expect(() =>
      migrate({
        state: {
          ...GAME_STATE,
          skills: { farming: new Decimal(1), gathering: new Decimal(1) },
          inventory: { Warrior: new Decimal(0) },
        },
        action: { type: "game.migrated" },
      })
    ).toThrow("You don't meet the requirements for migrating");
  });

  it("requires player to have the Warrior Badge", () => {
    expect(() =>
      migrate({
        state: {
          ...GAME_STATE,
          inventory: { Warrior: new Decimal(0) },
        },
        action: { type: "game.migrated" },
      })
    ).toThrow("You don't meet the requirements for migrating");
  });

  it("requires player to have the Moderator Badge", () => {
    expect(() =>
      migrate({
        state: {
          ...GAME_STATE,
          inventory: { "Discord Mod": new Decimal(0), Warrior: new Decimal(0) },
          skills: { farming: new Decimal(1), gathering: new Decimal(1) },
        },
        action: { type: "game.migrated" },
      })
    ).toThrow("You don't meet the requirements for migrating");
  });

  it("requires player to have the Coder Badge", () => {
    expect(() =>
      migrate({
        state: {
          ...GAME_STATE,
          inventory: {
            "Discord Mod": new Decimal(0),
            Warrior: new Decimal(0),
            Coder: new Decimal(0),
          },
          skills: { farming: new Decimal(1), gathering: new Decimal(1) },
        },
        action: { type: "game.migrated" },
      })
    ).toThrow("You don't meet the requirements for migrating");
  });

  it("migrates a player that has enough XP", () => {
    const result = migrate({
      state: {
        ...GAME_STATE,
        skills: { farming: new Decimal(5000), gathering: new Decimal(5000) },
      },
      action: { type: "game.migrated" },
    });

    expect(result.migrated).toBe(true);
  });

  it("migrates a player that has Warrior Badge", () => {
    const result = migrate({
      state: {
        ...GAME_STATE,
        inventory: { Warrior: new Decimal(1) },
      },
      action: { type: "game.migrated" },
    });

    expect(result.migrated).toBe(true);
  });

  it("migrates a player that has Moderator Badge", () => {
    const result = migrate({
      state: {
        ...GAME_STATE,
        inventory: { "Discord Mod": new Decimal(1) },
      },
      action: { type: "game.migrated" },
    });

    expect(result.migrated).toBe(true);
  });

  it("migrates a player that has Coder Badge", () => {
    const result = migrate({
      state: {
        ...GAME_STATE,
        inventory: { Coder: new Decimal(1) },
      },
      action: { type: "game.migrated" },
    });

    expect(result.migrated).toBe(true);
  });
});
