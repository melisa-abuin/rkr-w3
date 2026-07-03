import { fireEvent, render, screen } from '@testing-library/react'
import VerticalCard from '..'

interface ImageProps {
  src: string
  alt: string
  onError: () => void
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, onError }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} onError={onError} />
  )),
}))

describe('VerticalCard', () => {
  const defaultProps = {
    imageSrc: '/awards/test.png',
    imageFallbackSrc: '/awards/fallback.png',
    label: 'PlayerName',
  } as const

  it('renders the image with the provided src', () => {
    render(<VerticalCard {...defaultProps} />)
    expect(screen.getByAltText('PlayerName')).toHaveAttribute(
      'src',
      '/awards/test.png',
    )
  })

  it('falls back to imageFallbackSrc when the image fails to load', () => {
    render(<VerticalCard {...defaultProps} />)
    fireEvent.error(screen.getByAltText('PlayerName'))
    expect(screen.getByAltText('PlayerName')).toHaveAttribute(
      'src',
      '/awards/fallback.png',
    )
  })

  it('renders the label', () => {
    render(<VerticalCard {...defaultProps} />)
    expect(screen.getByText('PlayerName')).toBeInTheDocument()
  })

  it('renders the subLabel when provided', () => {
    render(<VerticalCard {...defaultProps} subLabel="1:23:45" />)
    expect(screen.getByText('1:23:45')).toBeInTheDocument()
  })

  it('does not render subLabel when not provided', () => {
    const { container } = render(<VerticalCard {...defaultProps} />)
    expect(container.querySelectorAll('p')).toHaveLength(1)
  })

  it('renders a divider between the image and the label', () => {
    const { container } = render(<VerticalCard {...defaultProps} />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })
})
