import { screen, fireEvent } from '@testing-library/react'
import Input from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

function mockMatchMedia(matches: boolean) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

describe('Input Component', () => {
  const mockOnChange = jest.fn()
  const mockOnCrossClick = jest.fn()

  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false)
  })

  it('renders correctly with required props', () => {
    renderWithTheme(
      <Input
        id="test-input"
        name="test"
        placeholder="Enter text"
        value=""
        onChange={mockOnChange}
      />,
    )

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toBeInTheDocument()
  })

  it('renders with a left icon if provided', () => {
    renderWithTheme(
      <Input
        id="test-input"
        name="test"
        placeholder="Enter text"
        value=""
        onChange={mockOnChange}
        leftIcon={<span data-testid="left-icon">🔍</span>}
      />,
    )

    const leftIcon = screen.getByTestId('left-icon')
    expect(leftIcon).toBeInTheDocument()
  })

  it('calls onChange handler when typing', () => {
    renderWithTheme(
      <Input
        id="test-input"
        name="test"
        placeholder="Enter text"
        value=""
        onChange={mockOnChange}
      />,
    )

    const inputElement = screen.getByPlaceholderText('Enter text')
    fireEvent.change(inputElement, { target: { value: 'Hello' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('renders clear icon when there is a value and onCrossClick is provided', () => {
    renderWithTheme(
      <Input
        id="test-input"
        name="test"
        placeholder="Enter text"
        value="Hello"
        onChange={mockOnChange}
        onCrossClick={mockOnCrossClick}
      />,
    )

    const clearIcon = screen.getByRole('button')
    expect(clearIcon).toBeInTheDocument()
  })

  it('calls onCrossClick when clicking the clear icon', () => {
    renderWithTheme(
      <Input
        id="test-input"
        name="test"
        placeholder="Enter text"
        value="Hello"
        onChange={mockOnChange}
        onCrossClick={mockOnCrossClick}
      />,
    )

    const clearIcon = screen.getByRole('button')
    fireEvent.click(clearIcon)

    expect(mockOnCrossClick).toHaveBeenCalledTimes(1)
  })
})
