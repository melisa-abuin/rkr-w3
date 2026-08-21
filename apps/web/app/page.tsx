import Home from '@rkr/dls/components/templates/home'
import {
  discordData,
  seasonScoreboardApi,
  seasonsApi,
} from '@rkr/dls/constants'
import { DiscordData as DiscordType } from '@rkr/dls/interfaces/discord'
import {
  LeagueScoreboardApiResponse,
  LeagueScoreboardEntry,
  LeagueSeason,
  LeagueSeasonsApiResponse,
} from '@rkr/dls/interfaces/league'
import { getCurrentSeason } from '@rkr/dls/utils'

interface CurrentSeasonData {
  hallOfFamePlayers: LeagueScoreboardEntry[]
  season?: LeagueSeason
}

async function getDiscordData(): Promise<DiscordType> {
  try {
    const response = await fetch(discordData, {
      next: { revalidate: 480 },
    })
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return {
      data: {
        approximateMemberCount: data?.approximate_member_count,
        approximatePresenceCount: data?.approximate_presence_count,
      },
      error: null,
      loading: false,
    }
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message,
      loading: false,
    }
  }
}

async function getCurrentSeasonData(): Promise<CurrentSeasonData> {
  try {
    const response = await fetch(seasonsApi, {
      next: { revalidate: 480 },
    })
    if (!response.ok) return { hallOfFamePlayers: [] }

    const seasons = (await response.json()) as LeagueSeasonsApiResponse
    const season = getCurrentSeason(seasons)
    if (!season) return { hallOfFamePlayers: [] }

    const scoreboardResponse = await fetch(seasonScoreboardApi(season.id), {
      next: { revalidate: 480 },
    })
    if (!scoreboardResponse.ok) return { hallOfFamePlayers: [], season }

    const rawScoreboard = await scoreboardResponse.json()
    const scoreboard: LeagueScoreboardApiResponse = Array.isArray(rawScoreboard)
      ? rawScoreboard
      : (rawScoreboard.stats ?? [])

    return {
      hallOfFamePlayers: scoreboard.slice(0, 3),
      season,
    }
  } catch {
    return { hallOfFamePlayers: [] }
  }
}

export default async function HomePage() {
  const [discordData, currentSeasonData] = await Promise.all([
    getDiscordData(),
    getCurrentSeasonData(),
  ])

  return (
    <main>
      <Home
        discordData={discordData}
        hallOfFamePlayers={currentSeasonData.hallOfFamePlayers}
      />
    </main>
  )
}
