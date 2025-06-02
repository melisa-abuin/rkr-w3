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
import { getMessageByScore } from '@/utils/getMessageByScore'

interface WinStreakProps {
  current: number
  highest: number
}

export default function WinStreak({ current, highest }: WinStreakProps) {
  const message = getMessageByScore(current)
  return (
    <CenterBox withPadding={current !== 0 && current === highest}>
      <AnimatedBorderBoxGlow />
      <AnimatedBorderBox />

      <Container>
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
