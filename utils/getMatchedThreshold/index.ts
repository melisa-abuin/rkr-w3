/**
 * Returns the first threshold that is greater than or equal to the provided value.
 *
 * @param value - Number to evaluate against thresholds.
 * @param valuesByThreshold - Map where each key is a numeric threshold.
 * @returns Value mapped to the first matching threshold, or null when no threshold matches.
 */
export const getMatchedThreshold = <T>(
  value: number,
  valuesByThreshold: Record<number, T>,
): T | null => {
  const thresholds = Object.keys(valuesByThreshold)
    .map(Number)
    .sort((a, b) => a - b)

  const matchedThreshold = thresholds.find((threshold) => value <= threshold)

  return matchedThreshold === undefined
    ? null
    : valuesByThreshold[matchedThreshold]
}
