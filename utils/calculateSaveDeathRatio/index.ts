export const calculateSaveDeathRatio = (saves: number, deaths: number) => {
  if (!saves) {
    return 0
  }

  if (!deaths || deaths === 0) {
    return saves
  }

  return parseFloat((saves / deaths).toFixed(2))
}
