import TextWithIcon from '@/components/atoms/textWithIcon'
import styles from './index.module.css'
import PositionCard from '@/components/molecules/positionCard'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import Button from '@/components/atoms/button'
import Tooltip from '@/components/atoms/tooltip'
import { GameStats } from '@/interfaces/game'
import { useState } from 'react'
import { Chevron } from '@/components/icons/chevron'

interface DesktopCardProps {
  date: string
  difficulty: Difficulty
  position: number
  showDifficulty: boolean
  teamMembers: string
  times: GameStats['times']
}

export default function DesktopCard({
  date,
  difficulty,
  position,
  showDifficulty,
  teamMembers,
  times,
}: DesktopCardProps) {
  const matchDate = formatDateToLocale(date)
  const members = teamMembers.split(', ')
  const [showRoundTimes, setShowRoundTimes] = useState(false)

  return (
    <div className={styles.desktopOnly}>
      <PositionCard position={position}>
        <div className={styles.detailContainer}>
          <div className={styles.row}>
            <div className={styles.info}>
              <div className={styles.wrapper}>
                <Tooltip body={formatSecondsAsTime(times.total, true)}>
                  <TextWithIcon colorName="tertiary" iconName="clock">
                    {formatSecondsAsTime(times.total, showRoundTimes)}
                  </TextWithIcon>
                </Tooltip>
                {!!times.roundOne && (
                  <button
                    className={styles.iconButton}
                    onClick={() => setShowRoundTimes((prev) => !prev)}
                  >
                    <Chevron
                      fill="var(--text-color-tertiary)"
                      flipped={!showRoundTimes}
                      height={16}
                      width={16}
                    />
                  </button>
                )}
              </div>

              {showRoundTimes && times.roundOne && (
                <div className={styles.wrapper}>
                  <small>Round times:</small>
                  <small>{formatSecondsAsTime(times.roundOne)}</small>
                  <small>{formatSecondsAsTime(times.roundTwo)}</small>
                  <small>{formatSecondsAsTime(times.roundThree)}</small>
                  <small>{formatSecondsAsTime(times.roundFour)}</small>
                  <small>{formatSecondsAsTime(times.roundFive)}</small>
                </div>
              )}
              {showDifficulty && (
                <TextWithIcon colorName="secondary" iconName="paw">
                  {difficulty}
                </TextWithIcon>
              )}
            </div>
            <span className={styles.date}>{matchDate}</span>
          </div>

          <div className={styles.wrapper}>
            {members.map((memeber) => (
              <Button
                key={memeber}
                small
                as="a"
                colorName="tertiary"
                href={`/player/${encodeURIComponent(memeber)}`}
                variant="solid"
              >
                {memeber.split('#')[0]}
              </Button>
            ))}
          </div>
        </div>
      </PositionCard>
    </div>
  )
}
