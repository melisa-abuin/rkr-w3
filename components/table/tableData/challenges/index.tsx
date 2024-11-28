import React from 'react'
import { Container } from './styled'
import { Flame } from '@/components/icons/flame'
import { Winner } from '@/components/icons/winner'
import { useTheme } from '@/hooks/useTheme'
import { getNumericCompleteChallenges } from '@/utils/getNumericCompleteChallenges'

interface Props {
  challenges: string
}

export default function Challenges({ challenges }: Props) {
  const [theme] = useTheme()
  const iconSize = 20
  const [completedChallenges, totalChallenges] =
    getNumericCompleteChallenges(challenges)

  if (totalChallenges === 0) {
    return <Container color={theme.text.primary}>none</Container>
  }

  if (completedChallenges === totalChallenges && totalChallenges !== 0) {
    return (
      <Container color={theme.color.teal}>
        {challenges}
        <Winner height={iconSize} width={iconSize} fill={theme.color.teal} />
      </Container>
    )
  }

  if (completedChallenges >= totalChallenges * 0.75) {
    return (
      <Container color={theme.color.green}>
        {challenges}
        <Flame height={iconSize} width={iconSize} fill={theme.color.green} />
      </Container>
    )
  }

  if (completedChallenges >= totalChallenges * 0.5) {
    return <Container color={theme.color.yellow}>{challenges}</Container>
  }

  return <Container color={theme.text.primary}>{challenges}</Container>
}
