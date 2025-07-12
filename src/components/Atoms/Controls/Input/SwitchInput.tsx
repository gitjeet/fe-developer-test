import React, { forwardRef } from "react";
import Switch from "@/components/Atoms/Controls/Switch";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomChangeEvent, CustomInputProps } from "./types/types";

export const SwitchInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ name, disabled, onChange, className, label, ...props }, ref) => {
    const {
      setValue,
      trigger,
      control,
      formState: { errors },
    } = useFormContext();

    const checked = useWatch({
      name,
      control,
      defaultValue: props.defaultValue,
    });

    const handleToggle = (state: boolean) => {
      setValue(name, state, { shouldDirty: true });
      const customEvent: CustomChangeEvent = {
        target: { name, value: state, type: "switch" },
      };
      onChange?.(customEvent);
      trigger(name);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      handleToggle(e.target.checked);

    return (
      <div
        className={`flex flex-col gap-2 w-full py-1 h-fit ${
          disabled ? "opacity-40" : "opacity-100"
        }`}
      >
        <div className="flex flex-row items-center space-x-3">
          {label && (
            <label htmlFor={name} className="body-2 text-white">
              {label}
            </label>
          )}
        </div>

        <Switch
          name={name}
          disabled={disabled}
          checked={checked}
          className={className}
          onChange={handleInputChange}
          ref={ref}
          {...props}
        />

        {!disabled && errors[name] && (
          <span className="text-error-600 text-xs">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    );
  },
);

SwitchInput.displayName = "SwitchInput";
