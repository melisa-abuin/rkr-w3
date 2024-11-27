import { Badge, Container } from './styled'

interface Props {
  onClick: (option: string) => void
  options: Array<string>
  selected: string
}

export const Badges = ({ onClick, options, selected }: Props) => {
  return (
    <Container>
      {options.map((option) => (
        <Badge
          key={option}
          onClick={() => onClick(option)}
          selected={option === selected}
        >
          {option}
        </Badge>
      ))}
    </Container>
  )
}
