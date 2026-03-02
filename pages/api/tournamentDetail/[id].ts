import { fetchData, formatTournamentPlayers } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiTournament, Tournament } from '@/interfaces/tournament'

interface QueryParams {
  id: string
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      throw new Error('Please provide a valid tournament ID')
    }

    const data: ApiTournament = await fetchData(`tournaments/${id}/full`)
    const tournament: Tournament = formatTournamentPlayers(data)

    if (!data) {
      return res.status(404).json({ message: 'Tournament not found' })
    }

    if (data.tournament?.admin_approved !== 1) {
      res.redirect(307, '/')
      return
    }

    res.status(200).json(tournament)
  } catch (error) {
    console.error('Error fetching tournament data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
