import { mockFeatureCardItems } from '@/mocks/data/featureCard'
import { render, screen } from '@testing-library/react'
import FeatureCard from '..'

interface ImageProps {
  src: string
  alt: string
  onError: () => void
}

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(({ src, alt, onError }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} onError={onError} />
  )),
}))

describe('FeatureCard', () => {
  const items = mockFeatureCardItems

  const defaultProps = {
    title: 'Featured players',
    linkHref: '/leaderboard',
    linkLabel: 'View leaderboard',
    items,
  }

  it('renders the title', () => {
    render(<FeatureCard {...defaultProps} />)
    expect(
      screen.getByRole('heading', { name: 'Featured players' }),
    ).toBeInTheDocument()
  })

  it('renders the link with correct label and href', () => {
    render(<FeatureCard {...defaultProps} />)
    const link = screen.getByRole('link', { name: 'View leaderboard' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/leaderboard')
  })

  it('renders one card per item', () => {
    render(<FeatureCard {...defaultProps} />)
    expect(screen.getAllByRole('img')).toHaveLength(items.length)
  })

  it('renders the label for each item', () => {
    render(<FeatureCard {...defaultProps} />)
    items.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renders subLabel only for items that have it', () => {
    render(<FeatureCard {...defaultProps} />)
    expect(screen.getByText('1:00:00')).toBeInTheDocument()
    expect(screen.getByText('2:00:00')).toBeInTheDocument()
    expect(screen.getAllByText(/:\d\d:\d\d/)).toHaveLength(2)
  })

  it('renders nothing in the body when items is empty', () => {
    render(<FeatureCard {...defaultProps} items={[]} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
