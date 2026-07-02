import {
  awardsStatsApi,
  playersLeaderboardApi,
  playersSummaryApi,
} from '@/constants'
import { ApiAward } from '@/interfaces/award'
import { FeaturedContent, FeaturedItem } from '@/interfaces/featured'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import { BattleTag, Player } from '@/interfaces/player'
import { formatSecondsAsTime } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const FEATURED_COUNT = 3

interface LeaderboardResponse {
  stats: LeaderboardCategories[]
  times: LeaderboardCategories[]
}

function getWeekSeed(): number {
  return Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
}

function seededRandom(seed: number): () => number {
  let s = seed >>> 0
  return (): number => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 4294967296
  }
}

function pickWithSeed<T>(arr: T[], count: number, seed: number): T[] {
  const rand = seededRandom(seed)
  return [...arr]
    .map((item) => ({ item, r: rand() }))
    .sort((a, b) => a.r - b.r)
    .slice(0, count)
    .map(({ item }) => item)
}

const toPlayerItem = (p: Player): FeaturedItem => ({
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

    const awards = (await awardsRes.json()) as ApiAward[]
    const leaderboard = (await leaderboardRes.json()) as LeaderboardResponse

    const battleTags: BattleTag[] = leaderboard.stats.flatMap((category) =>
      category.data.map((entry) => entry.player),
    )

    if (!awards.length || !battleTags.length) {
      return res.status(404).json({ error: 'No data available' })
    }

    const weekSeed = getWeekSeed()
    const selectedChallenges = pickWithSeed(awards, FEATURED_COUNT, weekSeed)
    const selectedTags = pickWithSeed(battleTags, FEATURED_COUNT, weekSeed + 1)

    const summaryResults = await Promise.allSettled(
      selectedTags.map((tag) =>
        fetch(
          `${playersSummaryApi}?battleTag=${encodeURIComponent(tag.tag)}`,
        ).then((r) =>
          r.ok ? (r.json() as Promise<Player[]>) : Promise.reject(),
        ),
      ),
    )

    const players: FeaturedItem[] = summaryResults
      .filter(
        (r): r is PromiseFulfilledResult<Player[]> =>
          r.status === 'fulfilled' && r.value.length > 0,
      )
      .map((r) => toPlayerItem(r.value[0]))

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
