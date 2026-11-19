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
 * @returns Flat rows with battleTag and all breakdown fields at the top level,
 * or an empty array when stats is not an array.
 */
export const formatBreakdownRows = (
  stats: BreakdownApiEntry[],
): LeagueScoreboardBreakdownRow[] =>
  Array.isArray(stats)
    ? stats.map(({ player, breakdown }) => ({
        battleTag: player,
        ...breakdown,
      }))
    : []
