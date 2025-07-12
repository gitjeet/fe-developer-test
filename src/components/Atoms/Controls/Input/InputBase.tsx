import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "../../Misc/Tooltip";

interface InputBaseProps {
  label?: string;
  tooltip?: string;
  badge?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const InputBase: React.FC<InputBaseProps> = ({
  label,
  tooltip,
  badge,
  disabled,
  children,
}) => (
  <div
    className={`flex flex-col gap-2 w-full py-1 h-fit ${disabled ? "opacity-40" : "opacity-100"}`}
  >
    {(label || tooltip || badge) && (
      <div className="flex flex-row items-center space-x-3">
// src/components/Atoms/Controls/Input/InputBase.tsx

interface InputBaseProps {
  label?: string;
  id?: string;
  tooltip?: string;
  badge?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const InputBase: React.FC<InputBaseProps> = ({
  label,
  id,
  tooltip,
  badge,
  disabled,
  children,
}) => (
  <div className={`relative flex flex-col ${disabled ? 'opacity-50' : ''}`}>
    {label && <label htmlFor={id} className="body-2 text-white">{label}</label>}
    {tooltip && (
      <Tooltip content={tooltip}>
        <InfoIcon />
      </Tooltip>
    )}
    {children}
    {badge && <span className="badge">{badge}</span>}
  </div>
);
        {badge && (
          <div className="caption text-white py-1 px-2 rounded-xl bg-white bg-opacity-10">
            {badge}
          </div>
        )}
        {tooltip && (
          <Tooltip content={tooltip}>
            <AiOutlineInfoCircle
              className="text-white flex-shrink-0"
              size={16}
            />
          </Tooltip>
        )}
      </div>
    )}
    {children}
  </div>
);
