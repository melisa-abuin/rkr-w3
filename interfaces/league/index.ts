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
