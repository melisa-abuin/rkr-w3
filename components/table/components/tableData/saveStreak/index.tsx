import React from 'react'
import { Wing } from '@/components/icons/wing'
import { Container } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { SaveStreak as SaveStreakI } from '@/interfaces/player'

interface Props {
  saveStreak: SaveStreakI
}

const SaveStreak: React.FC<Props> = ({ saveStreak }) => {
  const [theme] = useTheme()
  const { highestSaveStreak, redTendrils, patrioticTendrils } = saveStreak

  const saveStreakToShow = () => {
    if (highestSaveStreak < 50 && patrioticTendrils) return '+50'
    if (highestSaveStreak < 15 && redTendrils) return '+15'
    return String(highestSaveStreak)
  }

  const getWingColors = () => {
    if (patrioticTendrils) {
      return {
        internal: theme.color.patrioticTendrilsInternal,
        external: theme.color.patrioticTendrilsExternal,
      }
    }
    if (redTendrils) {
      return {
        internal: theme.color.redTendrilsInternal,
        external: theme.color.redTendrilsExternal,
      }
    }
    return null
  }

  const wingColors = getWingColors()

  return (
    <Container>
      {wingColors && (
        <Wing
          internalColor={wingColors.internal}
          externalColor={wingColors.external}
          height={24}
          flipped
          width={24}
        />
      )}
      {saveStreakToShow()}
      {wingColors && (
        <Wing
          internalColor={wingColors.internal}
          externalColor={wingColors.external}
          height={24}
          width={24}
        />
      )}
    </Container>
  )
}

export default SaveStreak
