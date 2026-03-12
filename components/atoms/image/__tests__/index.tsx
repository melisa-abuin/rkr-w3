import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import Image from '..'
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

describe('Image', () => {
  const defaultProps = {
    colored: true,
    fallbackSrc: '/fallback.jpg',
    src: '/test.jpg',
  } as const

  it('renders the image with the provided src', () => {
    renderWithTheme(<Image {...defaultProps} alt="some alt text" />)
    const image = screen.getByAltText('some alt text')
    expect(image).toHaveAttribute('src', '/test.jpg')
  })

  it('switches to the fallback source when the image fails to load', () => {
    renderWithTheme(<Image {...defaultProps} alt="some alt text" />)
    const image = screen.getByAltText('some alt text')

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', '/fallback.jpg')
  })
})
