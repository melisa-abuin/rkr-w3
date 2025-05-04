import { useTheme } from '@/hooks/useTheme'
import { Number } from './styled'

interface Props {
  pos: number
  isSmall?: boolean
}

export default function PositionNumber({ pos, isSmall = false }: Props) {
  const [theme] = useTheme()
  const { color, text } = theme

  const colorByNumber: Record<number, string> = {
    1: color.teal,
    2: color.green,
    3: color.yellow,
    4: text.color.primary,
    5: text.color.primary,
  }

  return (
    <Number color={colorByNumber[pos] ?? colorByNumber[1]} small={isSmall}>
      {pos}
    </Number>
  )
}
