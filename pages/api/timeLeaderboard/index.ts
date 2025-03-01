import { ApiPlayerStats, PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { findTopFive } from '@/utils/findTopFive'
import { mockApiData } from '@/constants'
import { removeBlacklistedPlayers } from '@/utils/removeBlacklistedPlayers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    let data = []

    if (process.env.NODE_ENV === 'development') {
      data = mockApiData
    } else {
      const response = await fetch(apiKey, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data = await response.json()
      data = removeBlacklistedPlayers(data)
    }

    const formattedData = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { RoundTimes, PlayerName } = saveData
      const playerStats: Partial<PlayerStats> = {}

      playerStats['battleTag'] = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'] as const

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      return playerStats as PlayerStats
    })

    const difficultyFilter = req.body.difficulty

    const stats = [
      {
        category: 'Round One',
        data: findTopFive(formattedData, 'roundOne', difficultyFilter),
        key: 'roundOne',
      },
      {
        category: 'Round Two',
        data: findTopFive(formattedData, 'roundTwo', difficultyFilter),
        key: 'roundTwo',
      },
      {
        category: 'Round Three',
        data: findTopFive(formattedData, 'roundThree', difficultyFilter),
        key: 'roundThree',
      },
      {
        category: 'Round Four',
        data: findTopFive(formattedData, 'roundFour', difficultyFilter),
        key: 'roundFour',
      },
      {
        category: 'Round Five',
        data: findTopFive(formattedData, 'roundFive', difficultyFilter),
        key: 'roundFive',
      },
    ]

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
