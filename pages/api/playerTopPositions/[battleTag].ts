import {
  calculateSaveDeathRatio,
  formatRoundsData,
  calculateTotals,
  fetchData,
} from '@/utils'
import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { roundNames } from '@/constants'
import { ApiGameStats, GameStats } from '@/interfaces/game'
import { formatPlayerTops } from '@/utils/formatPlayerTops'

interface QueryParams {
  battleTag: string
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const { battleTag } = req.query

    if (!battleTag) {
      throw new Error('Please provide a valid battleTag')
    }

    const leaderboard = await fetchData('players')
    const bestGames = await fetchData('gametimes')

    const formattedLeaderboard = leaderboard.map((elem: ApiPlayerStats) => {
      // We need to format ONLY what is sent to the frontend
      const saveData = JSON.parse(elem['Save Data'])

      const {
        GameStats,
        RoundTimes,
        PlayerName,
        KibbleCurrency,
        PersonalBests,
      } = saveData
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
      )

      playerStats.wins = calculateTotals(
        GameStats.NormalWins,
        GameStats.HardWins,
        GameStats.ImpossibleWins,
        GameStats.NightmareWins,
      )

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          allTime: 0,
          jackpots: 0,
          superJackpots: 0,
          singleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          allTime: KibbleCurrency.Collected,
          jackpots: KibbleCurrency.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          singleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats
    })

    const formattedBestGames: GameStats[] = bestGames.map(
      (elem: ApiGameStats) => {
        const data = JSON.parse(elem.Data)

        const gameStats: Partial<GameStats> = {}
        gameStats.difficulty = elem.Difficulty

        gameStats.time = data.Time
        gameStats.teamMembers = data.TeamMembers
        return gameStats
      },
    )

    const tops = formatPlayerTops(
      battleTag,
      formattedLeaderboard,
      formattedBestGames,
    )

    res.status(200).json(tops)
  } catch (error) {
    console.error('Error fetching player data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
