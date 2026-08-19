'use client'

import NameTag from '@/components/atoms/nameTag'
import PlayerTag from '@/components/molecules/playerTag'
import RowCard from '@/components/molecules/rowCard'
import { TournamentFormatted } from '@/interfaces/tournament'
import { formatSecondsAsTime, formatTeamMembers } from '@/utils'
import Column from './components/column'
import styles from './index.module.css'

interface TournamentSummaryProps {
  item: TournamentFormatted
}

export default function TournamentSummary({ item }: TournamentSummaryProps) {
  if (item.tournament.gamemode === 'Solo') {
    return (
      <div className={styles.container}>
        {item.teams[0]?.members.map((player, playerIndex) => {
          const battleTag =
            typeof player.battleTag === 'string'
              ? { name: player.battleTag, tag: player.battleTag }
              : player.battleTag

          return (
            <div key={battleTag.tag} className={styles.card}>
              <RowCard
                isSmallPosition
                ariaLabel={`Player card for ${battleTag.tag}`}
                position={playerIndex + 1}
              >
                <PlayerTag battleTag={battleTag} />
                <div className={styles.columnsContainer}>
                  <Column
                    description="Total Time"
                    value={formatSecondsAsTime(player.totalTime)}
                  />
                  {player.games.map((game, gameIndex) => (
                    <Column
                      key={gameIndex}
                      description={`Game ${gameIndex + 1}`}
                      value={formatSecondsAsTime(game.totalTime)}
                    />
                  ))}
                </div>
              </RowCard>
            </div>
          )
        })}
      </div>
    )
  }

  if (item.tournament.gamemode === 'Team') {
    return (
      <div className={styles.container}>
        {item.teams.map((team, teamIndex) => (
          <div key={team.color} className={styles.card}>
            <RowCard
              isSmallPosition
              ariaLabel={`Player card for ${team.color} team`}
              position={teamIndex + 1}
            >
              <NameTag subtitle={formatTeamMembers(team.members)}>
                {`${team.color} team`}
              </NameTag>

              <div className={styles.columnsContainer}>
                <Column
                  description="Total Time"
                  value={formatSecondsAsTime(team.totalTime)}
                />
                {team.games.map((game, gameIndex) => (
                  <Column
                    key={gameIndex}
                    description={`Game ${gameIndex + 1}`}
                    value={formatSecondsAsTime(game.totalTime)}
                  />
                ))}
              </div>
            </RowCard>
          </div>
        ))}
      </div>
    )
  }
  return null
}
