import { screen } from '@testing-library/react'
import Player from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Player component', () => {
  beforeEach(() => {
    Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
      configurable: true,
      value: jest.fn(),
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should not render when no videoUrl is provided', () => {
    const { container } = renderWithTheme(<Player />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render a video element when videoUrl is provided', () => {
    const videoUrl = '/path/to/video.mp4'
    renderWithTheme(<Player videoUrl={videoUrl} />)

    const videoElement = screen.getByRole('video')
    expect(videoElement).toBeInTheDocument()

    const sourceElement = screen.getByRole('video').querySelector('source')
    expect(sourceElement).toHaveAttribute('src', videoUrl)
  })

  it('should auto-play, loop, and be muted', () => {
    const videoUrl = '/path/to/video.mp4'
    renderWithTheme(<Player videoUrl={videoUrl} />)

    const videoElement = screen.getByRole('video')
    expect(videoElement).toHaveAttribute('autoPlay')
    expect(videoElement).toHaveAttribute('loop')
    expect(videoElement).toHaveProperty('muted', true)
  })
})
