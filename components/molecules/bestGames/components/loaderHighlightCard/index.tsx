import Position from '../position'
import { Container, DetailContainer, Wrapper } from '../highlightCard/styled'
import Loader from '@/components/atoms/loader'

export default function LoaderHighlightCard() {
  return (
    <Container>
      <Position pos={1} />
      <DetailContainer>
        <Wrapper>
          <Loader height={21} width={200} variant="secondary" />
        </Wrapper>
        <Wrapper>
          <Loader height={30} width={'60%'} variant="secondary" />
        </Wrapper>
      </DetailContainer>
    </Container>
  )
}
