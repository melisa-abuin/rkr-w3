import React from 'react'
import { Wing } from '@/components/icons/wing'
import { Container } from './styled'
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
