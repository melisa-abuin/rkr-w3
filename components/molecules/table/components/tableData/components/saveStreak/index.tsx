import { Bolt } from '@/components/icons/bolt'
import { Wing } from '@/components/icons/wing'
import { SaveStreak as SaveStreakI } from '@/interfaces/player'
import styles from './index.module.css'

interface SaveStreakProps {
  data: SaveStreakI
}

interface IconProps {
  flipped?: boolean
  patrioticTendrils: boolean
  redLightning: boolean
}

const SaveStreakIcon = ({
  flipped,
  patrioticTendrils,
  redLightning,
}: IconProps) => {
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

export default function SaveStreak({ data }: SaveStreakProps) {
  const { highestScore, redLightning, patrioticTendrils } = data

  const saveStreakToShow = () => {
    if (highestScore < 50 && patrioticTendrils) return '+50'
    if (highestScore < 15 && redLightning) return '+15'
    return String(highestScore)
  }

  return (
    <div className={styles.container}>
      <SaveStreakIcon
        flipped
        patrioticTendrils={patrioticTendrils}
        redLightning={redLightning}
      />
      {saveStreakToShow()}
      <SaveStreakIcon
        patrioticTendrils={patrioticTendrils}
        redLightning={redLightning}
      />
    </div>
  )
}
