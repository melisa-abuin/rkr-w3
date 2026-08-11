import { formatBreakdownRows } from '..'

describe('formatBreakdownRows', () => {
  it('flattens breakdown onto the top level with battleTag', () => {
    const breakdown = {
      weightedWins: 5,
      weightedLosses: 2,
      saveRatio: 0.8,
      nitroScore: 10,
      streakBonus: 1,
      deathlessBonus: 0,
      kibbleBonus: 3,
      gameSpeedBonus: 2,
      roundSpeedBonus: 1,
      totalScore: 22,
    }
    const result = formatBreakdownRows([
      { player: { name: 'Player', tag: '1234' }, breakdown },
    ])
    expect(result).toEqual([
      { battleTag: { name: 'Player', tag: '1234' }, ...breakdown },
    ])
  })

  it('returns an empty array for empty input', () => {
    expect(formatBreakdownRows([])).toEqual([])
  })
})
