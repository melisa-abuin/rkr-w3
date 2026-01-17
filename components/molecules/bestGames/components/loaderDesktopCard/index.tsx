import { Container, DetailContainer, Wrapper } from '../desktopCard/styled'
import Loader from '@/components/atoms/loader'
import PositionNumber from '@/components/atoms/positionNumber'

interface Props {
  position: number
  showDifficulty: boolean
}

export default function LoaderDesktopCard({ position, showDifficulty }: Props) {
  return (
    <Container>
      <PositionNumber pos={position} />
      <DetailContainer>
        <Wrapper>
          <Loader
            height={21}
            width={showDifficulty ? 200 : 100}
            variant="secondary"
          />
        </Wrapper>
        <Wrapper>
          <Loader height={30} width={'60%'} variant="secondary" />
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
