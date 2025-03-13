import React from 'react'
import { Wing } from '@/components/icons/wing'
import { Container } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { SaveStreak as SaveStreakI } from '@/interfaces/player'
import { Bolt } from '@/components/icons/bolt'

interface Props {
  saveStreak: SaveStreakI
}

const SaveStreak: React.FC<Props> = ({ saveStreak }) => {
  const [theme] = useTheme()
  const { highestSaveStreak, redLightning, patrioticTendrils } = saveStreak

  const saveStreakToShow = () => {
    if (highestSaveStreak < 50 && patrioticTendrils) return '+50'
    if (highestSaveStreak < 15 && redLightning) return '+15'
    return String(highestSaveStreak)
  }

  const Icon = ({ flipped }: { flipped?: boolean }) => {
    if (patrioticTendrils) {
      return (
        <Wing
          internalColor={theme.color.patrioticTendrilsInternal}
          externalColor={theme.color.patrioticTendrilsExternal}
          height={24}
          flipped={flipped}
          width={24}
        />
      )
    }

    if (redLightning) {
      return (
        <Bolt
          internalColor={theme.color.redLightningInternal}
          externalColor={theme.color.redLightningExternal}
          height={24}
          flipped={flipped}
          width={24}
        />
      )
    }
    return null
  }

  return (
    <Container>
      <Icon flipped />
      {saveStreakToShow()}
      <Icon />
    </Container>
  )
}

export default SaveStreak
