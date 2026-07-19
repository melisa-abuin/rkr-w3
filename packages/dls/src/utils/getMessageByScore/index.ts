export const scoreMessagesMap: Record<number, string> = {
  3: 'Keep it up!',
  6: 'Looking sharp!',
  10: 'Crushing it!',
  15: 'On fire!',
  20: 'Unstoppable!',
}

/**
 * Returns the message for the highest threshold reached by the given score.
 *
 * If no threshold is reached, it returns `null`.
 *
 * @param score Current score value.
 * @returns Matching milestone message, or `null` when score is below the first threshold.
 */
export const getMessageByScore = (score: number): string | null => {
  const thresholds = Object.keys(scoreMessagesMap)
    .map(Number)
    .sort((a, b) => a - b)

  let message: string | null = null

  for (const threshold of thresholds) {
    if (score >= threshold) {
      message = scoreMessagesMap[threshold]
    } else {
      break
    }
  }

  return message
}
