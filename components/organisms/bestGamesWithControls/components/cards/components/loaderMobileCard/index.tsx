import {
  Container,
  Description,
  Header,
  NameList,
  Title,
  Wrapper,
} from '../mobileCard/styled'
import Loader from '@/components/atoms/loader'
import PositionNumber from '@/components/atoms/positionNumber'

interface Props {
  position: number
  showDifficulty: boolean
}

export default function LoaderMobileCard({ position, showDifficulty }: Props) {
  return (
    <Container>
      <Header>
        <PositionNumber isSmall pos={position} />
        <Wrapper>
          <Title>
            <Loader height={21} variant="secondary" width={70} />
          </Title>
          {showDifficulty && (
            <Description>
              <Loader height={17} variant="secondary" width={70} />
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
