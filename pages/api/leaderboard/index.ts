import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { roundNames } from '@/constants'
import {
  calculateSaveDeathRatio,
  calculateTotals,
  fetchData,
  findTopPlayersByInsertion,
  formatRoundsData,
} from '@/utils'

/**
 * GET /api/leaderboard
 *
 * Returns the top 5 players for each leaderboard category across all difficulties.
 * No query parameters accepted.
 *
 * Response 200:
 * ```json
 * {
 *   "stats": [
 *     { "category": "Win Streak",       "key": "highestWinStreak", "data": [TopPlayer, ...] },
 *     { "category": "Saves",            "key": "saves",            "data": [TopPlayer, ...] },
 *     { "category": "Games Played",     "key": "gamesPlayed",      "data": [TopPlayer, ...] },
 *     { "category": "Wins",             "key": "wins",             "data": [TopPlayer, ...] },
 *     { "category": "Save/Death Ratio", "key": "saveDeathRatio",   "data": [TopPlayer, ...] }
 *   ],
 *   "times": [
 *     { "category": "Round One",   "key": "roundOne",   "data": [TopPlayer, ...] },
 *     { "category": "Round Two",   "key": "roundTwo",   "data": [TopPlayer, ...] },
 *     { "category": "Round Three", "key": "roundThree", "data": [TopPlayer, ...] },
 *     { "category": "Round Four",  "key": "roundFour",  "data": [TopPlayer, ...] },
 *     { "category": "Round Five",  "key": "roundFive",  "data": [TopPlayer, ...] }
 *   ]
 * }
 * ```
 *
 * Each TopPlayer entry:
 * ```json
 * {
 *   "player": { "name": "string", "tag": "string" },
 *   "data": number | { "time": number, "difficulty": string } | { "best": BestTime }
 * }
 * ```
 * — `data` is a plain number for stat categories (wins, saves, etc.),
 *   and a time object for round categories.
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 */
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=480, stale-while-revalidate=960',
    )
    const data = await fetchData('players')

    const formattedData = data
      .map((elem: ApiPlayerStats) => {
        // We need to format ONLY what is sent to the frontend
        const saveData = JSON.parse(elem['Save Data'])
        const { GameStats, RoundTimes, PlayerName } = saveData
        const playerStats: Partial<Player> = {}

        playerStats.saves = GameStats.Saves
        playerStats.highestWinStreak = GameStats.HighestWinStreak

        playerStats.battleTag = {
          name: PlayerName?.split('#')[0] || '',
          tag: PlayerName || '',
        }

        playerStats.saveDeathRatio = calculateSaveDeathRatio(
          GameStats.Saves,
          GameStats.Deaths,
        )

        playerStats.gamesPlayed = calculateTotals(
          GameStats.NormalGames,
          GameStats.HardGames,
          GameStats.ImpossibleGames,
          GameStats.NightmareGames,
          GameStats.ProgressiveGames,
        )

        playerStats.wins = calculateTotals(
          GameStats.NormalWins,
          GameStats.HardWins,
          GameStats.ImpossibleWins,
          GameStats.NightmareWins,
          GameStats.ProgressiveWins,
        )

        roundNames.forEach((round) => {
          playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
        })

        return playerStats
      })
      .sort((a: Player, b: Player) =>
        a.gamesPlayed.total < b.gamesPlayed.total ? 1 : -1,
      )

    const stats = {
      stats: [
        {
          category: 'Win Streak',
          data: findTopPlayersByInsertion(formattedData, 'highestWinStreak'),
          key: 'highestWinStreak',
        },
        {
          category: 'Saves',
          data: findTopPlayersByInsertion(formattedData, 'saves'),
          key: 'saves',
        },
        {
          category: 'Games Played',
          data: findTopPlayersByInsertion(formattedData, 'gamesPlayed'),
          key: 'gamesPlayed',
        },
        {
          category: 'Wins',
          data: findTopPlayersByInsertion(formattedData, 'wins'),
          key: 'wins',
        },
        {
          category: 'Save/Death Ratio',
          data: findTopPlayersByInsertion(formattedData, 'saveDeathRatio'),
          key: 'saveDeathRatio',
        },
      ],
      times: [
        {
          category: 'Round One',
          data: findTopPlayersByInsertion(formattedData, 'roundOne'),
          key: 'roundOne',
        },
        {
          category: 'Round Two',
          data: findTopPlayersByInsertion(formattedData, 'roundTwo'),
          key: 'roundTwo',
        },
        {
          category: 'Round Three',
          data: findTopPlayersByInsertion(formattedData, 'roundThree'),
          key: 'roundThree',
        },
        {
          category: 'Round Four',
          data: findTopPlayersByInsertion(formattedData, 'roundFour'),
          key: 'roundFour',
        },
        {
          category: 'Round Five',
          data: findTopPlayersByInsertion(formattedData, 'roundFive'),
          key: 'roundFive',
        },
      ],
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
