import TextWithIcon from '@/components/atoms/textWithIcon'
import { Container, Date, DetailContainer, Info, Row, Wrapper } from './styled'
import { formatDateToLocale, secondsToSexagesimal } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import PositionNumber from '@/components/atoms/positionNumber'
import Button from '@/components/atoms/button'

interface HighlightCardProps {
  difficulty: Difficulty
  time: number
  teamMembers: string
  showDifficulty: boolean
  date: string
}

export default function HighlightCard({
  date,
  difficulty,
  time,
  teamMembers,
  showDifficulty,
}: HighlightCardProps) {
  const matchDate = formatDateToLocale(date)
  const members = teamMembers.split(', ')

  return (
    <Container>
      <PositionNumber pos={1} />
      <DetailContainer>
        <Row>
          <Info>
            <TextWithIcon colorName="tertiary" iconName="clock">
              {secondsToSexagesimal(time)}
            </TextWithIcon>
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
            >
              {memeber.split('#')[0]}
            </Button>
          ))}
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
