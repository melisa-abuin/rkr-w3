import { formatKibbleRows } from '..'

describe('formatKibbleRows', () => {
  it('flattens kibbles onto the top level with battleTag', () => {
    const result = formatKibbleRows([
      {
        battleTag: { name: 'Player', tag: '1234' },
        kibbles: {
          allTime: 100,
          singleGame: 10,
          jackpots: 2,
          superJackpots: 0,
        },
      },
    ])
    expect(result).toEqual([
      {
        battleTag: { name: 'Player', tag: '1234' },
        allTime: 100,
        singleGame: 10,
        jackpots: 2,
        superJackpots: 0,
      },
    ])
  })

  it('returns an empty array for empty input', () => {
    expect(formatKibbleRows([])).toEqual([])
  })
})
