import { BattleTag, BestTime } from '../player'

interface Data {
  player: BattleTag
  data: number | BestTime
}

export interface LeaderboardCategories {
  category: string
  data: Data[]
  key: string
}
