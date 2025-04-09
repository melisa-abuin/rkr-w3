import { playerDataOutdated } from '..'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formattedMockData, outdatedPlayerDaysThreshold } from '@/constants'

const now = new Date()

const createPlayer = (
  mock: PlayerStats,
  daysAgo: number,
): DetailedPlayerStats =>
  ({
    ...mock,
    lastUploaded: new Date(
      now.getTime() - daysAgo * 24 * 60 * 60 * 1000,
    ).toISOString(),
  }) as DetailedPlayerStats

describe('playerDataOutdated', () => {
  it('returns null when difference is below threshold', () => {
    const player1 = createPlayer(formattedMockData[0], 0)
    const player2 = createPlayer(formattedMockData[1], 1)

    const result = playerDataOutdated(player1, player2)
    expect(result).toBeNull()
  })

  it('returns the name of the older player when difference is above threshold', () => {
    const player1 = createPlayer(formattedMockData[0], 0)
    const player2 = createPlayer(
      formattedMockData[1],
      outdatedPlayerDaysThreshold + 1,
    )

    const result = playerDataOutdated(player1, player2)
    expect(result).toBe('Gonza')
  })

  it('returns the name of the older player regardless of order', () => {
    const player1 = createPlayer(
      formattedMockData[0],
      outdatedPlayerDaysThreshold + 1,
    )
    const player2 = createPlayer(formattedMockData[1], 0)

    const result = playerDataOutdated(player1, player2)
    expect(result).toBe('Pablo')
  })

  it('returns null when both players have same date', () => {
    const player1 = createPlayer(formattedMockData[0], 0)
    const player2 = createPlayer(formattedMockData[1], 0)

    const result = playerDataOutdated(player1, player2)
    expect(result).toBeNull()
  })
})
