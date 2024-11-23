interface Props {
  normal: number
  hard: number
  impossible: number
}

/**
 * Provides the best time among all difficulties for a specific round
 *
 * @param times object that contains all the times for a round
 * @returns object with the best time and the difficulty
 */
export const calculateBestTimeByDifficulty = (times: Props) => {
  const bestDifficulty = (Object.keys(times) as Array<keyof Props>).reduce(
    (minDiff, currentDiff) =>
      times[currentDiff] < times[minDiff] ? currentDiff : minDiff,
  )

  return {
    difficulty: bestDifficulty,
    time: times[bestDifficulty],
  }
}
