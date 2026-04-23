import { render, screen } from '@testing-library/react'
import Step from '..'

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

describe('Step', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders step text correctly', () => {
    render(<Step stepTitle="step 1" text="top text" />)

    expect(screen.getByText('top text')).toBeInTheDocument()
    expect(screen.getByText('step 1')).toBeInTheDocument()
  })

  it('uses the correct src passed by props', () => {
    render(
      <Step
        imageSrcSet={{
          dark: '/discord-example5-dark.png',
          light: '/discord-example5-light.png',
        }}
        text="top text"
      />,
    )

    const image = screen.getByAltText('Discord screenshot example')
    expect(image).toHaveAttribute('src', '/discord-example5-light.png')
  })
})
