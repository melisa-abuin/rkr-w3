import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { DetailedPlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { calculateTotals } from '@/utils/calculateTotals'
import { blacklistedPlayers, roundNames } from '@/constants'
import { formatGameAwards } from '@/utils/formatGameAwards'
import { transformKeysToCamelCase } from '@/utils/transformKeysToCamelCase'
import { calculateWinRate } from '@/utils/calculateWinRate'
import { fetchData } from '@/utils/fetchData'
import {
  calculateCompletedChallenges,
  calculateCompletedChallengesLegacy,
} from '@/utils/calculateCompletedChallenges'

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

    const data = await fetchData(
      'players',
      `battletag=${battleTag.includes('#') ? encodeURIComponent(battleTag) : battleTag}`,
    )

    const playerData = data[0]

    if (!playerData) {
      return res.status(404).json({ message: 'Player not found' })
    }

    if (blacklistedPlayers.find((player) => player === playerData.battletag)) {
      res.redirect(307, '/')
    }

    const saveData = JSON.parse(playerData['Save Data'])
    const playerStats: Partial<DetailedPlayerStats> = {}
    const {
      GameStats,
      RoundTimes,
      PlayerName,
      GameAwards,
      GameAwardsSorted,
      SelectedData,
    } = saveData

    playerStats.lastUploaded = playerData.UploadDate
    playerStats.saves = GameStats.Saves
    playerStats.deaths = GameStats.Deaths
    playerStats.highestWinStreak = GameStats.HighestWinStreak
    playerStats.winStreak = GameStats.WinStreak

    if (GameAwardsSorted) {
      playerStats.completedChallenges =
        calculateCompletedChallenges(GameAwardsSorted)
    } else {
      playerStats.completedChallenges =
        calculateCompletedChallengesLegacy(GameAwards)
    }

    if (GameAwardsSorted) {
      playerStats.saveStreak = {
        highestSaveStreak: GameStats.HighestSaveStreak,
        redLightning: !!GameAwardsSorted.Trails.RedLightning,
        patrioticTendrils: !!GameAwardsSorted.Wings.PatrioticTendrils,
      }
    } else {
      playerStats.saveStreak = {
        highestSaveStreak: GameStats.HighestSaveStreak,
        redLightning: !!GameAwards.RedLightning,
        patrioticTendrils: !!GameAwards.PatrioticTendrils,
      }
    }

    playerStats.awards = formatGameAwards(GameAwardsSorted)
    playerStats.skins = transformKeysToCamelCase(SelectedData)
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
    )

    playerStats.wins = calculateTotals(
      GameStats.NormalWins,
      GameStats.HardWins,
      GameStats.ImpossibleWins,
    )

    playerStats.winRate = calculateWinRate(
      playerStats.wins.total,
      playerStats.gamesPlayed.total,
    )

    roundNames.forEach((round) => {
      playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
    })

    res.status(200).json(playerStats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
