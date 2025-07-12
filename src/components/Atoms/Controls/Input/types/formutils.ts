import {
  UseFormSetValue,
  UseFormTrigger,
  FieldValues,
  Path,
} from "react-hook-form";
import { CustomChangeEvent } from "../types/types";

export function handleFormChange<TFieldValues extends FieldValues>(
  event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  name: string,
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setValue: UseFormSetValue<TFieldValues>,
  trigger: UseFormTrigger<TFieldValues>,
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void,
) {
  const typedName = name as Path<TFieldValues>;

  if ("nativeEvent" in event) {
    inputOnChange(event);
  } else {
    setValue(typedName, event.target.value);
  }

  if (onChange) {
    onChange(event);
  }

  trigger(typedName);
}
