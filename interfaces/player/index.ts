import { Difficulty } from '../difficulty'

export type Challenges = [number, number]

export interface Award {
  id: string
  completed: boolean
  description: string
  imagePath: string
}

export interface Skins {
  selectedAura: string
  selectedHat: string
  selectedSkin: string
  selectedTrail: string
  selectedWindwalk: string
  selectedWings: string
}

export interface PlayerStats {
  battleTag: BattleTag
  saves: number
  deaths: number
  highestSaveStreak: number
  highestWinStreak: number
  completedChallenges: Challenges
  saveDeathRatio: number
  gamesPlayed: DifficultyStats
  winRate: string
  wins: DifficultyStats
  roundOne: RoundStats
  roundTwo: RoundStats
  roundThree: RoundStats
  roundFour: RoundStats
  roundFive: RoundStats
  awards?: Award[]
  skins?: Skins
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
  RoundOneNormal: number
  RoundTwoNormal: number
  RoundThreeNormal: number
  RoundFourNormal: number
  RoundFiveNormal: number
  RoundOneHard: number
  RoundTwoHard: number
  RoundThreeHard: number
  RoundFourHard: number
  RoundFiveHard: number
  RoundOneImpossible: number
  RoundTwoImpossible: number
  RoundThreeImpossible: number
  RoundFourImpossible: number
  RoundFiveImpossible: number
  completedChallenges: string
}

export interface ApiPlayerStats {
  BattleTag: string
  'Save Data': string
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
  difficulty: Difficulty
}

export interface DifficultyStats {
  hard: number
  normal: number
  impossible: number
  total: number
}

export type PlayersStats = PlayerStats[]
