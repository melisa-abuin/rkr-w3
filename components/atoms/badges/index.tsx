import { Difficulty } from '@/interfaces/difficulty'
import { Badge, Container } from './styled'

interface Props {
  onClick: (option: Difficulty | undefined) => void
  options: Array<Difficulty | 'all'>
  selected: Difficulty | undefined
}

export default function Badges({ onClick, options, selected }: Props) {
  return (
    <Container>
      {options.map((option) => (
        <Badge
          key={option}
          as="button"
          onClick={() => onClick(option === 'all' ? undefined : option)}
          selected={option === selected || (option === 'all' && !selected)}
          aria-pressed={option === selected || (option === 'all' && !selected)}
        >
          {option}
        </Badge>
      ))}
    </Container>
  )
}
