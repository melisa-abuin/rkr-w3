import '@testing-library/jest-dom'
import '@testing-library/dom'

function mockMatchMedia(matches) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

global.matchMedia = mockMatchMedia(false)
