import { Paw } from '@/components/icons/paw'
import { useTheme } from '@/hooks/useTheme'
import { Col, Row } from './styled'

interface DifficultyDataProps {
  data: string
}

const difficultyPawCounter = {
  normal: 1,
  hard: 2,
  impossible: 3,
}

export default function DifficultyData({ data }: DifficultyDataProps) {
  const [theme] = useTheme()
  const difficultyValue = data.toLocaleLowerCase()
  if (difficultyValue in difficultyPawCounter === false) return null

  return (
    <Col>
      {data}
      <Row>
        {[
          ...Array(
            difficultyPawCounter[
              difficultyValue as keyof typeof difficultyPawCounter
            ],
          ),
        ].map((_, rowIndex) => (
          <Paw
            key={rowIndex}
            height={16}
            fill={theme.color[difficultyValue]}
            width={16}
          />
        ))}
      </Row>
    </Col>
  )
}
