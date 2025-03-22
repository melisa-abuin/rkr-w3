import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { fetchData } from '@/utils/fetchData'
import { roundNames } from '@/constants'
import { formatRoundsData } from '@/utils/formatRoundsData'

interface QueryParams {
  battleTag?: string
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
  page?: number
  pageSize?: number
  sortKey?: keyof PlayerStats
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: PlayerStats[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { RoundTimes, PlayerName } = saveData
      const playerStats: Partial<PlayerStats> = {}

      playerStats['battleTag'] = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      return playerStats
    })
    const {
      page = 1,
      sortKey = 'roundOne',
      sortOrder = 'desc',
      pageSize = 15,
      battleTag: queryBattletag,
      difficulty,
    } = req.query

    if (queryBattletag) {
      res
        .status(200)
        .json(
          formattedData.filter(({ battleTag }) =>
            battleTag.name.toLowerCase().includes(queryBattletag.toLowerCase()),
          ),
        )
    } else {
      const totalPages = data ? Math.ceil(data?.length / pageSize) : 0

      const initialIndex = (Number(page) - 1) * pageSize

      const sortedData = formattedData.sort((a, b) => {
        const condition = getSortConditionByKey(sortKey, a, b, difficulty)
        if (condition === undefined) return 0
        return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
      })
      res.status(200).json({
        stats: sortedData.slice(initialIndex, initialIndex + pageSize),
        pages: totalPages,
      })
    }
  } catch (error) {
    console.error('Error fetching times stats data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
