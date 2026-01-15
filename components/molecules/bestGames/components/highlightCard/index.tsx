import TextWithIcon from '@/components/atoms/textWithIcon'
import {
  Container,
  Date,
  DetailContainer,
  IconButton,
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
import { Chevron } from '@/components/icons/chevron'
import { useTheme } from '@/hooks/useTheme'

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
  const [theme] = useTheme()

  return (
    <Container>
      <PositionNumber pos={position} />
      <DetailContainer>
        <Row>
          <Info>
            <Wrapper>
              <Tooltip body={formatSecondsAsTime(times.total, true)}>
                <TextWithIcon colorName="tertiary" iconName="clock">
                  {formatSecondsAsTime(times.total, showRoundTimes)}
                </TextWithIcon>
              </Tooltip>
              {times.roundOne && (
                <IconButton onClick={() => setShowRoundTimes((prev) => !prev)}>
                  <Chevron
                    height={16}
                    fill={theme.text.color.tertiary}
                    width={16}
                    flipped={!showRoundTimes}
                  />
                </IconButton>
              )}
            </Wrapper>

            {showRoundTimes && times.roundOne && (
              <Wrapper>
                <small>Round times:</small>
                <small>{formatSecondsAsTime(times.roundOne)}</small>
                <small>{formatSecondsAsTime(times.roundTwo)}</small>
                <small>{formatSecondsAsTime(times.roundThree)}</small>
                <small>{formatSecondsAsTime(times.roundFour)}</small>
                <small>{formatSecondsAsTime(times.roundFive)}</small>
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
