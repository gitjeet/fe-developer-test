import React from "react";
import Spinner from "@/components/Loaders/Spinner";
import { buttonVariants } from "./buttonVariants";
import { getSpinnerColors, getSpinnerSize } from "./useSpinnerConfig";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "destructive" | "success" | "outline";
  size?: "default" | "small";
  isLoading?: boolean;
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function Button({
  children,
  variant = "default",
  className,
  isLoading = false,
  size = "default",
  disabled,
  spinnerSize,
  ...props
}: ButtonProps) {
  const spinnerColors = getSpinnerColors(variant);
  const spinnerSizeToUse = getSpinnerSize(spinnerSize, size);

  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Spinner
          size={spinnerSizeToUse}
          trackColor={spinnerColors.trackColor}
          spinnerColor={spinnerColors.spinnerColor}
        />
      ) : (
        children
      )}
    </button>
  );
}
