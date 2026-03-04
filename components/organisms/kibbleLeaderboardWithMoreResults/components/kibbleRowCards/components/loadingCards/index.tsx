import Loader from '@/components/atoms/loader'
import PositionCard from '@/components/molecules/positionCard'
import {
  ColumnsContainer,
  Container as CardsContainer,
} from '@/components/molecules/positionCard/styled'
import { Col } from './styled'

interface Props {
  rows?: number
  columns: number
}

export default function LoadingCards({ rows = 5, columns }: Props) {
  return (
    <CardsContainer>
      {[...Array(rows)].map((_, rowIndex) => (
        <PositionCard key={rowIndex} position={rowIndex + 1}>
          <Col>
            <Loader height={30} variant="secondary" width={'60%'} />
            <Loader height={20} variant="secondary" width={'60%'} />
          </Col>
          <ColumnsContainer>
            {[...Array(columns)].map((_, colIndex) => (
              <Col key={colIndex}>
                <Loader height={30} variant="secondary" width={'80%'} />
                <Loader height={20} variant="secondary" width={'80%'} />
              </Col>
            ))}
          </ColumnsContainer>
        </PositionCard>
      ))}
    </CardsContainer>
  )
}
