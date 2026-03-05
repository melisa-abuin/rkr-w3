import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSortConditionByKey, fetchData, formatRoundsData } from '@/utils'
import { roundNames } from '@/constants'

interface QueryParams {
  battleTag?: string
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
  page?: number
  pageSize?: number
  sortKey?: keyof Player
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: Player[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { RoundTimes, PlayerName } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.battleTag = {
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
      sortKey,
      sortOrder = 'desc',
      pageSize = 15,
      battleTag: queryBattletag,
      difficulty,
    } = req.query

    let filteredData = formattedData

    if (queryBattletag) {
      filteredData = filteredData.filter(({ battleTag }) =>
        battleTag.name.toLowerCase().includes(queryBattletag.toLowerCase()),
      )
    }

    const totalPages = filteredData
      ? Math.ceil(filteredData?.length / pageSize)
      : 0

    const initialIndex = (Number(page) - 1) * pageSize

    let sortedData = filteredData

    if (sortKey) {
      sortedData = filteredData.sort((a, b) => {
        const condition = getSortConditionByKey(sortKey, a, b, difficulty)
        if (condition === undefined) return 0
        return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
      })
    }
    res.status(200).json({
      stats: sortedData.slice(initialIndex, initialIndex + pageSize),
      pages: totalPages,
    })
  } catch (error) {
    console.error('Error fetching times stats data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
