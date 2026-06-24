import { filterByBattleTag } from '..'

interface MockPlayer {
  battleTag: string
  score: number
}

describe('filterByBattleTag', () => {
  const mockData: MockPlayer[] = [
    { battleTag: 'Alpha', score: 30 },
    { battleTag: 'Bravo', score: 10 },
    { battleTag: 'charlie', score: 20 },
  ]

  it('filters data by battleTag name (case-insensitive)', () => {
    expect(filterByBattleTag(mockData, 'ALP')).toStrictEqual([
      { battleTag: 'Alpha', score: 30 },
    ])
  })

  it('returns original data when battleTag query is empty', () => {
    expect(filterByBattleTag(mockData, '')).toStrictEqual(mockData)
  })
})
