import { screen, fireEvent } from '@testing-library/react'
import Toggle from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Toggle Component', () => {
  test('renders correctly with initial state', () => {
    renderWithTheme(
      <Toggle
        onToggle={jest.fn()}
        iconOn={<span data-testid="icon-on"></span>}
        iconOff={<span data-testid="icon-off"></span>}
        textOn="Enabled"
        textOff="Disabled"
      />,
    )

    expect(screen.getByText('Disabled')).toBeInTheDocument()
    expect(screen.getByTestId('icon-off')).toBeInTheDocument()
  })

  test('calls onToggle when clicked', () => {
    const mockOnToggle = jest.fn()
    renderWithTheme(
      <Toggle
        onToggle={mockOnToggle}
        iconOn={<span>ON</span>}
        iconOff={<span>OFF</span>}
        textOn="Enabled"
        textOff="Disabled"
      />,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  test('toggles text and icon on click', () => {
    renderWithTheme(
      <Toggle
        onToggle={jest.fn()}
        iconOn={<span data-testid="icon-on">ON</span>}
        iconOff={<span data-testid="icon-off">OFF</span>}
        textOn="Enabled"
        textOff="Disabled"
      />,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('Enabled')).toBeInTheDocument()
    expect(screen.getByTestId('icon-on')).toBeInTheDocument()
  })
})
