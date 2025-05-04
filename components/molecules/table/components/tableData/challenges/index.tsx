import React from 'react'
import { Container, Text } from './styled'
import { Challenges as ChallengesT } from '@/interfaces/player'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface Props {
  data: ChallengesT
}

interface ChallengesProps {
  challenges: [number, number]
}

const GeneralChallenges = ({ challenges }: ChallengesProps) => {
  const [completedChallenges, totalChallenges] = challenges

  if (totalChallenges === 0) {
    return <TextWithIcon>none</TextWithIcon>
  }

  if (completedChallenges === totalChallenges) {
    return (
      <TextWithIcon colorName="teal" iconName="winner">
        {completedChallenges}/{totalChallenges}
      </TextWithIcon>
    )
  }

  if (completedChallenges >= totalChallenges * 0.75) {
    return (
      <TextWithIcon colorName="green" iconName="flame">
        {completedChallenges}/{totalChallenges}
      </TextWithIcon>
    )
  }

  if (completedChallenges >= totalChallenges * 0.5) {
    return (
      <TextWithIcon colorName="yellow">
        {completedChallenges}/{totalChallenges}
      </TextWithIcon>
    )
  }

  return (
    <TextWithIcon>
      {completedChallenges}/{totalChallenges}
    </TextWithIcon>
  )
}

export default function Challenges({ data }: Props) {
  const { general, tournament } = data
  const [completedChallenges, totalChallenges] = tournament

  return (
    <div>
      <Container>
        <GeneralChallenges challenges={general} />
      </Container>

      <Text>
        Tournament: {completedChallenges}/{totalChallenges}
      </Text>
    </div>
  )
}
