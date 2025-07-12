import { forwardRef } from "react";
import DropdownMenu from "@/components/Molecules/Dropdowns";
import { useWatch, useFormContext } from "react-hook-form";
import { MenuItem } from "@/types";
import { CustomChangeEvent, CustomInputProps } from "./types/types";

export const DropdownInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ name, disabled, dropdownOptions = [], onChange, className, ...props }) => {
    const { setValue, control, trigger } = useFormContext();
    const fieldValue = useWatch({
      control,
      name,
      defaultValue: props.defaultValue,
    });

    const handleSelect = (item: MenuItem) => {
      setValue(name, item.label);
      const customEvent: CustomChangeEvent = {
        target: { name, value: item.label, type: "dropdown" },
      };
      onChange?.(customEvent);
      trigger(name);
    };

    return (
      <DropdownMenu
        disabled={disabled}
        size="lg"
        menuList={dropdownOptions || []}
        onChange={handleSelect}
        className={className}
      >
        {fieldValue ? fieldValue : (props.defaultValue ?? props.placeholder)}
      </DropdownMenu>
    );
  },
);

DropdownInput.displayName = "DropdownInput";
