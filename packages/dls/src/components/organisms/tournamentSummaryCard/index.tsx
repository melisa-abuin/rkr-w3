'use client'

import NameTag from '@/components/atoms/nameTag'
import ValueWithDescription from '@/components/atoms/valueWithDescription'
import PlayerTag from '@/components/molecules/playerTag'
import RowCard from '@/components/molecules/rowCard'
import { BattleTag } from '@/interfaces/player'
import { TournamentTeamMember } from '@/interfaces/tournament'
import { formatSecondsAsTime, formatTeamMembers } from '@/utils'
import styles from './index.module.css'

type LabelProps =
  | { gamemode: 'Solo'; battleTag: BattleTag }
  | { gamemode: 'Team'; color: string; members: TournamentTeamMember[] }

interface TournamentSummaryCardProps {
  ariaLabel: string
  games: Array<{ totalTime?: number }>
  position: number
  totalTime: number | undefined
  variant?: 'highlight'
}

export default function TournamentSummaryCard({
  ariaLabel,
  games,
  position,
  totalTime,
  variant,
  ...labelProps
}: TournamentSummaryCardProps & LabelProps) {
  const isHighlight = variant === 'highlight'

  return (
    <div className={isHighlight ? styles.podium : styles.card}>
      <RowCard
        isSmallPosition
        ariaLabel={ariaLabel}
        position={position}
        variant={variant}
      >
        {labelProps.gamemode === 'Solo' ? (
          <PlayerTag battleTag={labelProps.battleTag} />
        ) : (
          <NameTag subtitle={formatTeamMembers(labelProps.members)}>
            {`${labelProps.color} team`}
          </NameTag>
        )}
        <div className={styles.columnsContainer}>
          <ValueWithDescription
            description="Total Time"
            value={formatSecondsAsTime(totalTime)}
          />
          {(!isHighlight || position === 1) &&
            games.map((game, gameIndex) => (
              <ValueWithDescription
                key={gameIndex}
                description={`Game ${gameIndex + 1}`}
                value={formatSecondsAsTime(game.totalTime)}
              />
            ))}
        </div>
      </RowCard>
    </div>
  )
}
