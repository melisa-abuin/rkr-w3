import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '..'

vi.mock('@/hooks/usePrefersDarkMode', () => ({
  usePrefersDarkMode: vi.fn(() => false),
}))

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode'

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button onClick={() => {}}>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Click Me
      </Button>,
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows loading image instead of children when loading is true', () => {
    render(<Button loading>Click Me</Button>)
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument()
  })

  it('uses light gif when loading and light mode', () => {
    vi.mocked(usePrefersDarkMode).mockReturnValue(false)
    render(<Button loading>Click Me</Button>)
    expect(screen.getByRole('img', { name: 'loading' })).toHaveAttribute(
      'src',
      expect.stringContaining('loading-light.gif'),
    )
  })

  it('uses dark gif when loading and dark mode', () => {
    vi.mocked(usePrefersDarkMode).mockReturnValue(true)
    render(<Button loading>Click Me</Button>)
    expect(screen.getByRole('img', { name: 'loading' })).toHaveAttribute(
      'src',
      expect.stringContaining('loading-dark.gif'),
    )
  })
})
