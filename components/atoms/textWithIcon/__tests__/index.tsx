import { render, screen } from '@testing-library/react'
import TextWithIcon from '..'

describe('TextWithIcon', () => {
  it('renders children correctly', () => {
    render(<TextWithIcon>Test Text</TextWithIcon>)
    expect(screen.getByText('Test Text')).toBeInTheDocument()
  })

  it('applies default color when no colorName is provided', () => {
    render(<TextWithIcon>Test</TextWithIcon>)
    expect(screen.getByText('Test')).toHaveClass('primary')
  })

  it('applies the correct color when colorName is provided', () => {
    render(<TextWithIcon colorName="yellow">Test</TextWithIcon>)
    expect(screen.getByText('Test')).toHaveClass('yellow')
  })

  it('renders the correct icon when iconName is "crown"', () => {
    render(<TextWithIcon iconName="crown">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders the correct icon when iconName is "winner"', () => {
    render(<TextWithIcon iconName="winner">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders the correct icon when iconName is "flame"', () => {
    render(<TextWithIcon iconName="flame">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('does not render an icon when iconName is undefined', () => {
    render(<TextWithIcon>Test</TextWithIcon>)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('applies the correct icon size when iconSize is provided', () => {
    render(
      <TextWithIcon iconName="crown" iconSize={30}>
        Test
      </TextWithIcon>,
    )
    expect(screen.getByRole('img')).toHaveAttribute('width', '30')
    expect(screen.getByRole('img')).toHaveAttribute('height', '30')
  })
})
