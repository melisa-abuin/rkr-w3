import { formattedMockData } from '@/constants'
import { getSortConditionByKey } from '..'

describe('getSortConditionByKey', () => {
  it('Returns true if player 1 has more total wins than player 2', () => {
    expect(
      getSortConditionByKey(
        'wins',
        {
          ...formattedMockData[0],
          wins: { ...formattedMockData[0].wins, total: 10 },
        },
        {
          ...formattedMockData[1],
          wins: { ...formattedMockData[1].wins, total: 5 },
        },
      ),
    ).toBe(true)
  })
})
