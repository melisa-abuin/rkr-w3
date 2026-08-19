'use client'

import CardsContainer from '@/components/atoms/cardsContainer'
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
    const players = item.teams[0]

    return (
      <CardsContainer title={`${item.tournament.region} region`}>
        {players.members.slice(0, 3).map((player, playerIndex) => {
          const battleTag =
            typeof player.battleTag === 'string'
              ? { name: player.battleTag, tag: player.battleTag }
              : player.battleTag

          return (
            <div key={battleTag.tag} className={styles.podium}>
              <RowCard
                isSmallPosition
                aria-label={`Player card for ${battleTag.tag}`}
                position={playerIndex + 1}
                variant="highlight"
              >
                <PlayerTag battleTag={battleTag} />
                <div className={styles.columnsContainer}>
                  <Column
                    description="Total Time"
                    value={formatSecondsAsTime(player.totalTime)}
                  />
                  {playerIndex === 0 &&
                    player.games.map((game, gameIndex) => (
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
      </CardsContainer>
    )
  }

  if (item.tournament.gamemode === 'Team') {
    return (
      <CardsContainer title={`${item.tournament.region} region`}>
        {item.teams.slice(0, 3).map((team, teamIndex) => {
          return (
            <div key={team.id} className={styles.podium}>
              <RowCard
                isSmallPosition
                aria-label={`Team card for ${team.id}`}
                position={teamIndex + 1}
                variant="highlight"
              >
                <NameTag subtitle={formatTeamMembers(team.members)}>
                  {`${team.color} team`}
                </NameTag>
                <div className={styles.columnsContainer}>
                  <Column
                    description="Total Time"
                    value={formatSecondsAsTime(team.members[0].totalTime)}
                  />
                  {teamIndex === 0 &&
                    team.members[0].games.map((game, gameIndex) => (
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
      </CardsContainer>
    )
  }
  return null
}
