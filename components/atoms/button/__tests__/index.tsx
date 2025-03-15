import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Button Component', () => {
  it('renders correctly with children', () => {
    renderWithTheme(<Button onClick={() => {}}>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    renderWithTheme(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
