import React from 'react'
import { Wing } from '@/components/icons/wing'
import styles from './index.module.css'
import { SaveStreak as SaveStreakI } from '@/interfaces/player'
import { Bolt } from '@/components/icons/bolt'

interface Props {
  data: SaveStreakI
}
export default function SaveStreak({ data }: Props) {
  const { highestScore, redLightning, patrioticTendrils } = data

  const saveStreakToShow = () => {
    if (highestScore < 50 && patrioticTendrils) return '+50'
    if (highestScore < 15 && redLightning) return '+15'
    return String(highestScore)
  }

  const Icon = ({ flipped }: { flipped?: boolean }) => {
    if (patrioticTendrils) {
      return (
        <Wing
          externalColor="var(--color-patriotic-tendrils-external)"
          flipped={flipped}
          height={24}
          internalColor="var(--color-patriotic-tendrils-internal)"
          width={24}
        />
      )
    }

    if (redLightning) {
      return (
        <Bolt
          externalColor="var(--color-red-lightning-external)"
          flipped={flipped}
          height={24}
          internalColor="var(--color-red-lightning-internal)"
          width={24}
        />
      )
    }
    return null
  }

  return (
    <div className={styles.container}>
      <Icon flipped />
      {saveStreakToShow()}
      <Icon />
    </div>
  )
}
