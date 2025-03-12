import Loader from '@/components/atoms/loader'
import { Col, Container } from '../../styled'

export default function LoaderColumns() {
  return (
    <Container>
      {[...Array(5)].map((_, rowIndex) => (
        <Col key={rowIndex}>
          <Loader height={30} variant="secondary" width={'80%'} />
          <Loader height={30} variant="secondary" width={'80%'} />
          <Loader height={20} variant="secondary" width={'80%'} />
        </Col>
      ))}
    </Container>
  )
}
