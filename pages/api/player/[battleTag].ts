import {
  calculateSaveDeathRatio,
  formatRoundsData,
  calculateTotals,
  formatGameAwardsPerPlayer,
  transformKeysToCamelCase,
  calculateWinRate,
  fetchData,
  calculateCompletedChallenges,
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

/**
 * GET /api/player/:battleTag
 *
 * Returns the full stats profile for a single player.
 *
 * Route parameters:
 *   - battleTag (required): player's BattleTag (e.g. "PlayerName#1234").
 *     The `#` discriminator is optional — partial tags are also accepted.
 *     Must be URL-encoded when the tag contains special characters.
 *
 * Response 200 – full `Player` object:
 * ```json
 * {
 *   "battleTag":          { "name": "string", "tag": "string" },
 *   "lastUploaded":       "string",
 *   "saves":              number,
 *   "deaths":             number,
 *   "saveDeathRatio":     number,
 *   "savesSingleGame":    number,
 *   "saveStreak":         { "highestScore": number, "redLightning": boolean, "patrioticTendrils": boolean },
 *   "wins":               { "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "total": number },
 *   "gamesPlayed":        { "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "total": number },
 *   "winRate":            "string",
 *   "winStreak":          number,
 *   "highestWinStreak":   number,
 *   "mostPlayedColor":    "string" | null,
 *   "kibbles":            { "allTime": number, "singleGame": number, "jackpots": number, "superJackpots": number },
 *   "completedChallenges": { "general": [number, number], "tournament": [number, number] },
 *   "awards":             [{ "id": "string", "awards": [{ "id": "string", "completed": boolean, "title": "string", "description": "string", "imagePath": "string" }] }],
 *   "skins":              { "selectedAura": "string", "selectedHat": "string", "selectedSkin": "string", "selectedTrail": "string", "selectedWindwalk": "string", "selectedWings": "string" },
 *   "bestGameTimes":      { "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "solo": number, "best": { "time": number, "difficulty": "string" } },
 *   "roundOne":           RoundTimes,
 *   "roundTwo":           RoundTimes,
 *   "roundThree":         RoundTimes,
 *   "roundFour":          RoundTimes,
 *   "roundFive":          RoundTimes,
 *   "fastestBesties":     { "1": [string], "2": [string], "3": [string] }
 * }
 * ```
 * Each `RoundTimes` has the shape:
 * `{ "normal": number, "hard": number, "impossible": number, "nightmare": number, "progressive": number, "solo": number, "best": { "time": number, "difficulty": "string" } }`
 *
 * Response 307 – redirect to `/` when the player is blacklisted.
 * Response 404 – `{ "message": "Player not found" }` when no matching player exists.
 * Response 500 – `{ "message": "Internal Server Error" }`
 */
export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=480, stale-while-revalidate=960',
    )
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
      return
    }

    const saveData = JSON.parse(playerData['Save Data'])
    const playerStats: Partial<Player> = {}
    const {
      GameStats,
      RoundTimes,
      PlayerName,
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

    playerStats.completedChallenges =
      calculateCompletedChallenges(GameAwardsSorted)

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

    playerStats.saveStreak = {
      highestScore: GameStats.HighestSaveStreak,
      redLightning: !!GameAwardsSorted.Trails.RedLightning,
      patrioticTendrils: !!GameAwardsSorted.Wings.PatrioticTendrils,
    }

    playerStats.awards = formatGameAwardsPerPlayer(GameAwardsSorted)
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

    playerStats.winRate = calculateWinRate(
      playerStats.wins.total,
      playerStats.gamesPlayed.total,
    )
    const {
      NormalGameTime,
      HardGameTime,
      ImpossibleGameTime,
      NightmareGameTime,
      ProgressiveGameTime,
    } = BestGameTimes || {}

    const normal = NormalGameTime?.Time || 0
    const hard = HardGameTime?.Time || 0
    const impossible = ImpossibleGameTime?.Time || 0
    const nightmare = NightmareGameTime?.Time || 0
    const progressive = ProgressiveGameTime?.Time || 0

    playerStats.bestGameTimes = {
      solo: 0,
      normal,
      hard,
      impossible,
      nightmare,
      progressive,
      best: calculateBestTimeByDifficulty({
        normal,
        hard,
        impossible,
        nightmare,
        progressive,
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
