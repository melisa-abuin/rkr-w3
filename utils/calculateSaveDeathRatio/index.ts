/**
 * Provides the save/death ratio for a player
 * if the player has no saves then it returns 0, if the player has no deaths it returns the saves instead
 *
 * @param saves amount of saves
 * @param deaths amount of deaths
 * @returns save/death ratio
 */
export const calculateSaveDeathRatio = (saves: number, deaths: number) => {
  if (!saves) {
    return 0
  }

  if (!deaths || deaths === 0) {
    return saves
  }

  return parseFloat((saves / deaths).toFixed(2))
}
