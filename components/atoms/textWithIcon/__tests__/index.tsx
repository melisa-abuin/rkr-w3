import { screen } from '@testing-library/react'
import TextWithIcon from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('TextWithIcon', () => {
  it('renders children correctly', () => {
    renderWithTheme(<TextWithIcon>Test Text</TextWithIcon>)
    expect(screen.getByText('Test Text')).toBeInTheDocument()
  })

  it('applies default color when no colorName is provided', () => {
    renderWithTheme(<TextWithIcon>Test</TextWithIcon>)
    expect(screen.getByText('Test')).toHaveStyle('color: #050505')
  })

  it('applies the correct color when colorName is provided', () => {
    renderWithTheme(<TextWithIcon colorName="yellow">Test</TextWithIcon>)
    expect(screen.getByText('Test')).toHaveStyle('color: #ff6c00')
  })

  it('renders the correct icon when iconName is "crown"', () => {
    renderWithTheme(<TextWithIcon iconName="crown">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders the correct icon when iconName is "winner"', () => {
    renderWithTheme(<TextWithIcon iconName="winner">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders the correct icon when iconName is "flame"', () => {
    renderWithTheme(<TextWithIcon iconName="flame">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('does not render an icon when iconName is undefined', () => {
    renderWithTheme(<TextWithIcon>Test</TextWithIcon>)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('applies the correct icon size when iconSize is provided', () => {
    renderWithTheme(
      <TextWithIcon iconName="crown" iconSize={30}>
        Test
      </TextWithIcon>,
    )
    expect(screen.getByRole('img')).toHaveAttribute('width', '30')
    expect(screen.getByRole('img')).toHaveAttribute('height', '30')
  })
})
