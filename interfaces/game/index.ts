import { Difficulty } from '../difficulty'

export interface GameStats {
  GameDate: string
  Difficulty: Difficulty
  Data: string
  Invalid: number
}

export interface GameStatsFormatted {
  difficulty: Difficulty
  date: string
  teamMembers: string
  roundOneTime: number
  roundTwoTime: number
  roundThreeTime: number
  roundFourTime: number
  roundFiveTime: number
  time: number
}

export interface BestGameTimeFormatted {
  difficulty: Difficulty
  date: string
  teamMembers: string
  roundOneTime: number
  roundTwoTime: number
  roundThreeTime: number
  roundFourTime: number
  roundFiveTime: number
  totalTime: number
}

export type BestGameTimesFormatted = BestGameTimeFormatted[]
