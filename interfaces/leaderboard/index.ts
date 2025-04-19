import { BattleTag, BestTime, Kibbles } from '../player'

interface Data {
  player: BattleTag
  data: number | BestTime
}

export interface LeaderboardCategories {
  category: string
  data: Data[]
  key: string
}

export interface KibbleLeaderboard {
  player: BattleTag
  data: Kibbles
}
