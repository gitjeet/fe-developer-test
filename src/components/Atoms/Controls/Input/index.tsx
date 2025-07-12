import React from "react";
import { InputBase } from "./InputBase";
import { TextInput } from "./TextInput";
import { RadioInput } from "./RadioInput";
import { SwitchInput } from "./SwitchInput";
import { DropdownInput } from "./DropDownInput";
import { CustomInputProps } from "./types/types";

const Input = React.forwardRef<any, CustomInputProps>((props, ref) => {
  const { type, label, tooltip, badge, disabled } = props;

  const renderVariant = () => {
    switch (type) {
      case "radio":
        return <RadioInput {...props} ref={ref} />;
      case "switch":
        return <SwitchInput {...props} ref={ref} />;
      case "dropdown":
        return <DropdownInput {...props} ref={ref} />;
      default:
        return <TextInput {...props} ref={ref} />;
  };

  return (
    <InputBase
      label={label}
      tooltip={tooltip}
      badge={badge}
      disabled={disabled}
    >
      {renderVariant()}
    </InputBase>
  );
});

Input.displayName = "Input";
export default Input;
