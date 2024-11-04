import { formattedMockData } from '@/constants'
import { formatRoundsData } from '..'

describe('formatRoundsData', () => {
  it('Returns a new object with normal, hard, impossible and a total time calculated', () => {
    expect(formatRoundsData(formattedMockData[0], 1)).toStrictEqual({
      normal: formattedMockData[0].round_1_time_normal,
      hard: formattedMockData[0].round_1_time_hard,
      impossible: formattedMockData[0].round_1_time_impossible,
      best: {
        difficulty: 'normal',
        time: formattedMockData[0].round_1_time_normal,
      },
    })
  })
})
