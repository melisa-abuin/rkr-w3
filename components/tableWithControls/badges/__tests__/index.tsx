import { screen, fireEvent } from '@testing-library/react'

import { Badges } from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Badges', () => {
  const mockOnClick = jest.fn()
  const options = ['normal', 'hard', 'impossible', 'all']
  const selected = 'normal'

  it('renders all options as badges', () => {
    renderWithTheme(
      <Badges
        onClick={mockOnClick}
        options={['normal', 'hard', 'impossible', 'all']}
        selected={selected}
      />,
    )

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('calls onClick with the correct option when a badge is clicked', () => {
    renderWithTheme(
      <Badges
        onClick={mockOnClick}
        options={['normal', 'hard', 'impossible', 'all']}
        selected={selected}
      />,
    )

    const badge = screen.getByText('normal')
    fireEvent.click(badge)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('normal')
  })
})
