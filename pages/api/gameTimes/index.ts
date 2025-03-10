import { NextApiRequest, NextApiResponse } from 'next'
import { ApiGameStats, GameStats } from '@/interfaces/game'
import { mockGameApiData } from '@/constants/mock'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    let data = []

    if (process.env.NODE_ENV === 'development') {
      data = mockGameApiData
    } else {
      const response = await fetch(`${apiKey}gametimes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data = await response.json()
    }

    const formattedData = data
      .map((elem: ApiGameStats) => {
        const data = JSON.parse(elem.Data)

        const gameStats: Partial<GameStats> = {}
        gameStats.difficulty = elem.Difficulty
        gameStats.date = data.Date
        gameStats.teamMembers = data.TeamMembers
        gameStats.time = data.Time
        return gameStats
      })
      .sort((a: GameStats, b: GameStats) => a.time - b.time)
      .slice(0, 5)

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
