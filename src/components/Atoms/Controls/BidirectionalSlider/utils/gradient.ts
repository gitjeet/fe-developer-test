export const getBackgroundGradient = (
  value: number,
  color: string,
  [minRange, originRange, maxRange]: [
    [number, number],
    [number],
    [number, number],
  ],
) => {
  const [min] = minRange;
  const [origin] = originRange;
  const [max] = maxRange;

  const valuePercent =
    value <= origin
      ? (50 * (value - min)) / (origin - min)
      : 50 + (50 * (value - origin)) / (max - origin);

  if (value <= origin) {
    return `linear-gradient(to right,
          #e5e7eb 0%,
          #e5e7eb ${valuePercent}%,
          ${color} ${valuePercent}%,
          ${color} 50%,
          #e5e7eb 50%,
          #e5e7eb 100%)`;
  }
  return `linear-gradient(to right,
        #e5e7eb 0%,
        #e5e7eb 50%,
        ${color} 50%,
        ${color} ${valuePercent}%,
        #e5e7eb ${valuePercent}%,
        #e5e7eb 100%)`;
};
