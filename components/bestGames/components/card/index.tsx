import Position from '../position'
import {
  Container,
  Description,
  Header,
  NameList,
  Title,
  Wrapper,
} from './styled'

export default function Card() {
  return (
    <Container>
      <Header>
        <Position pos={4} />
        <Wrapper>
          <Title>25:23</Title>
          <Description>Impossible</Description>
        </Wrapper>
      </Header>
      <NameList>Stan, Aches, Fieryfox, Yoshimaru</NameList>
    </Container>
  )
}
