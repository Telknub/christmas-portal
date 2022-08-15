import Decimal from "decimal.js-light";
import { INITIAL_FARM } from "../lib/constants";
import { buyWarBonds } from "./buyWarBonds";

describe("buyWarBonds", () => {
  it("requires an offer is available", () => {
    expect(() =>
      buyWarBonds({
        state: {
          ...INITIAL_FARM,
          warCollectionOffer: undefined,
        },
        action: { type: "warBonds.bought" },
      })
    ).toThrow("No war bonds available");
  });

  it("requires player has ingredients", () => {
    expect(() =>
      buyWarBonds({
        state: {
          ...INITIAL_FARM,
          inventory: {
            Wood: new Decimal(15),
          },
          warCollectionOffer: {
            endAt: new Date(Date.now() + 1000).toISOString(),
            startAt: new Date().toISOString(),
            ingredients: [
              {
                amount: 20,
                name: "Wood",
              },
            ],
            warBonds: 20,
          },
        },
        action: { type: "warBonds.bought" },
      })
    ).toThrow("Insufficient ingredient: Wood");
  });

  it("exchanges war bonds & subtracts ingredients", () => {
    const state = buyWarBonds({
      state: {
        ...INITIAL_FARM,
        inventory: {
          Wood: new Decimal(25),
          Sunflower: new Decimal(5),
          "War Bond": new Decimal(2),
        },
        warCollectionOffer: {
          endAt: new Date(Date.now() + 1000).toISOString(),
          startAt: new Date().toISOString(),
          ingredients: [
            {
              amount: 20,
              name: "Wood",
            },
          ],
          warBonds: 12,
        },
      },
      action: { type: "warBonds.bought" },
    });

    expect(state.inventory).toEqual({
      Wood: new Decimal(5),
      Sunflower: new Decimal(5),
      "War Bond": new Decimal(14),
      "Goblin War Point": new Decimal(12),
    });
  });

  it("exchanges multiple war bonds", () => {
    let state = buyWarBonds({
      state: {
        ...INITIAL_FARM,
        inventory: {
          Wood: new Decimal(100),
          Sunflower: new Decimal(5),
          "War Bond": new Decimal(2),
        },
        warCollectionOffer: {
          endAt: new Date(Date.now() + 1000).toISOString(),
          startAt: new Date().toISOString(),
          ingredients: [
            {
              amount: 20,
              name: "Wood",
            },
          ],
          warBonds: 12,
        },
      },
      action: { type: "warBonds.bought" },
    });

    state = buyWarBonds({
      state,
      action: { type: "warBonds.bought" },
    });

    expect(state.inventory).toEqual({
      Wood: new Decimal(60),
      Sunflower: new Decimal(5),
      "War Bond": new Decimal(26),
      "Goblin War Point": new Decimal(24),
    });
  });

  it("mints goblin war points", () => {
    const state = buyWarBonds({
      state: {
        ...INITIAL_FARM,
        inventory: {
          Wood: new Decimal(100),
          "Goblin War Point": new Decimal(5),
        },
        warCollectionOffer: {
          endAt: new Date(Date.now() + 1000).toISOString(),
          startAt: new Date().toISOString(),
          ingredients: [
            {
              amount: 20,
              name: "Wood",
            },
          ],
          warBonds: 12,
        },
      },
      action: { type: "warBonds.bought" },
    });

    expect(state.inventory["Goblin War Point"]).toEqual(new Decimal(17));
  });

  it.todo("mints human war points");
});
