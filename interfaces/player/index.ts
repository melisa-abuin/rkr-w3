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
  save_death_ratio: number
  games_played: DifficultyStats
  wins: DifficultyStats
  r1: RoundStats
  r2: RoundStats
  r3: RoundStats
  r4: RoundStats
  r5: RoundStats
}

export interface RoundStats {
  hard: number
  normal: number
  impossible: number
  best: BestTime
}

export interface BestTime {
  time: number
  difficulty: 'normal' | 'hard' | 'impossible'
}

export interface DifficultyStats {
  hard: number
  normal: number
  impossible: number
  total: number
}

export type PlayersStats = PlayerStats[]
