import TextWithIcon from '@/components/atoms/textWithIcon'
import {
  Background,
  Container,
  Date,
  DetailContainer,
  Info,
  Row,
  Wrapper,
} from './styled'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import PositionNumber from '@/components/atoms/positionNumber'
import Button from '@/components/atoms/button'
import Tooltip from '@/components/atoms/tooltip'
import { GameStats } from '@/interfaces/game'
import { useState } from 'react'

interface HighlightCardProps {
  date: string
  difficulty: Difficulty
  position: number
  showDifficulty: boolean
  teamMembers: string
  times: GameStats['times']
}

export default function HighlightCard({
  date,
  difficulty,
  position,
  showDifficulty,
  teamMembers,
  times,
}: HighlightCardProps) {
  const matchDate = formatDateToLocale(date)
  const members = teamMembers.split(', ')
  const [showRoundTimes, setShowRoundTimes] = useState(false)

  return (
    <Container>
      <PositionNumber pos={position} />
      <DetailContainer>
        <Row>
          <Info>
            <Tooltip body={formatSecondsAsTime(times.total, true)}>
              <TextWithIcon colorName="tertiary" iconName="clock">
                {formatSecondsAsTime(times.total)}
              </TextWithIcon>
            </Tooltip>
            <Button onClick={() => setShowRoundTimes(true)}>{'->'}</Button>

            {showRoundTimes && times.roundOne && (
              <Wrapper>
                <p>{formatSecondsAsTime(times.roundOne)}</p>
                <p>{formatSecondsAsTime(times.roundTwo)}</p>
                <p>{formatSecondsAsTime(times.roundThree)}</p>
                <p>{formatSecondsAsTime(times.roundFour)}</p>
                <p>{formatSecondsAsTime(times.roundFive)}</p>
              </Wrapper>
            )}
            {showDifficulty && (
              <TextWithIcon colorName="secondary" iconName="paw">
                {difficulty}
              </TextWithIcon>
            )}
          </Info>
          <Date>{matchDate}</Date>
        </Row>

        <Wrapper>
          {members.map((memeber) => (
            <Button
              as="a"
              key={memeber}
              href={`/player/${encodeURIComponent(memeber)}`}
              small
              colorName="tertiary"
              variant="solid"
            >
              {memeber.split('#')[0]}
            </Button>
          ))}
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
