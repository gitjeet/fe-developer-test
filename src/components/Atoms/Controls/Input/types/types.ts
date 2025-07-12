import { MenuItem } from "@/types";
import { RegisterOptions } from "react-hook-form";

export interface CustomChangeEvent {
  target: {
    name: string;
    value: string | number | boolean | readonly string[];
    type: string;
  };
}

export interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  tooltip?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "radio"
    | "switch"
    | "checkbox"
    | "dropdown";
  radioOptions?: Array<{ label: string; value: string; disabled?: boolean }>;
  required?: boolean;
  badge?: string;
  dropdownOptions?: Array<MenuItem>;
  customValidation?: RegisterOptions;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void;
}
