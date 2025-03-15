import { Difficulty } from '@/interfaces/difficulty'
import { InnerContainer, OuterContainer } from './styled'
import Button from '@/components/atoms/button'

interface Props {
  onClick: (option: Difficulty | undefined) => void
  options: Array<Difficulty>
  selected: Difficulty | undefined
}

export default function Badges({ onClick, options, selected }: Props) {
  return (
    <OuterContainer>
      <InnerContainer>
        {options.map((option) => (
          <Button
            aria-pressed={option === selected}
            color="secondary"
            key={option}
            onClick={() => onClick(option)}
            small
            variant={option === selected ? 'primary' : 'secondary'}
          >
            {option}
          </Button>
        ))}
        <Button
          aria-pressed={!selected}
          color="secondary"
          small
          onClick={() => onClick(undefined)}
          variant={!selected ? 'primary' : 'secondary'}
        >
          all
        </Button>
      </InnerContainer>
    </OuterContainer>
  )
}
