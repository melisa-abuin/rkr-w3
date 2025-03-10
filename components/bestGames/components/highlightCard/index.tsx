import TextWithIcon from '@/components/atoms/textWithIcon'
import Position from '../position'
import { Container, DetailContainer, Name, Wrapper } from './styled'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { Difficulty } from '@/interfaces/difficulty'

interface Props {
  difficulty: Difficulty
  time: number
  teamMembers: string
}

export default function HighlightCard({
  difficulty,
  time,
  teamMembers,
}: Props) {
  const members = teamMembers.split(',')
  return (
    <Container>
      <Position pos={1} />
      <DetailContainer>
        <Wrapper>
          <TextWithIcon colorName="tertiary" iconName="clock" palette="text">
            {secondsToSexagesimal(time)}
          </TextWithIcon>
          <TextWithIcon colorName="secondary" iconName="paw" palette="text">
            {difficulty}
          </TextWithIcon>
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
