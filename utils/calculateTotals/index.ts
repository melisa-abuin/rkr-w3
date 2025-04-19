/**
 * Calculates the total number of wins or games across all difficulty levels.
 *
 * Useful for aggregating stats like total wins or total games played in normal, hard, and impossible modes.
 *
 * @param normal - Number of wins/games in normal difficulty (default: 0).
 * @param hard - Number of wins/games in hard difficulty (default: 0).
 * @param impossible - Number of wins/games in impossible difficulty (default: 0).
 * @returns An object containing individual difficulty counts and their total sum.
 */
export const calculateTotals = (
  normal: number = 0,
  hard: number = 0,
  impossible: number = 0,
) => ({
  normal,
  hard,
  impossible,
  total: normal + hard + impossible,
})
