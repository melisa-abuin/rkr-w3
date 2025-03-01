import { Difficulty } from '@/interfaces/difficulty'
import { Badge, Container } from './styled'

interface Props {
  onClick: (option: Difficulty | undefined) => void
  options: Array<Difficulty>
  selected: Difficulty | undefined
}

export default function Badges({ onClick, options, selected }: Props) {
  return (
    <Container>
      {options.map((option) => (
        <Badge
          aria-pressed={option === selected}
          as="button"
          key={option}
          onClick={() => onClick(option)}
          selected={option === selected}
        >
          {option}
        </Badge>
      ))}
      <Badge
        aria-pressed={!selected}
        as="button"
        onClick={() => onClick(undefined)}
        selected={!selected}
      >
        all
      </Badge>
    </Container>
  )
}
