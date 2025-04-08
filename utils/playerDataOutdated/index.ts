import { outdatedPlayerDaysThreshold } from '@/constants'
import { DetailedPlayerStats } from '@/interfaces/player'

export const playerDataOutdated = (
  player1: DetailedPlayerStats,
  player2: DetailedPlayerStats,
): string | null => {
  const player1Date = new Date(player1.lastUploaded)
  const player2Date = new Date(player2.lastUploaded)

  const diffInMs = Math.abs(player1Date.getTime() - player2Date.getTime())
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  if (diffInDays < outdatedPlayerDaysThreshold) return null

  return player1Date > player2Date
    ? player2.battleTag.name
    : player1.battleTag.name
}
