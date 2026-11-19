import { render, screen } from '@testing-library/react'
import HighlightsSection from '..'

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  )),
}))

const items = [
  {
    imageFallbackSrc: '/fallback.png',
    imageSrc: '/one.png',
    subtitle: 'First subtitle',
    title: 'First',
  },
  {
    imageFallbackSrc: '/fallback.png',
    imageSrc: '/two.png',
    subtitle: 'Second subtitle',
    title: 'Second',
  },
  {
    imageFallbackSrc: '/fallback.png',
    imageSrc: '/three.png',
    subtitle: 'Third subtitle',
    title: 'Third',
  },
]

describe('HighlightsSection', () => {
  it('renders the section title and subtitle', () => {
    render(<HighlightsSection items={items} subtitle="Sub" title="Main" />)

    expect(screen.getByRole('heading', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByText('Sub')).toBeInTheDocument()
  })

  it('renders an image, title and subtitle for each item', () => {
    render(<HighlightsSection items={items} subtitle="Sub" title="Main" />)

    items.forEach(({ imageSrc, subtitle, title }) => {
      expect(screen.getByAltText(title)).toHaveAttribute('src', imageSrc)
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(subtitle)).toBeInTheDocument()
    })
  })

  it('does not render the items while loading', () => {
    render(
      <HighlightsSection loading items={items} subtitle="Sub" title="Main" />,
    )

    expect(screen.queryByAltText('First')).not.toBeInTheDocument()
  })
})
