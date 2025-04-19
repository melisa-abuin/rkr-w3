/**
 * Calculates the ratio between the number of saves and deaths for a player.
 *
 * This is used to measure how effective a player is at saving others relative to how often they die.
 *
 * - If the player has no saves, the ratio is `0`.
 * - If the player has saves but no deaths, the ratio is equal to the number of saves.
 * - Otherwise, the ratio is calculated as saves divided by deaths, rounded to two decimal places.
 *
 * @param saves - Number of successful saves performed by the player (default: 0).
 * @param deaths - Number of times the player died (default: 0).
 * @returns The save/death ratio as a number.
 */
export const calculateSaveDeathRatio = (
  saves: number = 0,
  deaths: number = 0,
) => {
  if (!saves) {
    return 0
  }

  if (!deaths || deaths === 0) {
    return saves
  }

  return parseFloat((saves / deaths).toFixed(2))
}
