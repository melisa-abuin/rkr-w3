import { NextApiRequest, NextApiResponse } from 'next'
import { formatSaveDataFile, fetchData } from '@/utils'

interface QueryParams {
  battleTag: string
}
type StatsRequest = NextApiRequest & { query: QueryParams }

/**
 * GET /api/downloadPlayerStats/:battleTag
 *
 * Downloads the raw save data for a specific player as a plain-text file.
 *
 * Route parameters:
 *   - battleTag (required): the player's full BattleTag (e.g. "PlayerName#1234").
 *     Must be URL-encoded when passed in the URL.
 *
 * Response 200 – a plain-text file download:
 *   Content-Type:        text/plain
 *   Content-Disposition: attachment; filename="file.txt"
 *   Body:                formatted save data string produced by formatSaveDataFile()
 *
 * Response 500 – `{ "message": "Internal Server Error" }`
 *   Also returned when battleTag is missing or the player is not found.
 */
export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800',
    )
    const { battleTag } = req.query

    if (!battleTag) {
      throw new Error('Please provide a valid battleTag')
    }

    const data = await fetchData(
      'players',
      `battletag=${encodeURIComponent(battleTag)}`,
    )

    const playerData = data[0]

    const fileFormattedSaveData = formatSaveDataFile(playerData['Save Data'])

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', 'attachment; filename="file.txt"')
    res.status(200)
    res.send(fileFormattedSaveData)
  } catch (error) {
    console.error('Error fetch data to download:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
