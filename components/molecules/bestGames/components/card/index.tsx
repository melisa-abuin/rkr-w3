import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import Position from '../position'
import {
  Container,
  Description,
  Header,
  NameList,
  Title,
  Wrapper,
} from './styled'
import { Difficulty } from '@/interfaces/difficulty'

interface Props {
  difficulty: Difficulty
  position: number
  time: number
  teamMembers: string
  showDifficulty: boolean
}

export default function Card({
  difficulty,
  position,
  time,
  teamMembers,
  showDifficulty,
}: Props) {
  const members = teamMembers.replace(/#\d+/g, '')

  return (
    <Container>
      <Header>
        <Position pos={position} />
        <Wrapper>
          <Title>{secondsToSexagesimal(time)}</Title>
          {showDifficulty && <Description>{difficulty}</Description>}
        </Wrapper>
      </Header>
      <NameList>{members}</NameList>
    </Container>
  )
}
