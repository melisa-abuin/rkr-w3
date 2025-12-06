import { Difficulty } from '../difficulty'

export interface GameStats {
  difficulty: Difficulty
  date: string
  teamMembers: string
  time: number
}

export interface ApiGameStats {
  GameDate: string
  Difficulty: Difficulty
  Data: string
  Invalid: number
}
export type GamesStats = GameStats[]
