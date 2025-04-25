import { Container, DetailContainer, Wrapper } from '../highlightCard/styled'
import Loader from '@/components/atoms/loader'
import PositionNumber from '@/components/atoms/positionNumber'

interface Props {
  showDifficulty: boolean
}

export default function LoaderHighlightCard({ showDifficulty }: Props) {
  return (
    <Container>
      <PositionNumber pos={1} />
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
