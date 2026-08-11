import { LeagueScoreboardBreakdown } from '@/interfaces/league'
import { BattleTag } from '@/interfaces/player'

export type BreakdownApiEntry = {
  player: BattleTag
  breakdown: LeagueScoreboardBreakdown
}

export type LeagueScoreboardBreakdownRow = LeagueScoreboardBreakdown & {
  battleTag: BattleTag
}

/**
 * Flattens league scoreboard API entries into table-ready row objects.
 *
 * @param stats - Raw API entries with nested player and breakdown fields.
 * @returns Flat rows with battleTag and all breakdown fields at the top level.
 */
export const formatBreakdownRows = (
  stats: BreakdownApiEntry[],
): LeagueScoreboardBreakdownRow[] =>
  stats.map(({ player, breakdown }) => ({ battleTag: player, ...breakdown }))
