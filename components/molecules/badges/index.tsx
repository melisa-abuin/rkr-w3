import { InnerContainer, OuterContainer } from './styled'
import Button from '@/components/atoms/button'

interface Props<T extends string> {
  onClick: (option: T | undefined) => void
  options: T[]
  selected: T | undefined
}

export default function Badges<T extends string>({
  onClick,
  options,
  selected,
}: Props<T>) {
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
            variant={option === selected ? 'solid' : 'ghost'}
          >
            {option}
          </Button>
        ))}
        <Button
          aria-pressed={!selected}
          color="secondary"
          small
          onClick={() => onClick(undefined)}
          variant={!selected ? 'solid' : 'ghost'}
        >
          all
        </Button>
      </InnerContainer>
    </OuterContainer>
  )
}
