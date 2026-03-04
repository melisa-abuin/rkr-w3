import { NextApiRequest, NextApiResponse } from 'next'
import { fetchData, formatTournamentPlayers } from '@/utils'
import { ApiTournaments, Tournaments } from '@/interfaces/tournament'

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
