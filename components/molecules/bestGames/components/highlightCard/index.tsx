import TextWithIcon from '@/components/atoms/textWithIcon'
import { Container, Date, DetailContainer, Name, Row, Wrapper } from './styled'
import { formatDateToLocale, secondsToSexagesimal } from '@/utils'
import { Difficulty } from '@/interfaces/difficulty'
import PositionNumber from '@/components/atoms/positionNumber'

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
  const members = teamMembers.split(',')

  return (
    <Container>
      <PositionNumber pos={1} />
      <DetailContainer>
        <Row>
          <Wrapper>
            <TextWithIcon colorName="tertiary" iconName="clock">
              {secondsToSexagesimal(time)}
            </TextWithIcon>
            {showDifficulty && (
              <TextWithIcon colorName="secondary" iconName="paw">
                {difficulty}
              </TextWithIcon>
            )}
          </Wrapper>
          <Date>{matchDate}</Date>
        </Row>
        <Wrapper>
          {members.map((memeber) => (
            <Name key={memeber}>{memeber.split('#')[0]}</Name>
          ))}
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
