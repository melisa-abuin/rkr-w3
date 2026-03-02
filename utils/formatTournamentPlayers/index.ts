import {
  ApiTournaments,
  Tournament,
  TournamentGame,
} from '@/interfaces/tournament'

/**
 * Normalizes tournament players for UI/API consumption.
 *
 * - Maps each game `total_time` field to camelCase `totalTime`
 * - Computes each player's aggregated `totalTime` across games
 * - Splits `battletag` into `battleTag.name` and `battleTag.tag`
 * - Sorts players by lowest total time (ascending)
 */
export const formatTournamentPlayers = (
  item: ApiTournaments[number],
): Tournament => {
  const players = Array.isArray(item?.players) ? item.players : []
  const playersWithTotalTime = players.map((player) => {
    const games: TournamentGame[] = Array.isArray(player?.games)
      ? player.games.map((game) => ({
          ...game,
          totalTime: game.total_time,
        }))
      : []

    const totalTime = games.reduce((acc: number, game) => {
      return acc + game.totalTime
    }, 0)

    return {
      ...player,
      battleTag: {
        name: player.battletag?.split('#')[0] || '',
        tag: player.battletag || '',
      },
      games,
      totalTime,
    }
  })

  return {
    ...item,
    players: playersWithTotalTime.sort(
      (first, second) => first.totalTime - second.totalTime,
    ),
  }
}
