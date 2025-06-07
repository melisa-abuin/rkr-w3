import { GameStats } from '@/interfaces/game'
import { Player } from '@/interfaces/player'
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

type Tops = Record<
  string,
  {
    label: string
    description: string
    all?: number
    normal?: number
    hard?: number
    impossible?: number
  }
>

const sortFastestGamesByDifficulty = (
  bestGames: GameStats[],
  diff: Difficulty,
  battleTag: string,
) =>
  bestGames
    .filter(({ difficulty }) => difficulty.toLowerCase() === diff.toLowerCase())
    .sort((a, b) => a.time - b.time)
    .slice(0, 5)
    .findIndex(({ teamMembers }) => teamMembers.includes(battleTag))

export const formatPlayerTops = (
  battleTag: string,
  formattedLeaderboard: Player[],
  formattedBestGames: GameStats[],
) => {
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
