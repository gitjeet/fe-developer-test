import React from "react";
import Radio from "../RadioButton";
import { useFormContext } from "react-hook-form";
import { CustomChangeEvent, CustomInputProps } from "./types/types";

export const RadioInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ name, radioOptions = [], disabled, onChange, ...props }, ref) => {
    const { setValue, trigger } = useFormContext();

    const handleSelect = (value: string) => {
      setValue(name, value);
      const customEvent: CustomChangeEvent = {
        target: { name, value, type: "radio" },
      };
      onChange?.(customEvent);
      trigger(name);
    };

    return (
      <Radio
        options={radioOptions.map((o) => ({
          ...o,
          disabled: o.disabled || disabled,
        }))}
        defaultValue={String(props.defaultValue)}
        className="space-y-2"
        labelClassName="body-2 text-white ml-3"
        onClick={(opt) => handleSelect(opt.value)}
        size="sm"
        // @ts-ignore — in case your Radio doesn't accept ref, suppress temporarily
        ref={ref}
      />
    );
  },
);

RadioInput.displayName = "RadioInput";
