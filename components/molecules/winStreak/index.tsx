'use client'

import TextWithIcon from '@/components/atoms/textWithIcon'
import { BorderContainer, Container, Wrapper } from './styled'

export const scoreMessagesMap: Record<number, string> = {
  3: 'Keep it up!',
  6: 'Looking sharp!',
  10: 'Crushing it!',
  15: 'On fire!',
  20: 'Unstoppable!',
}

const getEncouragingMessage = (score: number): string | null => {
  const thresholds = Object.keys(scoreMessagesMap)
    .map(Number)
    .sort((a, b) => a - b)

  let message: string | null = null

  for (const threshold of thresholds) {
    if (score >= threshold) {
      message = scoreMessagesMap[threshold]
    } else {
      break
    }
  }

  return message
}

export default function WinStreak({ winStreak }: { winStreak: number }) {
  return (
    <Wrapper>
      <BorderContainer />
      <Container>
        <p>Current Win Streak</p>
        <TextWithIcon colorName="primary" iconName="flame" palette="color">
          {winStreak}
        </TextWithIcon>
        <p>{getEncouragingMessage(winStreak)}</p>
      </Container>
    </Wrapper>
  )
}
