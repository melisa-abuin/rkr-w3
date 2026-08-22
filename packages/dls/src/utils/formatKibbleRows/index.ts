import { KibbleRow } from '@/constants/tableColumns'
import { KibbleStats } from '@/interfaces/leaderboard'

/**
 * Flattens KibbleStats API entries into table-ready row objects.
 *
 * @param stats - Raw kibble stats from the API.
 * @returns Flat rows with battleTag and kibble fields at the top level.
 */
export const formatKibbleRows = (stats: KibbleStats[]): KibbleRow[] =>
  stats.map(({ battleTag, kibbles }) => ({ battleTag, ...kibbles }))
