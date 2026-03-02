import { fetchData } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  ApiTournament,
  Tournament,
  TournamentGame,
} from '@/interfaces/tournament'

interface QueryParams {
  id: string
}

type StatsRequest = NextApiRequest & { query: QueryParams }

const addPlayersTotalTime = (item: ApiTournament): Tournament => {
  const players = item.players || {}
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

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      throw new Error('Please provide a valid tournament ID')
    }

    const data: ApiTournament = await fetchData(`tournaments/${id}/full`)
    const tournament: Tournament = addPlayersTotalTime(data)

    if (!data) {
      return res.status(404).json({ message: 'Tournament not found' })
    }

    if (data.tournament?.admin_approved !== 1) {
      res.redirect(307, '/')
    }

    res.status(200).json(tournament)
  } catch (error) {
    console.error('Error fetching player data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
