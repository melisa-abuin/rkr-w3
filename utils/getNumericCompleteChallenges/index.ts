export const getNumericCompleteChallenges = (challenges?: string): number[] => {
  if (!challenges) {
    return [0, 0]
  }

  return challenges.split('/').map(Number)
}
