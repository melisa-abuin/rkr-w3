import { awardsStats, playersLeaderboard, playersSummary } from '@/constants'
import { ApiAward } from '@/interfaces/award'
import { FeaturedContent } from '@/interfaces/featured'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import { BattleTag, Player } from '@/interfaces/player'
import type { NextApiRequest, NextApiResponse } from 'next'

const FEATURED_COUNT = 3

interface LeaderboardResponse {
  stats: LeaderboardCategories[]
  times: LeaderboardCategories[]
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count)
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FeaturedContent | { error: string }>,
) {
  try {
    const [awardsRes, leaderboardRes] = await Promise.all([
      fetch(awardsStats),
      fetch(playersLeaderboard),
    ])

    if (!awardsRes.ok || !leaderboardRes.ok) {
      return res.status(502).json({ error: 'Failed to fetch featured data' })
    }

    const awards = (await awardsRes.json()) as ApiAward[]
    const leaderboard = (await leaderboardRes.json()) as LeaderboardResponse

    const battleTags: BattleTag[] = leaderboard.stats.flatMap((category) =>
      category.data.map((entry) => entry.player),
    )

    if (!awards.length || !battleTags.length) {
      return res.status(404).json({ error: 'No data available' })
    }

    const challenges = pickRandom(awards, FEATURED_COUNT)
    const selectedTags = pickRandom(battleTags, FEATURED_COUNT)

    const summaryResults = await Promise.allSettled(
      selectedTags.map((tag) =>
        fetch(
          `${playersSummary}?battleTag=${encodeURIComponent(tag.tag)}`,
        ).then((r) =>
          r.ok ? (r.json() as Promise<Player[]>) : Promise.reject(),
        ),
      ),
    )

    const players = summaryResults
      .filter(
        (r): r is PromiseFulfilledResult<Player[]> =>
          r.status === 'fulfilled' && r.value.length > 0,
      )
      .map((r) => r.value[0])

    if (!players.length) {
      return res.status(404).json({ error: 'Player not found' })
    }

    const featured: FeaturedContent = { challenges, players }

    return res.status(200).json(featured)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
