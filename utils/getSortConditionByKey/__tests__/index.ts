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

  it('Returns true if player 1 has more total games played than player 2', () => {
    expect(
      getSortConditionByKey(
        'gamesPlayed',
        {
          ...formattedMockData[0],
          gamesPlayed: { ...formattedMockData[0].gamesPlayed, total: 10 },
        },
        {
          ...formattedMockData[1],
          gamesPlayed: { ...formattedMockData[1].gamesPlayed, total: 5 },
        },
      ),
    ).toBe(true)
  })

  it('Returns true if player 1 has more completed challenges than player 2', () => {
    expect(
      getSortConditionByKey(
        'completedChallenges',
        {
          ...formattedMockData[0],
          completedChallenges: '50/56',
        },
        {
          ...formattedMockData[1],
          completedChallenges: '20/56',
        },
      ),
    ).toBe(true)
  })

  it('Returns true if player 1 has a better time in r1 than player 2', () => {
    expect(
      getSortConditionByKey(
        'r1',
        {
          ...formattedMockData[0],
          r1: {
            ...formattedMockData[0].r1,
            best: {
              time: 100.0,
              difficulty: 'hard',
            },
          },
        },
        {
          ...formattedMockData[1],
          r1: {
            ...formattedMockData[1].r1,
            best: {
              time: 105.0,
              difficulty: 'hard',
            },
          },
        },
      ),
    ).toBe(true)
  })
})