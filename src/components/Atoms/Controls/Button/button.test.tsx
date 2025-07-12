import { getSpinnerColors, getSpinnerSize } from "./useSpinnerConfig";

describe("getSpinnerColors", () => {
  it("returns outline colors for outline variant", () => {
    expect(getSpinnerColors("outline")).toEqual({
      trackColor: "#4FB7DD",
      spinnerColor: "transparent",
    });
  });

  it("returns default colors for non‑outline variants", () => {
    const variants = ["default", "secondary", "destructive", "success"] as const;
    variants.forEach((v) =>
      expect(getSpinnerColors(v)).toEqual({
        trackColor: "#ffffff",
        spinnerColor: "transparent",
      }),
    );
  });
});

describe("getSpinnerSize", () => {
  it("returns explicit spinnerSize if provided", () => {
    expect(getSpinnerSize("lg", "default")).toBe("lg");
    expect(getSpinnerSize("xs", "small")).toBe("xs");
  });

  it("falls back to xs for small button when spinnerSize is undefined", () => {
    expect(getSpinnerSize(undefined, "small")).toBe("xs");
  });

  it("falls back to sm for default button when spinnerSize is undefined", () => {
    expect(getSpinnerSize(undefined, "default")).toBe("sm");
  });
});
