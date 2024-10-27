interface Props {
  normal: number
  hard: number
  impossible: number
}

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
