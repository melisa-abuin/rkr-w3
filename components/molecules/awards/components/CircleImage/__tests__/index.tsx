import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import CircleImage from '..'
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

describe('CircleImage', () => {
  const defaultProps = {
    alt: 'Test image',
    completed: true,
    fallbackSrc: '/fallback.jpg',
    src: '/test.jpg',
  }

  it('renders the image with the provided src', () => {
    renderWithTheme(<CircleImage {...defaultProps} />)
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('src', '/test.jpg')
  })

  it('switches to the fallback source when the image fails to load', () => {
    renderWithTheme(<CircleImage {...defaultProps} />)
    const image = screen.getByAltText('Test image')

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', '/fallback.jpg')
  })
})
