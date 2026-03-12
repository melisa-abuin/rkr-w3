import { Col } from './styled'
import Paws from '@/components/atoms/paws'

interface DifficultyDataProps {
  data: string
}

export default function DifficultyData({ data }: DifficultyDataProps) {
  return (
    <Col>
      {data}
      <Paws difficulty={data} />
    </Col>
  )
}
