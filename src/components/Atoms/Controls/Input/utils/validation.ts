import { RegisterOptions } from "react-hook-form";
import { CustomInputProps } from "../types/types";

export const getValidationRules = (
  type: CustomInputProps["type"],
  name: string,
  label?: string,
  required = true,
  customValidation?: RegisterOptions,
): RegisterOptions => {
  let rules: RegisterOptions = {
    required:
      type !== "switch" && required ? `${label || name} is required` : false,
  };

  switch (type) {
    case "email":
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      };
      break;
    case "tel":
      rules.pattern = {
        value: /^[0-9]{10}$/,
        message: "Invalid phone number (10 digits required)",
      };
      break;
    case "number":
      rules.valueAsNumber = true;
      rules.min = { value: 0, message: "Value must be positive" };
      break;
    case "password":
      rules.minLength = {
        value: 8,
        message: "Password must be at least 8 characters long",
      };
      rules.validate = (value: string) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasNonalphas = /\W/.test(value);
        return hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas
          ? true
          : "Password must contain an uppercase letter, lowercase letter, number, and special character";
      };
      break;
  }

  if (customValidation) return customValidation;
  return rules;
};
