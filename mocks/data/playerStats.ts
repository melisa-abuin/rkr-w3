import { KibbleLeaderboard } from '@/interfaces/leaderboard'
import { FastestBestiesData, Player } from '@/interfaces/player'

export const mockPlayerStats: { pages: number; stats: Player[] } = {
  pages: 1,
  stats: [],
}

export const mockKibbleLeaderboard: KibbleLeaderboard[] = []

export const mockFastestBesties: FastestBestiesData = {
  once: [],
  twice: [],
  threeOrMore: [],
}
