'use client'

import TextWithIcon from '@/components/atoms/textWithIcon'
import {
  AnimatedBorderBox,
  AnimatedBorderBoxGlow,
  CenterBox,
  Col,
  Container,
  Row,
  Title,
} from './styled'

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

interface WinStreakProps {
  current: number
  highest: number
}

export default function WinStreak({ current, highest }: WinStreakProps) {
  const message = getEncouragingMessage(current)
  return (
    <CenterBox>
      <AnimatedBorderBoxGlow />
      <AnimatedBorderBox />

      <Container withMargin={current > 10}>
        <Title>Win Streak</Title>
        <Row>
          <Col>
            <p>Current</p>
            <span>{current}</span>
          </Col>
          <Col>
            <p>Highest</p>
            <span>{highest}</span>
          </Col>
        </Row>
        {message && (
          <TextWithIcon colorName="brandPrimary" iconName="flame">
            {message}
          </TextWithIcon>
        )}
      </Container>
    </CenterBox>
  )
}
