export type Ranges = [[number, number], [number], [number, number]];

export const getBidirectionalValue = (
  val: number,
  origin: number,
  min: number,
  max: number,
) => {
  // Edge‐case: no span
  if (origin === min && origin === max) return 0;

  if (val <= origin) {
    // Prevent division by zero when origin === min
    if (origin === min) return -100;
    const pct = (val - min) / (origin - min);
    return -100 * (1 - pct);
  }

  // Prevent division by zero when origin === max
  if (origin === max) return 0;

  const pct = (val - origin) / (max - origin);
  return 100 * pct;
};

export const visualToValue = (
  visualPos: number,
  [minRange, originRange, maxRange]: Ranges,
) => {
  const [min, minGap] = minRange;
  const [origin] = originRange;
  const [max, maxGap] = maxRange;

  const raw =
    visualPos <= 50
      ? min + Math.round((visualPos / 50) * ((origin - min) / minGap)) * minGap
      : origin +
        Math.round(((visualPos - 50) / 50) * ((max - origin) / maxGap)) *
          maxGap;

  const decimals = Math.max(
    minGap.toString().split(".")[1]?.length || 0,
    maxGap.toString().split(".")[1]?.length || 0,
  );

  return Number(
    (raw <= origin
      ? Math.max(min, Math.min(origin, raw))
      : Math.min(max, Math.max(origin, raw))
    ).toFixed(decimals),
  );
};

export const valueToVisual = (
  val: number,
  [minRange, originRange, maxRange]: Ranges,
) => {
  const [min] = minRange;
  const [origin] = originRange;
  const [max] = maxRange;
  return val <= origin
    ? ((val - min) / (origin - min)) * 50
    : 49.8 + ((val - origin) / (max - origin)) * 50;
};
