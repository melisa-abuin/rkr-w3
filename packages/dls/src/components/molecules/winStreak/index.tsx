'use client'

import TextWithIcon from '@/components/atoms/textWithIcon'
import styles from './index.module.css'
import { getMessageByScore } from '@/utils/getMessageByScore'

interface WinStreakProps {
  current: number
  highest: number
}

export default function WinStreak({ current, highest }: WinStreakProps) {
  const message = getMessageByScore(current)
  const hasPadding = current !== 0 && current === highest
  const centerBoxClass = hasPadding
    ? `${styles.centerBox} ${styles.centerBoxWithPadding}`
    : styles.centerBox

  return (
    <div className={centerBoxClass}>
      <div className={styles.animatedBorderBoxGlow} />
      <div className={styles.animatedBorderBox} />

      <div className={styles.container}>
        <h2 className={styles.title}>Win Streak</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <p>Current</p>
            <span>{current}</span>
          </div>
          <div className={styles.col}>
            <p>Highest</p>
            <span>{highest}</span>
          </div>
        </div>
        {message && (
          <TextWithIcon colorName="brandPrimary" iconName="flame">
            {message}
          </TextWithIcon>
        )}
      </div>
    </div>
  )
}
