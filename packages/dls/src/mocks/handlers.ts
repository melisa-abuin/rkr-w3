import {
  awardsStatsApi,
  bestGameTimesTopApi,
  featuredApi,
  playersApi,
  playersLeaderboardApi,
  playersSummaryApi,
  playerStatsApi,
  playerStatsFastestBestiesApi,
  playerStatsKibbleLeaderboardApi,
  playersTimeLeaderboardApi,
  tournamentsBaseApi,
  tournamentsFullApi,
} from '@/constants'
import { http, HttpResponse } from 'msw'
import { mockAwardsStats } from './data/awards'
import { mockBestGameTimes } from './data/bestGameTimes'
import { mockFeaturedApiResponse } from './data/featured'
import { mockLeaderboard } from './data/leaderboard'
import { mockApiData } from './data/players'
import {
  mockFastestBesties,
  mockKibbleLeaderboard,
  mockPlayerStats,
  mockTops,
} from './data/playerStats'
import { mockPlayerSummary } from './data/playerSummary'
import { mockTournaments } from './data/tournaments'

// bestGameTimesTopApi embeds ?count=20 — strip it so MSW matches by path only
const bestGameTimesTopPath = bestGameTimesTopApi.split('?')[0]

export const handlers = [
  // Players — specific paths before the base /players route
  http.get(playersLeaderboardApi, () => HttpResponse.json(mockLeaderboard)),
  http.get(playersSummaryApi, () => HttpResponse.json(mockPlayerSummary)),
  http.get(playersTimeLeaderboardApi, () => HttpResponse.json(mockLeaderboard)),
  http.get(playersApi, () => HttpResponse.json(mockApiData)),

  // Tournaments — full before base
  http.get(tournamentsFullApi, () => HttpResponse.json(mockTournaments)),
  http.get(tournamentsBaseApi, () => HttpResponse.json(mockTournaments)),

  // Player stats — specific sub-paths before the wildcard
  http.get(playerStatsKibbleLeaderboardApi, () =>
    HttpResponse.json(mockKibbleLeaderboard),
  ),
  http.get(playerStatsFastestBestiesApi, () =>
    HttpResponse.json(mockFastestBesties),
  ),
  http.get(`${playerStatsApi}/:filter`, () =>
    HttpResponse.json(mockPlayerStats),
  ),

  // Awards
  http.get(awardsStatsApi, () => HttpResponse.json(mockAwardsStats)),

  // Best game times
  http.get(bestGameTimesTopPath, () => HttpResponse.json(mockBestGameTimes)),

  // Player tops (used by playerDashboard Header)
  http.get(`${playersApi}/:battleTag/tops`, () => HttpResponse.json(mockTops)),

  // Featured content
  http.get(featuredApi, () => HttpResponse.json(mockFeaturedApiResponse)),
]
