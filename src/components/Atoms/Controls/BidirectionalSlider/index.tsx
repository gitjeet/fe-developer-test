import React from "react";
import {
  getBidirectionalValue,
  visualToValue,
  valueToVisual,
} from "./utils/valueConverter";
import { getBackgroundGradient } from "./utils/gradient";

interface Props {
  color?: string;
  ranges: [[number, number], [number], [number, number]];
  value: number;
  onChange: (value: number, bidirectionalValue: number) => void;
}

export const BidirectionalSlider: React.FC<Props> = ({
  color = "#0ea5e9",
  ranges,
  value,
  onChange,
}) => {
  const uniqueId = crypto.randomUUID();
  const [minRange, originRange, maxRange] = ranges;
  const [origin] = originRange;

  return (
    <div className="relative">
      {/* …indicator markup omitted for brevity… */}

      <input
        id={`inputRangeThumb-${uniqueId}-slider`}
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={valueToVisual(value, ranges)}
        onChange={(e) => {
          const newVal = visualToValue(Number(e.target.value), ranges);
          onChange(
            newVal,
            Math.round(
              getBidirectionalValue(newVal, origin, minRange[0], maxRange[0]),
            ),
          );
        }}
        className="w-full h-[3px] rounded-lg appearance-none …"
        style={{ background: getBackgroundGradient(value, color, ranges) }}
      />
    </div>
  );
};
