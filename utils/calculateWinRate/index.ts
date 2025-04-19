/**
 * Calculates the win rate percentage for a player.
 *
 * Returns `'0%'` if the player has no wins or no games. Otherwise, it returns the win rate
 * as a percentage string, rounded to one decimal place.
 *
 * @param wins - Number of wins (default: 0).
 * @param games - Total number of games played (default: 0).
 * @returns The win rate as a string (e.g., "75.0%").
 */
export const calculateWinRate = (wins: number = 0, games: number = 0) => {
  if (wins <= 0 || games <= 0) {
    return '0%'
  }

  const winRate = (wins / games) * 100
  return `${winRate.toFixed(1)}%`
}
