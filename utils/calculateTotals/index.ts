/**
 * Provide the total amount of games/wins for a player in all difficulties
 *
 * @param normal amount of wins/games in normal
 * @param hard amount of wins/games in hard
 * @param impossible amount of wins/games in impossible
 * @returns object with the formatted data that includes the total count
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
