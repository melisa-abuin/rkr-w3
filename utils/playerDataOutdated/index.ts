import { outdatedPlayerDaysThreshold } from '@/constants'
import { Player } from '@/interfaces/player'

/**
 * Checks whether two players' uploaded stats dates differ by an outdated threshold.
 *
 * @param player1 First player to compare.
 * @param player2 Second player to compare.
 * @returns The battle tag name of the player with older data when the date gap is
 * at least `outdatedPlayerDaysThreshold`; otherwise `null`.
 */
export const playerDataOutdated = (
  player1: Player,
  player2: Player,
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
