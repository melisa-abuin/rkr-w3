import { render, screen } from '@testing-library/react'
import LoaderPodium from '..'

describe('LoaderPodium', () => {
  it('renders three loaders', () => {
    render(<LoaderPodium compact={false} withBase={false} />)

    expect(screen.getAllByRole('progressbar')).toHaveLength(3)
  })

  it('renders the base only when withBase is true', () => {
    const { container, rerender } = render(
      <LoaderPodium compact={false} withBase={false} />,
    )
    const childrenWithoutBase = container.children.length

    rerender(<LoaderPodium compact withBase />)

    expect(container.children.length).toBe(childrenWithoutBase + 1)
  })
})
