export const filterByBattleTag = (
  data: Array<{ battleTag: string }>,
  battleTag: string,
) => {
  if (!battleTag) {
    return data
  }

  return data.filter(({ battleTag: playerBattleTag }) =>
    (playerBattleTag || '').toLowerCase().includes(battleTag.toLowerCase()),
  )
}
