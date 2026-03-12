import { GameStats } from '@/interfaces/game'
import { Player, Tops } from '@/interfaces/player'
import { findTopPlayersByInsertion } from '../findTopPlayers'
import { Difficulty } from '@/interfaces/difficulty'
import { topStatsConfiguration } from '@/constants'

type KeyOfPlayer = keyof Player

const roundKeys: KeyOfPlayer[] = [
  'roundOne',
  'roundTwo',
  'roundThree',
  'roundFour',
  'roundFive',
]

/**
 * Gets a player's rank index among the top 5 fastest games for a difficulty.
 *
 * @param bestGames Formatted best games dataset.
 * @param diff Difficulty to filter by.
 * @param battleTag Player tag to locate within team members.
 * @returns Zero-based index in the top-5 list, or `-1` when the player is not present.
 */
const sortFastestGamesByDifficulty = (
  bestGames: GameStats[],
  diff: Difficulty,
  battleTag: string,
) =>
  bestGames
    .filter(({ difficulty }) => difficulty.toLowerCase() === diff.toLowerCase())
    .sort((a, b) => a.times.total - b.times.total)
    .slice(0, 5)
    .findIndex(({ teamMembers }) => teamMembers.includes(battleTag))

/**
 * Builds top-position metadata for a specific player.
 *
 * The result includes:
 * - global top stats from `topStatsConfiguration` (`all` ranking)
 * - round-based fastest rankings per difficulty
 * - fastest team game participation rankings per difficulty
 *
 * Ranking fields use zero-based indexes from `findIndex`; `-1` means the player
 * is not present in the corresponding top list.
 *
 * @param battleTag Player tag used to locate entries in leaderboard/game data.
 * @param formattedLeaderboard Leaderboard dataset used for top-player ranking.
 * @param formattedBestGames Best games dataset used for fastest team rankings.
 * @returns A `Tops` object consumed by player dashboard badges and tooltips.
 */
export const formatPlayerTops = (
  battleTag: string,
  formattedLeaderboard: Player[],
  formattedBestGames: GameStats[],
) => {
  /** Creates one round entry with fastest rankings by difficulty. */
  const fastestKittyEntry = (roundKey: KeyOfPlayer) => ({
    label: 'Fastest Kitty',
    description: 'This player has one of the fastest times for a round.',
    normal: findTopPlayersByInsertion(
      formattedLeaderboard,
      roundKey,
      'normal',
    ).findIndex(({ player }) => player.tag === battleTag),
    hard: findTopPlayersByInsertion(
      formattedLeaderboard,
      roundKey,
      'hard',
    ).findIndex(({ player }) => player.tag === battleTag),
    impossible: findTopPlayersByInsertion(
      formattedLeaderboard,
      roundKey,
      'impossible',
    ).findIndex(({ player }) => player.tag === battleTag),
    nightmare: findTopPlayersByInsertion(
      formattedLeaderboard,
      roundKey,
      'nightmare',
    ).findIndex(({ player }) => player.tag === battleTag),
  })

  const fastestGamesEntry = {
    label: 'Fastest Team Kitty',
    description: 'This player has participated in the fastest games.',
    normal: sortFastestGamesByDifficulty(
      formattedBestGames,
      'normal',
      battleTag,
    ),
    hard: sortFastestGamesByDifficulty(formattedBestGames, 'hard', battleTag),
    impossible: sortFastestGamesByDifficulty(
      formattedBestGames,
      'impossible',
      battleTag,
    ),
  }

  const tops: Tops = {}

  topStatsConfiguration.forEach(({ key, label, description }) => {
    tops[key] = {
      label,
      description,
      all: findTopPlayersByInsertion(formattedLeaderboard, key).findIndex(
        ({ player }) => player.tag === battleTag,
      ),
    }
  })

  roundKeys.forEach((roundKey) => {
    tops[roundKey] = fastestKittyEntry(roundKey)
  })

  tops['fastestGames'] = fastestGamesEntry

  return tops
}
