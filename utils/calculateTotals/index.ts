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
