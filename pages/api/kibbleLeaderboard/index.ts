import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { transformKeysToCamelCase, fetchData } from '@/utils'

/**
 * GET /api/kibbleLeaderboard
 *
 * Returns the top 20 players ranked by kibbles collected in a single game, descending.
 * No query parameters accepted.
 *
 * Response 200 – array of up to 20 partial Player objects:
 * ```json
 * [
 *   {
 *     "battleTag": {
 *       "name": "string",   // display name (without #tag)
 *       "tag":  "string"    // full BattleTag including discriminator
 *     },
 *     "skins": {
 *       "selectedAura":     "string",
 *       "selectedHat":      "string",
 *       "selectedSkin":     "string",
 *       "selectedTrail":    "string",
 *       "selectedWindwalk": "string",
 *       "selectedWings":    "string"
 *     },
 *     "kibbles": {
 *       "allTime":      number,  // total kibbles collected across all games
 *       "jackpots":     number,  // total jackpots hit
 *       "superJackpots": number, // total super jackpots hit
 *       "singleGame":   number   // personal best kibbles in a single game (sort key)
 *     }
 *   }
 * ]
 * ```
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

    const formattedData: Player[] = data
      .map((elem: ApiPlayerStats) => {
        const saveData = JSON.parse(elem['Save Data'])

        const { PlayerName, KibbleCurrency, PersonalBests, SelectedData } =
          saveData
        const playerStats: Partial<Player> = {}

        playerStats.battleTag = {
          name: PlayerName?.split('#')[0] || '',
          tag: PlayerName || '',
        }

        playerStats.skins = transformKeysToCamelCase(SelectedData)

        playerStats.kibbles = {
          allTime: KibbleCurrency?.Collected ?? 0,
          jackpots: KibbleCurrency?.Jackpots ?? 0,
          superJackpots: KibbleCurrency?.SuperJackpots ?? 0,
          singleGame: PersonalBests?.KibbleCollected ?? 0,
        }

        return playerStats
      })
      .sort((a: Player, b: Player) => {
        return a.kibbles.singleGame < b.kibbles.singleGame ? 1 : -1
      })
      .slice(0, 20)

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching kibble leaderboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
