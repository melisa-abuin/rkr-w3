import TextWithIcon from '@/components/atoms/textWithIcon'
import { Container, DetailContainer, Name, Wrapper } from './styled'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { Difficulty } from '@/interfaces/difficulty'
import PositionNumber from '@/components/atoms/positionNumber'

interface Props {
  difficulty: Difficulty
  time: number
  teamMembers: string
  showDifficulty: boolean
}

export default function HighlightCard({
  difficulty,
  time,
  teamMembers,
  showDifficulty,
}: Props) {
  const members = teamMembers.split(',')
  return (
    <Container>
      <PositionNumber pos={1} />
      <DetailContainer>
        <Wrapper>
          <TextWithIcon colorName="tertiary" iconName="clock" palette="text">
            {secondsToSexagesimal(time)}
          </TextWithIcon>
          {showDifficulty && (
            <TextWithIcon colorName="secondary" iconName="paw" palette="text">
              {difficulty}
            </TextWithIcon>
          )}
        </Wrapper>
        <Wrapper>
          {members.map((memeber) => (
            <Name key={memeber}>{memeber.split('#')[0]}</Name>
          ))}
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
