import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Input Component', () => {
  const mockOnChange = jest.fn()
  const mockOnCrossClick = jest.fn()

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

  it('calls onChange handler when typing', async () => {
    const user = userEvent.setup()

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
    await user.type(inputElement, 'Hello')

    expect(mockOnChange).toHaveBeenCalled()
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

  it('calls onCrossClick when clicking the clear icon', async () => {
    const user = userEvent.setup()

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
    await user.click(clearIcon)

    expect(mockOnCrossClick).toHaveBeenCalledTimes(1)
  })

  it('calls onFocus when input gets focus', async () => {
    const onFocus = jest.fn()
    const user = userEvent.setup()

    renderWithTheme(
      <Input
        id="test-input"
        name="test"
        placeholder="Enter text"
        value="Hello"
        onChange={mockOnChange}
        onFocus={onFocus}
      />,
    )

    const clearIcon = screen.getByRole('textbox')
    await user.click(clearIcon)

    expect(onFocus).toHaveBeenCalledTimes(1)
  })
})
