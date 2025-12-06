import { ApiGameStats, GameStats } from '@/interfaces/game'
import { fetchData } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const difficultyFilter = req.query?.difficulty

    const data = await fetchData(
      'gametimes',
      difficultyFilter ? `Difficulty=${difficultyFilter}` : '',
    )

    const formattedData = data
      .filter((elem: ApiGameStats) => elem.Invalid === 0)
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
      .slice(0, 20)

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching game times data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
