import {
  ApiPlayerStats,
  FromattedApiPlayerStats,
  PlayerStats,
} from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { mapKeysToCamelCase } from '@/utils/mapKeysToCamelCase'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { mockApiData } from '@/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    const response = await fetch(apiKey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

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

      return playerStats
    })

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
