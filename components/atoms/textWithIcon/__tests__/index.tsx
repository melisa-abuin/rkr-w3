import { screen } from '@testing-library/react'
import TextWithIcon from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}))

const mockUseTheme = jest.requireMock('@/hooks/useTheme').useTheme

const mockTheme = {
  text: { primary: '#000' },
  color: { primary: '#ff0000', customColor: '#00ff00' },
}

describe('TextWithIcon', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue([mockTheme])
  })

  test('renders children correctly', () => {
    renderWithTheme(<TextWithIcon>Test Text</TextWithIcon>)
    expect(screen.getByText('Test Text')).toBeInTheDocument()
  })

  test('applies default color when no colorName is provided', () => {
    renderWithTheme(<TextWithIcon>Test</TextWithIcon>)
    expect(screen.getByText('Test')).toHaveStyle(
      `color: ${mockTheme.text.primary}`,
    )
  })

  test('applies the correct color when colorName is provided', () => {
    renderWithTheme(<TextWithIcon colorName="customColor">Test</TextWithIcon>)
    expect(screen.getByText('Test')).toHaveStyle(
      `color: ${mockTheme.color.customColor}`,
    )
  })

  test('renders the correct icon when iconName is "crown"', () => {
    renderWithTheme(<TextWithIcon iconName="crown">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('renders the correct icon when iconName is "winner"', () => {
    renderWithTheme(<TextWithIcon iconName="winner">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('renders the correct icon when iconName is "flame"', () => {
    renderWithTheme(<TextWithIcon iconName="flame">Test</TextWithIcon>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('does not render an icon when iconName is undefined', () => {
    renderWithTheme(<TextWithIcon>Test</TextWithIcon>)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('applies the correct icon size when iconSize is provided', () => {
    renderWithTheme(
      <TextWithIcon iconName="crown" iconSize={30}>
        Test
      </TextWithIcon>,
    )
    expect(screen.getByRole('img')).toHaveAttribute('width', '30')
    expect(screen.getByRole('img')).toHaveAttribute('height', '30')
  })
})
