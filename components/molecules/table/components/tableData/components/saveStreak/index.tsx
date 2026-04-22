import React from 'react'
import { Wing } from '@/components/icons/wing'
import styles from './index.module.css'
import { useTheme } from '@/hooks/useTheme'
import { SaveStreak as SaveStreakI } from '@/interfaces/player'
import { Bolt } from '@/components/icons/bolt'

interface Props {
  data: SaveStreakI
}
export default function SaveStreak({ data }: Props) {
  const [theme] = useTheme()
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
          externalColor={theme.color.patrioticTendrilsExternal}
          flipped={flipped}
          height={24}
          internalColor={theme.color.patrioticTendrilsInternal}
          width={24}
        />
      )
    }

    if (redLightning) {
      return (
        <Bolt
          externalColor={theme.color.redLightningExternal}
          flipped={flipped}
          height={24}
          internalColor={theme.color.redLightningInternal}
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
