import { BattleTag, BestTime, Kibbles, Skins } from '../player'

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
  battleTag: BattleTag
  skins: Skins
  kibbles: Kibbles
}

export interface KibbleStats {
  battleTag: BattleTag
  kibbles: Kibbles
}
