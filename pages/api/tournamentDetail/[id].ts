import { fetchData, formatTournamentPlayers } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiTournament, Tournament } from '@/interfaces/tournament'

interface QueryParams {
  id: string
}

type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/tournamentDetail/:id
 *
 * Returns the full details for a single admin-approved tournament.
 *
 * Route parameters:
 *   - id (required): numeric tournament ID.
 *
 * Response 200 – a single `Tournament` object:
 * ```json
 * {
 *   "tournament": {
 *     "id":                   number,
 *     "tournament_id":        "string",
 *     "region":               "string",
 *     "gamemode":             "string",
 *     "game_type":            "string",
 *     "datetime":             "string",
 *     "admin_approved":       1,
 *     "tournament_group_id":  number | null
 *   },
 *   "players": [
 *     {
 *       "battletag":  "string",
 *       "battleTag":  { "name": "string", "tag": "string" },
 *       "totalTime":  number,
 *       "games": [
 *         {
 *           "id":             number,
 *           "tournament_id":  number,
 *           "battletag":      "string",
 *           "game_number":    number,
 *           "game_uid":       "string",
 *           "team":           "string",
 *           "team_members":   "string",
 *           "total_deaths":   number,
 *           "total_progress": number,
 *           "total_saves":    number,
 *           "total_time":     number,
 *           "totalTime":      number,
 *           "rounds": [
 *             {
 *               "id":           number,
 *               "game_id":      number,
 *               "round_number": number,
 *               "deaths":       number,
 *               "level":        number,
 *               "progress":     number,
 *               "round_time":   number,
 *               "saves":        number
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 * ```
 *
 * Response 307 – redirect to `/` when the tournament is not admin-approved.
 * Response 404 – `{ "message": "Tournament not found" }` when no matching tournament exists.
 * Response 500 – `{ "message": "Internal Server Error" }`
 *   Also returned when `id` is missing.
 */
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
