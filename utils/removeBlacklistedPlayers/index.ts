import { blacklistedPlayers } from '@/constants'
import { ApiPlayerStats } from '@/interfaces/player'

/**
 * Removes the playes that shouldn't be shown on production environments
 *
 * @param data list without blaclisted players
 */
export const removeBlacklistedPlayers = (data: ApiPlayerStats[]) =>
  data.filter(
    (elem: ApiPlayerStats) =>
      !blacklistedPlayers.find((player) => player === elem.battletag),
  )
