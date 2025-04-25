import PositionNumber from '@/components/atoms/positionNumber'
import { Card, ColumnsContainer, Container, RowContainer } from '../../styled'
import Loader from '@/components/atoms/loader'
import { Col } from './styled'

export default function LoadingCards() {
  return (
    <Container>
      {[...Array(5)].map((_, rowIndex) => (
        <Card key={rowIndex}>
          <RowContainer>
            <PositionNumber pos={rowIndex + 1} />
            <Col>
              <Loader height={30} variant="secondary" width={'60%'} />
              <Loader height={20} variant="secondary" width={'60%'} />
            </Col>
          </RowContainer>
          <ColumnsContainer>
            {[...Array(4)].map((_, rowIndex) => (
              <Col key={rowIndex}>
                <Loader height={30} variant="secondary" width={'80%'} />
                <Loader height={20} variant="secondary" width={'80%'} />
              </Col>
            ))}
          </ColumnsContainer>
        </Card>
      ))}
    </Container>
  )
}
