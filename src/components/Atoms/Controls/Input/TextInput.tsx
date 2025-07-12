import React from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";
import { CustomInputProps } from "./types/types";
import { getValidationRules } from "./utils/validation";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const inputClass = tv({
  base: "body-3 w-full rounded-xl p-4 bg-white bg-opacity-10 ring-0 outline-0 focus:ring-1 active:ring-1 focus:ring-white active:ring-white transition-all ease-in-out duration-300 text-white",
  variants: {
    error: { true: "border border-error-600" },
    withIcon: { true: "pr-12" },
  },
});

export const TextInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ type, name, disabled, onChange, customValidation, ...props }, ref) => {
    const {
      register,
      formState: { errors },
      trigger,
    } = useFormContext();

    const [showPassword, setShowPassword] = React.useState(false);

    const {
      ref: inputRef,
      onChange: formOnChange,
      ...inputProps
    } = register(
      name,
      getValidationRules(
        type,
        name,
        props.label,
        props.required,
        customValidation,
      ),
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      formOnChange(event);
      onChange?.(event);
      trigger(name);
    };

    return (
      <div className="relative w-full">
        <input
          {...inputProps}
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          className={inputClass({
            error: !disabled && !!errors[name],
            withIcon: type === "password",
            className: props.className,
          })}
          disabled={disabled}
          onChange={handleChange}
          ref={(el) => {
            inputRef(el);
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEyeOff size={20} /> : <IoEye size={20} />}
          </button>
        )}
        {!disabled && errors[name] && (
          <span className="text-error-600 text-xs">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
