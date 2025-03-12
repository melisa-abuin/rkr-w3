import Position from '../position'
import {
  Container,
  Description,
  Header,
  NameList,
  Title,
  Wrapper,
} from '../card/styled'
import Loader from '@/components/atoms/loader'

interface Props {
  position: number
}

export default function LoaderCard({ position }: Props) {
  return (
    <Container>
      <Header>
        <Position pos={position} />
        <Wrapper>
          <Title>
            <Loader height={21} width={70} variant="secondary" />
          </Title>
          <Description>
            <Loader height={17} width={70} variant="secondary" />
          </Description>
        </Wrapper>
      </Header>
      <NameList>
        <Loader height={30} width={'90%'} />
      </NameList>
    </Container>
  )
}
