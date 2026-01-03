import { Difficulty } from '../difficulty'

export interface GameStats {
  difficulty: Difficulty
  date: string
  teamMembers: string
  times: {
    roundFive: number
    roundFour: number
    roundOne: number
    roundThree: number
    roundTwo: number
    total: number
  }
}

export interface ApiGameStats {
  GameDate: string
  Difficulty: Difficulty
  Data: string
  Invalid: number
}
export type GamesStats = GameStats[]
