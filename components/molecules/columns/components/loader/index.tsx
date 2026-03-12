import Loader from '@/components/atoms/loader'
import { Col, Container } from '../../styled'

interface LoaderColumnsProps {
  variant: 'primary' | 'secondary'
}

export default function LoaderColumns({ variant }: LoaderColumnsProps) {
  return (
    <Container variant={variant}>
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
