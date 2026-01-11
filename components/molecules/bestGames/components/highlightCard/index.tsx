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
import { formatDateToLocale, secondsToSexagesimal } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import PositionNumber from '@/components/atoms/positionNumber'
import Button from '@/components/atoms/button'
import Tooltip from '@/components/atoms/tooltip'
import { GameStats } from '@/interfaces/game'

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

  return (
    <Container>
      <PositionNumber pos={position} />
      <DetailContainer>
        <Row>
          <Info>
            <Tooltip body={secondsToSexagesimal(times.total, true)}>
              <TextWithIcon colorName="tertiary" iconName="clock">
                {secondsToSexagesimal(times.total)}
              </TextWithIcon>
            </Tooltip>

            {showDifficulty && (
              <TextWithIcon colorName="secondary" iconName="paw">
                {difficulty}
              </TextWithIcon>
            )}
          </Info>
          <Date>{matchDate}</Date>
        </Row>
        {times.roundOne && (
          <Background>
            <Wrapper>
              <label>{secondsToSexagesimal(times.roundOne)}</label>
              <label>{secondsToSexagesimal(times.roundTwo)}</label>
              <label>{secondsToSexagesimal(times.roundThree)}</label>
              <label>{secondsToSexagesimal(times.roundFour)}</label>
              <label>{secondsToSexagesimal(times.roundFive)}</label>
            </Wrapper>
          </Background>
        )}

        <Background>
          <Wrapper>
            {members.map((memeber) => (
              <Button
                as="a"
                key={memeber}
                href={`/player/${encodeURIComponent(memeber)}`}
                small
                colorName="secondary"
                variant="ghost"
              >
                {memeber.split('#')[0]}
              </Button>
            ))}
          </Wrapper>
        </Background>
      </DetailContainer>
    </Container>
  )
}
