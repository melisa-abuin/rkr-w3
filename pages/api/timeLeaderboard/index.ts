import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { roundNames } from '@/constants'
import { fetchData, findTopPlayersByInsertion, formatRoundsData } from '@/utils'

interface QueryParams {
  difficulty?: 'normal' | 'hard' | 'impossible' | undefined
}

type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/timeLeaderboard
 *
 * Returns the top 5 players for each round category, optionally filtered by difficulty.
 *
 * Query parameters:
 *   - difficulty (optional): restricts rankings to a specific difficulty —
 *                            "normal" | "hard" | "impossible"
 *
 * Response 200 – array of 5 round categories:
 * ```json
 * [
 *   {
 *     "category": "Round One" | "Round Two" | "Round Three" | "Round Four" | "Round Five",
 *     "key":      "roundOne" | "roundTwo" | "roundThree" | "roundFour" | "roundFive",
 *     "data": [
 *       {
 *         "player": { "name": "string", "tag": "string" },
 *         "data":   { "time": number, "difficulty": "string" } | { "best": { "time": number, "difficulty": "string" } }
 *       }
 *     ]
 *   }
 * ]
 * ```
 * When `difficulty` is provided, `data` contains `{ time, difficulty }`;
 * otherwise it contains the player's all-time best `{ best: { time, difficulty } }`.
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 */
export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800',
    )
    const data = await fetchData('players')

    const formattedData = data.map((elem: ApiPlayerStats) => {
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

      return playerStats as Player
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
    console.error('Error fetching times leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
