import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData } from '@/utils'
import {
  ApiTournaments,
  Tournament,
  TournamentGame,
  Tournaments,
} from '@/interfaces/tournament'

const addPlayersTotalTime = (item: ApiTournaments[number]): Tournament => {
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

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data: ApiTournaments = await fetchData('tournaments/full')

    const approvedTournaments = Array.isArray(data)
      ? data.filter(({ tournament }) => tournament?.admin_approved === 1)
      : []

    const validTournaments: Tournaments =
      approvedTournaments.map(addPlayersTotalTime)
    validTournaments.sort(
      (first, second) =>
        new Date(second?.tournament?.datetime ?? 0).getTime() -
        new Date(first?.tournament?.datetime ?? 0).getTime(),
    )

    const groupedByTournamentGroupId: Record<number, typeof validTournaments> =
      {}
    const tournamentGroups: Array<typeof validTournaments> = []

    validTournaments.forEach((item) => {
      const groupId = item?.tournament?.tournament_group_id

      if (groupId === null || groupId === undefined) {
        tournamentGroups.push([item])
        return
      }

      if (!groupedByTournamentGroupId[groupId]) {
        groupedByTournamentGroupId[groupId] = []
        tournamentGroups.push(groupedByTournamentGroupId[groupId])
      }

      groupedByTournamentGroupId[groupId].push(item)
    })

    res.status(200).json(tournamentGroups)
  } catch (error) {
    console.error('Error fetching tournaments data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
