import { ApiGameStats, GameStats } from '@/interfaces/game'
import { fetchData } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * GET /api/gameTimes
 *
 * Returns the top 20 fastest valid game completions, sorted by total time ascending.
 *
 * Query parameters:
 *   - difficulty (optional): filters results to a specific difficulty level
 *
 * Response 200 – array of up to 20 game stat objects:
 * ```json
 * [
 *   {
 *     "difficulty": "Easy" | "Normal" | "Hard" | ...,
 *     "date": "string",
 *     "teamMembers": "string",
 *     "times": {
 *       "roundOne":   number,
 *       "roundTwo":   number,
 *       "roundThree": number,
 *       "roundFour":  number,
 *       "roundFive":  number,
 *       "total":      number
 *     }
 *   }
 * ]
 * ```
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800',
    )
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
        gameStats.times = {
          roundFive: data.RoundFiveTime,
          roundFour: data.RoundFourTime,
          roundOne: data.RoundOneTime,
          roundThree: data.RoundThreeTime,
          roundTwo: data.RoundTwoTime,
          total: data.Time,
        }
        return gameStats
      })
      .sort((a: GameStats, b: GameStats) => a.times.total - b.times.total)
      .slice(0, 20)

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching game times data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
