import { render, screen } from '@testing-library/react'
import Icon from '..'
import { useTheme } from '@/hooks/useTheme'

jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}))

describe('Icon component', () => {
  const mockTheme = {
    color: { secondary: '#FF0000' },
    text: { primary: '#000000' },
  }

  beforeEach(() => {
    ;(useTheme as jest.Mock).mockReturnValue([mockTheme])
  })

  it('renders the CameraAngle icon when name is "camera-angle"', () => {
    render(<Icon name="camera-angle" />)
    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeInTheDocument()
    expect(icon.firstChild).toHaveAttribute('fill', mockTheme.text.primary)
  })

  it('renders the PawHeart icon when name is "paw-heart"', () => {
    render(<Icon name="paw-heart" />)
    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeInTheDocument()
    expect(icon.firstChild).toHaveAttribute('fill', mockTheme.text.primary)
  })

  it('renders the CenterCamera icon when name is "camera-center"', () => {
    render(<Icon name="camera-center" />)
    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeInTheDocument()
    expect(icon.firstChild).toHaveAttribute('fill', mockTheme.text.primary)
  })

  it('renders the Users icon when name is "users"', () => {
    render(<Icon name="two-users" />)
    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeInTheDocument()
    expect(icon.firstChild).toHaveAttribute('fill', mockTheme.text.primary)
  })

  it('applies the primary color when selected is true', () => {
    render(<Icon name="camera-angle" selected />)
    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeInTheDocument()
    expect(icon.firstChild).toHaveAttribute('fill', mockTheme.color.secondary)
  })
})
