import {
  awardsStatsApi,
  playersLeaderboardApi,
  playersSummaryApi,
} from '@/constants'
import { ApiAward } from '@/interfaces/award'
import { FeaturedContent, FeaturedItem } from '@/interfaces/featured'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import { BattleTag, PlayerSummary } from '@/interfaces/player'
import { formatSecondsAsTime } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const FEATURED_COUNT = 3

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count)
}

interface LeaderboardResponse {
  stats: LeaderboardCategories[]
  times: LeaderboardCategories[]
}

const toPlayerItem = (p: PlayerSummary): FeaturedItem => ({
  imageSrc: p.selectedSkin
    ? `/awards/${p.selectedSkin[0].toLowerCase()}${p.selectedSkin.slice(1)}.png`
    : '/potm.png',
  imageFallbackSrc: '/potm.png',
  label: p.battleTag.name,
  subLabel: formatSecondsAsTime(p.roundFive?.best?.time),
})

const toChallengeItem = (c: ApiAward): FeaturedItem => ({
  imageSrc: `/awards/${c.key[0].toLowerCase()}${c.key.slice(1)}.png`,
  imageFallbackSrc: '/awards/fallback.png',
  label: c.displayName,
  subLabel: `${c.percentage}%`,
})

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FeaturedContent | { error: string }>,
) {
  try {
    const [awardsRes, leaderboardRes] = await Promise.all([
      fetch(awardsStatsApi),
      fetch(playersLeaderboardApi),
    ])

    if (!awardsRes.ok || !leaderboardRes.ok) {
      return res.status(502).json({ error: 'Failed to fetch featured data' })
    }

    const awards: ApiAward[] = await awardsRes.json()
    const leaderboard: LeaderboardResponse = await leaderboardRes.json()

    const allTags = leaderboard.stats.flatMap((category) =>
      category.data.map((entry) => entry.player),
    )

    const battleTags: BattleTag[] = [
      ...new Map(allTags.map((tag) => [tag.tag, tag])).values(),
    ]

    if (!awards.length || !battleTags.length) {
      return res.status(404).json({ error: 'No data available' })
    }

    const selectedChallenges = pickRandom(awards, FEATURED_COUNT)
    const selectedTags = pickRandom(battleTags, FEATURED_COUNT)

    const players: FeaturedItem[] = (
      await Promise.allSettled(
        selectedTags.map((tag) =>
          fetch(
            `${playersSummaryApi}?battleTag=${encodeURIComponent(tag.tag)}`,
          ).then(
            (r): Promise<PlayerSummary[]> =>
              r.ok ? r.json() : Promise.reject(),
          ),
        ),
      )
    ).flatMap((r) =>
      r.status === 'fulfilled' && r.value.length > 0
        ? [toPlayerItem(r.value[0])]
        : [],
    )

    if (!players.length) {
      return res.status(404).json({ error: 'Player not found' })
    }

    const featured: FeaturedContent = {
      players,
      challenges: selectedChallenges.map(toChallengeItem),
    }

    return res.status(200).json(featured)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
