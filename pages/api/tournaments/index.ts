import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData, formatTournamentPlayers } from '@/utils'
import { ApiTournaments, Tournaments } from '@/interfaces/tournament'

/**
 * GET /api/tournaments
 *
 * Returns all admin-approved tournaments grouped by their tournament group,
 * sorted by date descending (most recent first).
 * No query parameters accepted.
 *
 * Response 200 – array of tournament groups. Each group is an array of
 * one or more `Tournament` objects that share the same `tournament_group_id`.
 * Tournaments without a group ID appear as single-element arrays.
 * ```json
 * [
 *   [
 *     {
 *       "tournament": {
 *         "id":                    number,
 *         "tournament_id":         "string",
 *         "region":                "string",
 *         "gamemode":              "string",
 *         "game_type":             "string",
 *         "datetime":              "string",
 *         "admin_approved":        1,
 *         "tournament_group_id":   number | null
 *       },
 *       "players": [
 *         {
 *           "battletag":  "string",
 *           "battleTag":  { "name": "string", "tag": "string" },
 *           "totalTime":  number,
 *           "games": [
 *             {
 *               "id":             number,
 *               "tournament_id":  number,
 *               "battletag":      "string",
 *               "game_number":    number,
 *               "game_uid":       "string",
 *               "team":           "string",
 *               "team_members":   "string",
 *               "total_deaths":   number,
 *               "total_progress": number,
 *               "total_saves":    number,
 *               "total_time":     number,
 *               "totalTime":      number,
 *               "rounds": [
 *                 {
 *                   "id":           number,
 *                   "game_id":      number,
 *                   "round_number": number,
 *                   "deaths":       number,
 *                   "level":        number,
 *                   "progress":     number,
 *                   "round_time":   number,
 *                   "saves":        number
 *                 }
 *               ]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * ]
 * ```
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 */
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data: ApiTournaments = await fetchData('tournaments/full')

    const officialTournaments = Array.isArray(data)
      ? data.filter(({ tournament }) => tournament?.admin_approved === 1)
      : []

    const sortedTournaments: Tournaments = officialTournaments.map(
      formatTournamentPlayers,
    )
    sortedTournaments.sort(
      (first, second) =>
        new Date(second?.tournament?.datetime ?? 0).getTime() -
        new Date(first?.tournament?.datetime ?? 0).getTime(),
    )

    const groupedByTournamentGroupId: Record<number, typeof sortedTournaments> =
      {}
    const tournamentGroups: Array<typeof sortedTournaments> = []

    sortedTournaments.forEach((item) => {
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
