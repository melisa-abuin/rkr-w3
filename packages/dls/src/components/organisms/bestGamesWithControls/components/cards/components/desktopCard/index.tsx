'use client'

import Button from '@/components/atoms/button'
import TextWithIcon from '@/components/atoms/textWithIcon'
import Tooltip from '@/components/atoms/tooltip'
import { Chevron } from '@/components/icons/chevron'
import RowCard from '@/components/molecules/rowCard'
import { Difficulty } from '@/interfaces/difficulty'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import { useState } from 'react'
import styles from './index.module.css'

interface DesktopCardProps {
  date: string
  difficulty: Difficulty
  position: number
  showDifficulty: boolean
  teamMembers: string
  roundOneTime: number
  roundTwoTime: number
  roundThreeTime: number
  roundFourTime: number
  roundFiveTime: number
  totalTime: number
}

export default function DesktopCard({
  date,
  difficulty,
  position,
  showDifficulty,
  teamMembers,
  roundOneTime,
  roundTwoTime,
  roundThreeTime,
  roundFourTime,
  roundFiveTime,
  totalTime,
}: DesktopCardProps) {
  const matchDate = formatDateToLocale(date)
  const members = teamMembers.split(', ')
  const [showRoundTimes, setShowRoundTimes] = useState(false)

  return (
    <div className={styles.desktopOnly}>
      <RowCard position={position}>
        <div className={styles.detailContainer}>
          <div className={styles.row}>
            <div className={styles.info}>
              <div className={styles.wrapper}>
                <Tooltip body={formatSecondsAsTime(totalTime, true)}>
                  <TextWithIcon colorName="tertiary" iconName="clock">
                    {formatSecondsAsTime(totalTime, showRoundTimes)}
                  </TextWithIcon>
                </Tooltip>
                {!!roundOneTime && (
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

              {showRoundTimes && roundOneTime && (
                <div className={styles.wrapper}>
                  <small>Round times:</small>
                  <small>{formatSecondsAsTime(roundOneTime)}</small>
                  <small>{formatSecondsAsTime(roundTwoTime)}</small>
                  <small>{formatSecondsAsTime(roundThreeTime)}</small>
                  <small>{formatSecondsAsTime(roundFourTime)}</small>
                  <small>{formatSecondsAsTime(roundFiveTime)}</small>
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
      </RowCard>
    </div>
  )
}
