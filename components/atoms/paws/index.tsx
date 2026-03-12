import { Paw } from '@/components/icons/paw'
import { useTheme } from '@/hooks/useTheme'
import { Row } from './styled'

interface PawsProps {
  color?: string
  difficulty: string
}

const difficultyPawCounter = {
  normal: 1,
  hard: 2,
  impossible: 3,
  nightmare: 4,
}

export default function Paws({ color, difficulty }: PawsProps) {
  const [theme] = useTheme()
  const difficultyValue = difficulty.toLocaleLowerCase()
  if (difficultyValue in difficultyPawCounter === false) return null

  return (
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
          fill={color || theme.color[difficultyValue]}
          height={16}
          width={16}
        />
      ))}
    </Row>
  )
}
