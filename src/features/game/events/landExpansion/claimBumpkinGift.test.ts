import { TEST_FARM } from "features/game/lib/constants";
import { claimGift } from "./claimBumpkinGift";
import Decimal from "decimal.js-light";

describe("claimBumpkinGift", () => {
  it("requires a bumpkin exists", () => {
    expect(() =>
      claimGift({
        action: {
          bumpkin: "craig",
          type: "gift.claimed",
        },
        state: TEST_FARM,
      })
    ).toThrow("Bumpkin does not exist");
  });

  it("requires a bumpkin has its first gift ready", () => {
    expect(() =>
      claimGift({
        action: {
          bumpkin: "pumpkin' pete",
          type: "gift.claimed",
        },
        state: {
          ...TEST_FARM,
          npcs: {
            "pumpkin' pete": {
              deliveryCount: 0,
              friendship: {
                points: 8,
                updatedAt: 100002000,
              },
            },
          },
        },
      })
    ).toThrow("Friendship is not strong enough");
  });

  it("requires a bumpkin has not already claimed the gift", () => {
    const state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state: {
        ...TEST_FARM,
        npcs: {
          "pumpkin' pete": {
            deliveryCount: 0,
            friendship: {
              points: 12,
              updatedAt: 100002000,
            },
          },
        },
      },
    });

    expect(
      state.npcs?.["pumpkin' pete"]?.friendship?.giftClaimedAtPoints
    ).toEqual(10);

    expect(() =>
      claimGift({
        action: {
          bumpkin: "pumpkin' pete",
          type: "gift.claimed",
        },
        state,
      })
    ).toThrow("Friendship is not strong enough");
  });

  it("claims a gift of items", () => {
    const state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state: {
        ...TEST_FARM,
        npcs: {
          "pumpkin' pete": {
            deliveryCount: 0,
            friendship: {
              points: 12,
              updatedAt: 100002000,
              giftClaimedAtPoints: 0,
            },
          },
        },
      },
    });

    expect(
      state.npcs?.["pumpkin' pete"]?.friendship?.giftClaimedAtPoints
    ).toEqual(10);
    expect(state.inventory["Block Buck"]).toEqual(new Decimal(1));
  });

  it("claims a gift of wearables", () => {
    const state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state: {
        ...TEST_FARM,
        npcs: {
          "pumpkin' pete": {
            deliveryCount: 0,
            friendship: {
              points: 32,
              updatedAt: 100002000,
              giftClaimedAtPoints: 10,
            },
          },
        },
      },
    });

    expect(
      state.npcs?.["pumpkin' pete"]?.friendship?.giftClaimedAtPoints
    ).toEqual(25);
    expect(state.wardrobe["Pumpkin Hat"]).toEqual(1);
  });

  it("claims a gift of sfl", () => {
    const state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state: {
        ...TEST_FARM,
        npcs: {
          "pumpkin' pete": {
            deliveryCount: 0,
            friendship: {
              points: 50,
              updatedAt: 100002000,
              giftClaimedAtPoints: 25,
            },
          },
        },
      },
    });

    expect(
      state.npcs?.["pumpkin' pete"]?.friendship?.giftClaimedAtPoints
    ).toEqual(50);
    expect(state.balance).toEqual(new Decimal(5));
  });

  it("claims multiple gifts", () => {
    // Items
    let state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state: {
        ...TEST_FARM,
        npcs: {
          "pumpkin' pete": {
            deliveryCount: 0,
            friendship: {
              points: 1000, // Multiple stacked up
              updatedAt: 100002000,
              giftClaimedAtPoints: 0,
            },
          },
        },
      },
    });

    // Hat
    state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state,
    });

    // SFL
    state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state,
    });

    // Bonus
    state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state,
    });

    // Bonus
    state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state,
    });

    expect(
      state.npcs?.["pumpkin' pete"]?.friendship?.giftClaimedAtPoints
    ).toEqual(150);

    expect(state.inventory["Block Buck"]).toEqual(new Decimal(3));
    expect(state.wardrobe["Pumpkin Hat"]).toEqual(1);
    expect(state.balance).toEqual(new Decimal(5));
  });

  it("requires player has points for bonus gift", () => {
    expect(() =>
      claimGift({
        action: {
          bumpkin: "pumpkin' pete",
          type: "gift.claimed",
        },
        state: {
          ...TEST_FARM,
          npcs: {
            "pumpkin' pete": {
              deliveryCount: 0,
              friendship: {
                points: 30,
                updatedAt: 100002000,
                giftClaimedAtPoints: 25,
              },
            },
          },
        },
      })
    ).toThrow("Friendship is not strong enough");
  });

  it("claims a bonus gift once all have been claimed", () => {
    const state = claimGift({
      action: {
        bumpkin: "pumpkin' pete",
        type: "gift.claimed",
      },
      state: {
        ...TEST_FARM,
        npcs: {
          "pumpkin' pete": {
            deliveryCount: 0,
            friendship: {
              points: 100,
              updatedAt: 100002000,
              giftClaimedAtPoints: 50,
            },
          },
        },
      },
    });

    expect(
      state.npcs?.["pumpkin' pete"]?.friendship?.giftClaimedAtPoints
    ).toEqual(100);

    expect(state.inventory["Block Buck"]).toEqual(new Decimal(1));
  });
});
