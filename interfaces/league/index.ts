import { Difficulty } from '../difficulty'

export interface LeagueSeason {
  id: number
  leagueId: string
  description: string
  startDate: string
  endDate: string
}

export type LeagueSeasonsApiResponse = LeagueSeason[]

interface LeagueStatEntry {
  battleTag: string
  data: number
}

interface LeagueTimeEntry {
  battleTag: string
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
  stats: LeagueStatCategory[]
  times: LeagueTimeCategory[]
}
