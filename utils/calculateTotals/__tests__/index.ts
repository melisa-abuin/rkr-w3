import { formattedMockData } from '@/constants'
import { calculateTotals } from '..'

describe('calculateTotals', () => {
  it('Returns a new object with normal, hard, impossible and a total amount calculated', () => {
    expect(
      calculateTotals(
        formattedMockData[0].normal_games,
        formattedMockData[0].hard_games,
        formattedMockData[0].impossible_games,
      ),
    ).toStrictEqual({
      normal: 39,
      hard: 16,
      impossible: 15,
      total: 70,
    })
  })
})
