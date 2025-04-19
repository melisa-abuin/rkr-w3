import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { roundNames } from '@/constants'
import { fetchData, findTopPlayersByInsertion, formatRoundsData } from '@/utils'

interface QueryParams {
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { RoundTimes, PlayerName } = saveData
      const playerStats: Partial<PlayerStats> = {}

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      return playerStats as PlayerStats
    })

    const difficultyFilter = req.query.difficulty

    const stats = [
      {
        category: 'Round One',
        data: findTopPlayersByInsertion(
          formattedData,
          'roundOne',
          difficultyFilter,
        ),
        key: 'roundOne',
      },
      {
        category: 'Round Two',
        data: findTopPlayersByInsertion(
          formattedData,
          'roundTwo',
          difficultyFilter,
        ),
        key: 'roundTwo',
      },
      {
        category: 'Round Three',
        data: findTopPlayersByInsertion(
          formattedData,
          'roundThree',
          difficultyFilter,
        ),
        key: 'roundThree',
      },
      {
        category: 'Round Four',
        data: findTopPlayersByInsertion(
          formattedData,
          'roundFour',
          difficultyFilter,
        ),
        key: 'roundFour',
      },
      {
        category: 'Round Five',
        data: findTopPlayersByInsertion(
          formattedData,
          'roundFive',
          difficultyFilter,
        ),
        key: 'roundFive',
      },
    ]

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
