import { screen } from '@testing-library/react'
import Step from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Step', () => {
  it('renders step text correctly', () => {
    renderWithTheme(<Step topText="top text" bottomText="bottom text" />)

    expect(screen.getByText('top text')).toBeInTheDocument()
    expect(screen.getByText('bottom text')).toBeInTheDocument()
  })

  it('uses the correct src passed by props', () => {
    renderWithTheme(
      <Step topText="top text" imageSrc="/test.jpg" bottomText="bottom text" />,
    )

    const image = screen.getByAltText('Discord screenshot example')
    expect(image).toHaveAttribute('src', '/test.jpg')
  })
})
