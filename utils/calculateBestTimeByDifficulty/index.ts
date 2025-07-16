interface Props {
  normal: number
  hard: number
  impossible: number
  nightmare: number
}

/**
 * Determines the fastest completion time across all difficulty levels for a specific round.
 *
 * Prioritizes non-zero times: if a time is zero, it's considered incomplete or invalid
 * and will be ignored in favor of valid times.
 *
 * @param times - An object containing completion times for each difficulty level.
 * @returns An object containing the difficulty with the fastest valid time and its value.
 */
export const calculateBestTimeByDifficulty = (times: Props) => {
  const bestDifficulty = (Object.keys(times) as Array<keyof Props>).reduce(
    (minDiff, currentDiff) => {
      const currentTime = times[currentDiff]
      const minTime = times[minDiff]

      // If one of the times is 0, prefer the non-zero time
      if (currentTime === 0) return minDiff
      if (minTime === 0) return currentDiff

      // Otherwise, compare the times
      return currentTime < minTime ? currentDiff : minDiff
    },
  )

  return {
    difficulty: bestDifficulty,
    time: times[bestDifficulty],
  }
}
