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
            key={option}
            small
            aria-pressed={option === selected}
            colorName="secondary"
            variant={option === selected ? 'solid' : 'ghost'}
            onClick={() => onClick(option)}
          >
            {option}
          </Button>
        ))}
        <Button
          small
          aria-pressed={!selected}
          colorName="secondary"
          variant={!selected ? 'solid' : 'ghost'}
          onClick={() => onClick(undefined)}
        >
          all
        </Button>
      </InnerContainer>
    </OuterContainer>
  )
}
