import { screen } from '@testing-library/react'
import Header from '..'
import { colors } from '@/constants'
import * as utils from '@/utils'
import { renderWithTheme } from '@/utils/renderWithTheme'

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  formatKeyToWord: jest.fn((key) => `Formatted ${key}`),
  hexToRgba: jest.fn((hex, alpha) => `rgba-from-${hex}-alpha-${alpha}`),
}))

describe('<Header />', () => {
  const defaultProps = {
    title: 'Test Title',
    color: 'red',
    skin: 'HuntresKitty',
  } as const

  it('renders the title', () => {
    renderWithTheme(<Header {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders the formatted skin badge', () => {
    renderWithTheme(<Header {...defaultProps} />)
    expect(screen.getByText('Formatted HuntresKitty')).toBeInTheDocument()
  })

  it('renders the color badge with correct text and style', () => {
    renderWithTheme(<Header {...defaultProps} />)
    expect(screen.getByText('red kitty')).toBeInTheDocument()
    expect(utils.hexToRgba).toHaveBeenCalledWith(colors.red, 0.5)
  })

  it('does not render skin badge if skin is not provided', () => {
    renderWithTheme(<Header {...defaultProps} skin="" />)
    expect(screen.queryByText(/Formatted/)).not.toBeInTheDocument()
  })

  it('does not render color badge if color is not provided', () => {
    renderWithTheme(<Header {...defaultProps} color={null} />)
    expect(screen.queryByText(/kitty/)).not.toBeInTheDocument()
  })
})
