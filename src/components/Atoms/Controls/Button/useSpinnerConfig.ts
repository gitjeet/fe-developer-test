type SpinnerVariant = "default" | "secondary" | "destructive" | "success" | "outline";
type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonSize = "default" | "small";

export const getSpinnerColors = (variant: SpinnerVariant) => {
  if (variant === "outline") {
    return {
      trackColor: "#4FB7DD",
      spinnerColor: "transparent",
    };
  }
  return {
    trackColor: "#ffffff",
    spinnerColor: "transparent",
  };
};

export const getSpinnerSize = (spinnerSize?: SpinnerSize, buttonSize: ButtonSize = "default") => {
  return spinnerSize || (buttonSize === "small" ? "xs" : "sm");
};
