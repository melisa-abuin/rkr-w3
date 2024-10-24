export interface PlayerStats {
  battletag: string
  saves: number
  deaths: number
  normal_games: number
  hard_games: number
  impossible_games: number
  highest_save_streak: number
  highest_win_streak: number
  normal_wins: number
  hard_wins: number
  impossible_wins: number
  round_1_time_normal: number
  round_2_time_normal: number
  round_3_time_normal: number
  round_4_time_normal: number
  round_5_time_normal: number
  round_1_time_hard: number
  round_2_time_hard: number
  round_3_time_hard: number
  round_4_time_hard: number
  round_5_time_hard: number
  round_1_time_impossible: number
  round_2_time_impossible: number
  round_3_time_impossible: number
  round_4_time_impossible: number
  round_5_time_impossible: number
  round_1_time_solo: number
  round_2_time_solo: number
  round_3_time_solo: number
  round_4_time_solo: number
  round_5_time_solo: number
  completed_challenges: string
}

export type PlayersStats = PlayerStats[]
