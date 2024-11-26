export interface PlayerStats {
  battleTag: BattleTag
  saves: number
  deaths: number
  highestSaveStreak: number
  highestWinStreak: number
  round1TimeSolo: number
  round2TimeSolo: number
  round3TimeSolo: number
  round4TimeSolo: number
  round5TimeSolo: number
  completedChallenges: string
  saveDeathRatio: number
  gamesPlayed: DifficultyStats
  wins: DifficultyStats
  r1: RoundStats
  r2: RoundStats
  r3: RoundStats
  r4: RoundStats
  r5: RoundStats
}

export interface FromattedApiPlayerStats {
  battleTag: string
  saves: number
  deaths: number
  normalGames: number
  hardGames: number
  impossibleGames: number
  highestSaveStreak: number
  highestWinStreak: number
  normalWins: number
  hardWins: number
  impossibleWins: number
  round1TimeNormal: number
  round2TimeNormal: number
  round3TimeNormal: number
  round4TimeNormal: number
  round5TimeNormal: number
  round1TimeHard: number
  round2TimeHard: number
  round3TimeHard: number
  round4TimeHard: number
  round5TimeHard: number
  round1TimeImpossible: number
  round2TimeImpossible: number
  round3TimeImpossible: number
  round4TimeImpossible: number
  round5TimeImpossible: number
  round1TimeSolo: number
  round2TimeSolo: number
  round3TimeSolo: number
  round4TimeSolo: number
  round5TimeSolo: number
  completedChallenges: string
}

export interface ApiPlayerStats {
  BattleTag: string
  Saves: number
  Deaths: number
  'Normal Games': number
  'Hard Games': number
  'Impossible Games': number
  'Highest Save Streak': number
  'Highest Win Streak': number
  'Normal Wins': number
  'Hard Wins': number
  'Impossible Wins': number
  'Round 1 Time : Normal': number
  'Round 2 Time : Normal': number
  'Round 3 Time : Normal': number
  'Round 4 Time : Normal': number
  'Round 5 Time : Normal': number
  'Round 1 Time : Hard': number
  'Round 2 Time : Hard': number
  'Round 3 Time : Hard': number
  'Round 4 Time : Hard': number
  'Round 5 Time : Hard': number
  'Round 1 Time : Impossible': number
  'Round 2 Time : Impossible': number
  'Round 3 Time : Impossible': number
  'Round 4 Time : Impossible': number
  'Round 5 Time : Impossible': number
  'Round 1 Time : Solo': number
  'Round 2 Time : Solo': number
  'Round 3 Time : Solo': number
  'Round 4 Time : Solo': number
  'Round 5 Time : Solo': number
  'Completed Challenges': string
}

export interface BattleTag {
  name: string
  tag: string
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
