import { screen } from '@testing-library/react'
import ColorBadge from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('ColorBadge', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders children', () => {
    renderWithTheme(<ColorBadge>Badge Text</ColorBadge>)
    expect(screen.getByText('Badge Text')).toBeInTheDocument()
  })

  it('uses red badge colors by default', () => {
    renderWithTheme(<ColorBadge>Default Badge</ColorBadge>)

    expect(screen.getByText('Default Badge')).toHaveStyle(
      'background-color: #e13c3c',
    )
    expect(screen.getByText('Default Badge')).toHaveStyle('color: #ffffff')
  })

  it('uses provided badge color variant', () => {
    renderWithTheme(<ColorBadge colorName="primary">Primary Badge</ColorBadge>)

    expect(screen.getByText('Primary Badge')).toHaveStyle(
      'background-color: #b24141',
    )
    expect(screen.getByText('Primary Badge')).toHaveStyle('color: #ffffff')
  })

  it('returns null when colorName is null', () => {
    renderWithTheme(<ColorBadge colorName={null}>Hidden Badge</ColorBadge>)

    expect(screen.queryByText('Hidden Badge')).not.toBeInTheDocument()
  })

  it('logs an error and returns null for unknown color', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    renderWithTheme(
      <ColorBadge colorName={'invalid-color' as never}>
        Invalid Badge
      </ColorBadge>,
    )

    expect(screen.queryByText('Invalid Badge')).not.toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Badge color "invalid-color" is not defined in light theme.',
    )
  })
})
