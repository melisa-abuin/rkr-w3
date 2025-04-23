import {
  Container,
  Description,
  Header,
  NameList,
  Title,
  Wrapper,
} from '../card/styled'
import Loader from '@/components/atoms/loader'
import PositionNumber from '@/components/atoms/positionNumber'

interface Props {
  position: number
  showDifficulty: boolean
}

export default function LoaderCard({ position, showDifficulty }: Props) {
  return (
    <Container>
      <Header>
        <PositionNumber pos={position} isSmall />
        <Wrapper>
          <Title>
            <Loader height={21} width={70} variant="secondary" />
          </Title>
          {showDifficulty && (
            <Description>
              <Loader height={17} width={70} variant="secondary" />
            </Description>
          )}
        </Wrapper>
      </Header>
      <NameList>
        <Loader height={30} width={'90%'} />
      </NameList>
    </Container>
  )
}
