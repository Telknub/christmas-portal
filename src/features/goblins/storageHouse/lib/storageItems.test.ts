import "lib/__mocks__/configMock";
import Decimal from "decimal.js-light";
import { getBankItems, getDeliverableItems } from "./storageItems";

describe("getDeliverableItems", () => {
  it("includes crops", () => {
    const filtered = getDeliverableItems({
      Sunflower: new Decimal(1),
      Radish: new Decimal(10.2),
      "Chicken Coop": new Decimal(1),
    });

    expect(filtered).toEqual({
      Sunflower: new Decimal(1),
      Radish: new Decimal(10.2),
    });
  });

  it("includes fruits", () => {
    const filtered = getDeliverableItems({
      Apple: new Decimal(5),
      Orange: new Decimal(2),
      Blueberry: new Decimal(3),
      Kuebiko: new Decimal(1),
    });

    expect(filtered).toEqual({
      Apple: new Decimal(5),
      Orange: new Decimal(2),
      Blueberry: new Decimal(3),
    });
  });

  it("includes natural resources", () => {
    const filtered = getDeliverableItems({
      Wood: new Decimal(100),
      Gold: new Decimal(15),
    });

    expect(filtered).toEqual({
      Wood: new Decimal(100),
      Gold: new Decimal(15),
    });
  });

  it("filters out chickens", () => {
    const filtered = getDeliverableItems({
      Chicken: new Decimal(20),
      Beetroot: new Decimal(100),
    });

    expect(filtered).toEqual({
      Beetroot: new Decimal(100),
    });
  });

  it("excludes rare items", () => {
    const filtered = getDeliverableItems({
      Wood: new Decimal(100),
      Gold: new Decimal(15),
      "Farm Cat": new Decimal(1),
      Coder: new Decimal(1),
      "Sunflower Cake": new Decimal(1),
      "Potato Seed": new Decimal(55),
      Potato: new Decimal(500),
    });

    expect(filtered).toEqual({
      Wood: new Decimal(100),
      Gold: new Decimal(15),
      Potato: new Decimal(500),
    });
  });
});

describe("getBankItems", () => {
  it("filters out crops", () => {
    const filtered = getBankItems({
      Sunflower: new Decimal(1),
      Radish: new Decimal(10.2),
      "Chicken Coop": new Decimal(1),
    });

    expect(filtered).toEqual({
      "Chicken Coop": new Decimal(1),
    });
  });

  it("filters out fruits", () => {
    const filtered = getBankItems({
      Apple: new Decimal(1),
      Orange: new Decimal(2),
      Blueberry: new Decimal(3),
      Kuebiko: new Decimal(1),
    });

    expect(filtered).toEqual({
      Kuebiko: new Decimal(1),
    });
  });

  it("filters out natural resources", () => {
    const filtered = getBankItems({
      Wood: new Decimal(100),
      Gold: new Decimal(15),
    });

    expect(filtered).toEqual({});
  });

  it("include rare items", () => {
    const filtered = getBankItems({
      Wood: new Decimal(100),
      Gold: new Decimal(15),
      "Farm Cat": new Decimal(1),
      Coder: new Decimal(1),
      "Sunflower Cake": new Decimal(1),
      "Potato Seed": new Decimal(55),
      Potato: new Decimal(500),
    });

    expect(filtered).toEqual({
      "Farm Cat": new Decimal(1),
      Coder: new Decimal(1),
      "Sunflower Cake": new Decimal(1),
      "Potato Seed": new Decimal(55),
    });
  });
});
