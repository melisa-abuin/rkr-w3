import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Badges from '..'
import { difficultyNames } from '@/constants'

describe('Badges', () => {
  const mockOnClick = jest.fn()
  const selected = 'normal'

  it('renders all options as badges', () => {
    render(
      <Badges
        options={difficultyNames}
        selected={selected}
        onClick={mockOnClick}
      />,
    )

    difficultyNames.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('calls onClick with the correct option when a badge is clicked', async () => {
    render(
      <Badges
        options={difficultyNames}
        selected={selected}
        onClick={mockOnClick}
      />,
    )

    const badge = screen.getByText('normal')
    await userEvent.click(badge)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('normal')
  })

  it.skip('selects all option when none is selected', () => {
    render(
      <Badges
        options={difficultyNames}
        selected={undefined}
        onClick={mockOnClick}
      />,
    )

    const badge = screen.getByText('all')
    expect(badge).toHaveStyle('color: rgb(0, 0, 0)')
  })

  it('clears selected value when all option is clicked', async () => {
    render(
      <Badges
        options={difficultyNames}
        selected={selected}
        onClick={mockOnClick}
      />,
    )

    const badge = screen.getByText('all')
    await userEvent.click(badge)

    expect(mockOnClick).toHaveBeenCalled()
    expect(mockOnClick).toHaveBeenCalledWith(undefined)
  })
})
