import {
  calculateSaveDeathRatio,
  formatRoundsData,
  calculateTotals,
  fetchData,
  findTopPlayersByInsertion,
} from '@/utils'
import { ApiPlayerStats, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { roundNames } from '@/constants'
import { ApiGameStats, GameStats } from '@/interfaces/game'

interface QueryParams {
  battleTag: string
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const { battleTag } = req.query

    if (!battleTag) {
      throw new Error('Please provide a valid battleTag')
    }

    const leaderboard = await fetchData('players')
    const bestGames = await fetchData('gametimes')

    const formattedLeaderboard = leaderboard.map((elem: ApiPlayerStats) => {
      // We need to format ONLY what is sent to the frontend
      const saveData = JSON.parse(elem['Save Data'])

      const {
        GameStats,
        RoundTimes,
        PlayerName,
        KibbleCurrency,
        PersonalBests,
      } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.saves = GameStats.Saves
      playerStats.highestWinStreak = GameStats.HighestWinStreak

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      playerStats.saveDeathRatio = calculateSaveDeathRatio(
        GameStats.Saves,
        GameStats.Deaths,
      )

      playerStats.gamesPlayed = calculateTotals(
        GameStats.NormalGames,
        GameStats.HardGames,
        GameStats.ImpossibleGames,
      )

      playerStats.wins = calculateTotals(
        GameStats.NormalWins,
        GameStats.HardWins,
        GameStats.ImpossibleWins,
      )

      roundNames.forEach((round) => {
        playerStats[`round${round}`] = formatRoundsData(RoundTimes, round)
      })

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          allTime: 0,
          jackpots: 0,
          superJackpots: 0,
          singleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          allTime: KibbleCurrency.Collected,
          jackpots: KibbleCurrency.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          singleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats
    })

    const formattedBestGames: GameStats[] = bestGames.map(
      (elem: ApiGameStats) => {
        const data = JSON.parse(elem.Data)

        const gameStats: Partial<GameStats> = {}
        gameStats.difficulty = elem.Difficulty

        gameStats.time = data.Time
        gameStats.teamMembers = data.TeamMembers
        return gameStats
      },
    )

    const tops = {
      saves: {
        label: 'Savior Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        all: findTopPlayersByInsertion(formattedLeaderboard, 'saves').findIndex(
          ({ player }) => player.tag === battleTag,
        ),
      },
      wins: {
        label: 'Victorious Kitty',
        description: 'This player is the top of the leaderboard for wins.',
        all: findTopPlayersByInsertion(formattedLeaderboard, 'wins').findIndex(
          ({ player }) => player.tag === battleTag,
        ),
      },
      highestWinStreak: {
        label: 'Unstoppable Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        all: findTopPlayersByInsertion(
          formattedLeaderboard,
          'highestWinStreak',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      gamesPlayed: {
        label: 'Addicted Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        all: findTopPlayersByInsertion(
          formattedLeaderboard,
          'gamesPlayed',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      saveDeathRatio: {
        label: 'Immortal Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        all: findTopPlayersByInsertion(
          formattedLeaderboard,
          'saveDeathRatio',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      roundOne: {
        label: 'Fastest Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        normal: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundOne',
          'normal',
        ).findIndex(({ player }) => player.tag === battleTag),
        hard: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundOne',
          'hard',
        ).findIndex(({ player }) => player.tag === battleTag),
        impossible: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundOne',
          'impossible',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      roundTwo: {
        label: 'Fastest Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        normal: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundTwo',
          'normal',
        ).findIndex(({ player }) => player.tag === battleTag),
        hard: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundTwo',
          'hard',
        ).findIndex(({ player }) => player.tag === battleTag),
        impossible: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundTwo',
          'impossible',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      roundThree: {
        label: 'Fastest Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        normal: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundThree',
          'normal',
        ).findIndex(({ player }) => player.tag === battleTag),
        hard: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundThree',
          'hard',
        ).findIndex(({ player }) => player.tag === battleTag),
        impossible: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundThree',
          'impossible',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      roundFour: {
        label: 'Fastest Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        normal: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundFour',
          'normal',
        ).findIndex(({ player }) => player.tag === battleTag),
        hard: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundFour',
          'hard',
        ).findIndex(({ player }) => player.tag === battleTag),
        impossible: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundFour',
          'impossible',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      roundFive: {
        label: 'Fastest Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        normal: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundFive',
          'normal',
        ).findIndex(({ player }) => player.tag === battleTag),
        hard: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundFive',
          'hard',
        ).findIndex(({ player }) => player.tag === battleTag),
        impossible: findTopPlayersByInsertion(
          formattedLeaderboard,
          'roundFive',
          'impossible',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      kibbles: {
        label: 'Hungriest Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        all: findTopPlayersByInsertion(
          formattedLeaderboard,
          'kibbles',
        ).findIndex(({ player }) => player.tag === battleTag),
      },
      fastestGames: {
        label: 'Fastest Team Kitty',
        description: 'This player is the top of the leaderboard for saves.',
        normal: formattedBestGames
          .filter(({ difficulty }) => difficulty === 'Normal')
          .sort((a: GameStats, b: GameStats) => a.time - b.time)
          .slice(0, 5)
          .findIndex(({ teamMembers }) => teamMembers.includes(battleTag)),
        hard: formattedBestGames
          .filter(({ difficulty }) => difficulty === 'Hard')
          .sort((a: GameStats, b: GameStats) => a.time - b.time)
          .slice(0, 5)
          .findIndex(({ teamMembers }) => teamMembers.includes(battleTag)),
        impossible: formattedBestGames
          .filter(({ difficulty }) => difficulty === 'Impossible')
          .sort((a: GameStats, b: GameStats) => a.time - b.time)
          .slice(0, 5)
          .findIndex(({ teamMembers }) => teamMembers.includes(battleTag)),
      },
    }
    console.log('tops', tops, battleTag)
    res.status(200).json(tops)
  } catch (error) {
    console.error('Error fetching player data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
