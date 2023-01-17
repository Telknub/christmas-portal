import "lib/__mocks__/configMock";
import Decimal from "decimal.js-light";
import { hasFeatureAccess } from "./flags";

import * as config from "./config";

describe("hasFeatureAccess", () => {
  const spy = jest.spyOn((config as any).default, "CONFIG", "get");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns true for a beta feature if the player has a beta pass", () => {
    spy.mockReturnValue({ NETWORK: "mainnet" });
    expect(hasFeatureAccess({ "Beta Pass": new Decimal(1) }, "JEST_TEST")).toBe(
      true
    );
  });

  it("returns false for a beta feature if the player does not have a beta pass", () => {
    spy.mockReturnValue({ NETWORK: "mainnet" });
    expect(hasFeatureAccess({}, "JEST_TEST")).toBe(false);
  });

  it("returns true if on mumbai and does not have a beta pass", () => {
    spy.mockReturnValue({ NETWORK: "mumbai" });
    expect(hasFeatureAccess({}, "JEST_TEST")).toBe(true);
  });
});
