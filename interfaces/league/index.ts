import { Difficulty } from '../difficulty'
import { LeaderboardCategories } from '../leaderboard'
import { BattleTag } from '../player'

export interface LeagueSeason {
  id: number
  leagueId: string
  description: string
  startDate: string
  endDate: string
}

export type LeagueSeasonsApiResponse = LeagueSeason[]

interface LeagueStatEntry {
  battleTag: BattleTag
  data: number
}

interface LeagueTimeEntry {
  battleTag: BattleTag
  time: number
  difficulty: Difficulty
}

export interface LeagueStatCategory {
  category: string
  key: string
  data: LeagueStatEntry[]
}

export interface LeagueTimeCategory {
  category: string
  key: string
  data: LeagueTimeEntry[]
}

export interface LeagueLeaderboardApiResponse {
  stats: LeaderboardCategories[]
  times: LeaderboardCategories[]
}

export interface LeagueScoreboardBreakdown {
  weightedWins: number
  weightedLosses: number
  saveRatio: number
  nitroScore: number
  streakBonus: number
  deathlessBonus: number
  kibbleBonus: number
  gameSpeedBonus: number
  roundSpeedBonus: number
  totalScore: number
}

export interface LeagueScoreboardEntry {
  rank: number
  player: {
    name: string
    tag: string
  }
  leagueScore: number
  breakdown: LeagueScoreboardBreakdown
}

export type LeagueScoreboardApiResponse = LeagueScoreboardEntry[]
