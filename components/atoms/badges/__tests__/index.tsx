import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Badges from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Badges', () => {
  const mockOnClick = jest.fn()
  const options = ['normal', 'hard', 'impossible']
  const selected = 'normal'

  it('renders all options as badges', () => {
    renderWithTheme(
      <Badges
        onClick={mockOnClick}
        options={['normal', 'hard', 'impossible']}
        selected={selected}
      />,
    )

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('calls onClick with the correct option when a badge is clicked', async () => {
    renderWithTheme(
      <Badges
        onClick={mockOnClick}
        options={['normal', 'hard', 'impossible']}
        selected={selected}
      />,
    )

    const badge = screen.getByText('normal')
    await userEvent.click(badge)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('normal')
  })

  it('selects all option when none is selected', () => {
    renderWithTheme(
      <Badges
        onClick={mockOnClick}
        options={['normal', 'hard', 'impossible']}
        selected={undefined}
      />,
    )

    const badge = screen.getByText('all')
    expect(badge).toHaveStyle('color: rgb(65, 178, 178)')
  })

  it('clears selected value when all option is clicked', async () => {
    renderWithTheme(
      <Badges
        onClick={mockOnClick}
        options={['normal', 'hard', 'impossible']}
        selected={selected}
      />,
    )

    const badge = screen.getByText('all')
    await userEvent.click(badge)

    expect(mockOnClick).toHaveBeenCalled()
    expect(mockOnClick).toHaveBeenCalledWith(undefined)
  })
})
