import { BattleTag, PlayerColor } from '../player'

interface FastestRound {
  player: BattleTag
  time: number
}

export interface Tournament {
  id: number
  tournament_id: string
  region: string
  gamemode: 'Solo' | 'Team'
  game_type: string
  datetime: string
  admin_approved: number
  tournament_group_id: number | null
}

export interface TournamentApi {
  tournaments: TournamentFull[]
}

export interface TournamentFull {
  tournament: Tournament
  teams: TournamentTeam[]
}

export type Tournaments = Array<Tournament>

export interface TournamentPlayer {
  battleTag: string
  totalTime: number
  games: TournamentGame[]
}

export interface TournamentGame {
  id: number
  tournament_id: number
  battleTag: string
  game_number: number
  game_uid: string
  team: string
  team_members: string
  total_deaths: number
  total_progress: number
  total_saves: number
  totalTime: number
  rounds: TournamentRound[]
}

export interface TournamentRound {
  id: number
  game_id: number
  round_number: number
  deaths: number
  level: number
  progress: number
  round_time: number
  saves: number
}

export interface TournamentPlayerFormatted extends Omit<
  TournamentPlayer,
  'games' | 'battleTag'
> {
  battleTag: BattleTag | string
  games: TournamentGame[]
}

export interface TournamentTeamGame {
  game_number: number
  game_uid: string
  totalTime: number
}

export interface TournamentTeamMemberGame {
  game_number: number
  total_deaths: number
  total_saves: number
  total_progress: number
  totalTime?: number
  rounds: Omit<TournamentRound, 'id' | 'game_id'>[]
}

export interface TournamentTeamMember {
  battleTag: BattleTag
  totalTime?: number
  games: TournamentTeamMemberGame[]
}

export interface TournamentFormatted {
  tournament: {
    id: number
    tournamentId: string
    region: string
    gamemode: 'Solo' | 'Team'
    gameType: string
    datetime: string
    adminApproved: number
    groupId: number | null
  }
  fastestRounds?: {
    roundOne: FastestRound
    roundTwo: FastestRound
    roundThree: FastestRound
    roundFour: FastestRound
    roundFive: FastestRound
  }
  teams: TournamentTeam[]
}

export interface TournamentTeam {
  id: NonNullable<PlayerColor>
  color: NonNullable<PlayerColor>
  totalTime: number
  games: TournamentTeamGame[]
  members: TournamentTeamMember[]
}
