import { Difficulty } from '@/interfaces/difficulty'
import { Badge, Container } from './styled'

interface Props {
  onClick: (option: Difficulty | undefined) => void
  options: Array<Difficulty | 'all'>
  selected: Difficulty | undefined
}

export const Badges = ({ onClick, options, selected }: Props) => {
  return (
    <Container>
      {options.map((option) => (
        <Badge
          key={option}
          onClick={() => onClick(option === 'all' ? undefined : option)}
          selected={option === selected || (option === 'all' && !selected)}
        >
          {option}
        </Badge>
      ))}
    </Container>
  )
}
