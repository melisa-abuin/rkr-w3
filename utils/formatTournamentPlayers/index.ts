import {
  ApiTournaments,
  Tournament,
  TournamentGame,
} from '@/interfaces/tournament'

export const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

type FastestRounds = Tournament['fastestRounds']

const getDefaultFastestRound = (): FastestRounds['roundOne'] => ({
  player: { name: '', tag: '' },
  time: Number.POSITIVE_INFINITY,
})

const getDefaultFastestRounds = (): FastestRounds =>
  roundNames.reduce((accumulator, roundName) => {
    const key = `round${roundName}` as keyof FastestRounds
    accumulator[key] = getDefaultFastestRound()
    return accumulator
  }, {} as FastestRounds)

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
  const fastestRounds = getDefaultFastestRounds()
  const players = Array.isArray(item?.players) ? item.players : []
  const playersWithTotalTime = players.map((player) => {
    const games: TournamentGame[] = []
    player?.games?.forEach((game) => {
      games.push({ ...game, totalTime: game.total_time })
      game.rounds.forEach((round) => {
        const roundTime = round.round_time
        const roundNumber = round.round_number

        if (
          roundTime <
          fastestRounds[
            `round${roundNames[roundNumber - 1]}` as keyof typeof fastestRounds
          ]?.time
        ) {
          fastestRounds[
            `round${roundNames[roundNumber - 1]}` as keyof typeof fastestRounds
          ] = {
            player: {
              name: player.battletag?.split('#')[0] || '',
              tag: player.battletag || '',
            },
            time: roundTime,
          }
        }
      })
    })

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
    tournament: {
      ...item.tournament,
      gameType: item.tournament.game_type,
      groupId: item.tournament.tournament_group_id,
    },
    fastestRounds,
    players: playersWithTotalTime.sort(
      (first, second) => first.totalTime - second.totalTime,
    ),
  }
}
