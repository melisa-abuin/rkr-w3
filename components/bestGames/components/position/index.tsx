import { useTheme } from '@/hooks/useTheme'
import { Number } from './styled'

interface Props {
  pos: number
}

export default function Position({ pos }: Props) {
  const [theme] = useTheme()
  const { color, text } = theme

  const colorByNumber: Record<number, string> = {
    1: color.teal,
    2: color.green,
    3: color.yellow,
    4: text.primary,
    5: text.primary,
  }

  return (
    <Number color={colorByNumber[pos] ?? colorByNumber[1]} small={pos !== 1}>
      {pos}
    </Number>
  )
}
