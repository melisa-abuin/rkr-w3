import {
  calculateSaveDeathRatio,
  formatRoundsData,
  calculateTotals,
  formatGameAwards,
  transformKeysToCamelCase,
  calculateWinRate,
  fetchData,
  calculateCompletedChallenges,
  calculateCompletedChallengesLegacy,
  calculateBestTimeByDifficulty,
  getFastestBesties,
} from '@/utils'
import { Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { blacklistedPlayers, roundNames } from '@/constants'

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
    const playerStats: Partial<Player> = {}
    const {
      GameStats,
      RoundTimes,
      PlayerName,
      GameAwards,
      GameAwardsSorted,
      SelectedData,
      PlayerColorData,
      BestGameTimes,
      KibbleCurrency,
      PersonalBests,
    } = saveData

    playerStats.lastUploaded = playerData.UploadDate
    playerStats.saves = GameStats.Saves
    playerStats.deaths = GameStats.Deaths
    playerStats.highestWinStreak = GameStats.HighestWinStreak
    playerStats.winStreak = GameStats.WinStreak
    playerStats.mostPlayedColor = PlayerColorData
      ? PlayerColorData.MostPlayedColor
      : null

    if (GameAwardsSorted) {
      playerStats.completedChallenges =
        calculateCompletedChallenges(GameAwardsSorted)
    } else {
      playerStats.completedChallenges =
        calculateCompletedChallengesLegacy(GameAwards)
    }

    //TODO: make this a function
    if (!KibbleCurrency || !PersonalBests) {
      playerStats.kibbles = {
        allTime: 0,
        jackpots: 0,
        superJackpots: 0,
        singleGame: 0,
      }
    } else {
      playerStats.kibbles = {
        allTime: KibbleCurrency?.Collected,
        jackpots: KibbleCurrency?.Jackpots,
        superJackpots: KibbleCurrency.SuperJackpots,
        singleGame: PersonalBests.KibbleCollected,
      }
    }

    if (GameAwardsSorted) {
      playerStats.saveStreak = {
        highestScore: GameStats.HighestSaveStreak,
        redLightning: !!GameAwardsSorted.Trails.RedLightning,
        patrioticTendrils: !!GameAwardsSorted.Wings.PatrioticTendrils,
      }
    } else {
      playerStats.saveStreak = {
        highestScore: GameStats.HighestSaveStreak,
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
    const { NormalGameTime, HardGameTime, ImpossibleGameTime } =
      BestGameTimes || {}

    const normal = NormalGameTime?.Time || 0
    const hard = HardGameTime?.Time || 0
    const impossible = ImpossibleGameTime?.Time || 0

    playerStats.bestGameTimes = {
      solo: 0,
      normal,
      hard,
      impossible,
      best: calculateBestTimeByDifficulty({
        normal,
        hard,
        impossible,
      }),
    }

    roundNames.forEach((round) => {
      playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
    })

    playerStats.fastestBesties = getFastestBesties(PlayerName, BestGameTimes)
    playerStats.savesSingleGame = PersonalBests?.Saves || 0

    res.status(200).json(playerStats)
  } catch (error) {
    console.error('Error fetching player data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
