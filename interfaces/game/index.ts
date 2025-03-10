import { Difficulty } from '../difficulty'

export interface GameStats {
  difficulty: Difficulty
  date: string
  teamMembers: string
  time: number
}

export interface ApiGameStats {
  GameDate: string
  Difficulty: string
  Data: string
}
export type GamesStats = GameStats[]
