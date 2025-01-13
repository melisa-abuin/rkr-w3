/**
 * Provides the win rate for a player
 * if the player has no wins or games then it returns 0
 *
 * @param wins amount of wins
 * @param games amount of games
 * @returns save/death ratio
 */
export const calculateWinRate = (wins: number = 0, games: number = 0) => {
  if (wins <= 0 || games <= 0) {
    return '0%'
  }

  const winRate = (wins / games) * 100
  return `${winRate.toFixed(1)}%`
}
