/**
 * Provides a completed challenges formatted as a numeric tuple,
 * returns 0 if no challenges are provided
 *
 * @param challenges string with n/n completed challenges
 * @returns tuple with [n,n] format
 */
export const getNumericCompleteChallenges = (challenges?: string): number[] => {
  if (!challenges) {
    return [0, 0]
  }

  return challenges.split('/').map(Number)
}
