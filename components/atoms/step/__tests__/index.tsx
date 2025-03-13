import { screen } from '@testing-library/react'
import Step from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

interface ImageProps {
  src: string
  alt: string
  onError: () => void
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, onError }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={onError} />
  )),
}))

describe('Step', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders step text correctly', () => {
    renderWithTheme(<Step text="top text" stepTitle="step 1" />)

    expect(screen.getByText('top text')).toBeInTheDocument()
    expect(screen.getByText('step 1')).toBeInTheDocument()
  })

  it('uses the correct src passed by props', () => {
    renderWithTheme(
      <Step
        text="top text"
        imageSrcSet={{
          dark: '/discord-example5-dark.png',
          light: '/discord-example5-light.png',
        }}
      />,
    )

    const image = screen.getByAltText('Discord screenshot example')
    expect(image).toHaveAttribute('src', '/discord-example5-light.png')
  })
})
