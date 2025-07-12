import { getBidirectionalValue } from "./valueConverter";

describe("getBidirectionalValue", () => {
  const min = 0;
  const origin = 50;
  const max = 100;
  //using toBeCloseto instead of toBe in the origin unit test because  -0 vs 0 in JavaScript
  it("returns 0 at the origin", () => {
    expect(getBidirectionalValue(origin, origin, min, max)).toBeCloseTo(0);
  });

  it("returns -100 at minimum", () => {
    expect(getBidirectionalValue(min, origin, min, max)).toBe(-100);
  });

  it("returns +100 at maximum", () => {
    expect(getBidirectionalValue(max, origin, min, max)).toBe(100);
  });

  it("scales linearly below origin", () => {
    // value halfway between min and origin → -50
    expect(getBidirectionalValue(25, origin, min, max)).toBeCloseTo(-50);
  });

  it("scales linearly above origin", () => {
    // value three‑quarters towards max → +50
    expect(getBidirectionalValue(75, origin, min, max)).toBeCloseTo(50);
  });
});
