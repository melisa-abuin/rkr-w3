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
  it('renders step text correctly', () => {
    renderWithTheme(<Step text="top text" stepTitle="step 1" />)

    expect(screen.getByText('top text')).toBeInTheDocument()
    expect(screen.getByText('step 1')).toBeInTheDocument()
  })

  it('uses the correct src passed by props', () => {
    renderWithTheme(<Step text="top text" imageSrc="/test.jpg" />)

    const image = screen.getByAltText('Discord screenshot example')
    expect(image).toHaveAttribute('src', '/test.jpg')
  })
})
