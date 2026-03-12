import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '..'
import themes from '@/theme'
import styled from 'styled-components'

jest.mock('@/hooks/usePreferredTheme', () => ({
  usePreferredTheme: jest.fn(),
}))

const mockUsePreferredTheme = jest.requireMock(
  '@/hooks/usePreferredTheme',
).usePreferredTheme

const MockChildComponent = styled.div`
  background-color: ${({ theme }) => theme.text.primary};
`

describe('ThemeProvider', () => {
  it('provides the correct theme context based on the preferred theme (light)', () => {
    mockUsePreferredTheme.mockReturnValue([themes.light, jest.fn()])

    render(
      <ThemeProvider>
        <MockChildComponent>Hello</MockChildComponent>
      </ThemeProvider>,
    )

    const element = screen.getByText('Hello')

    const styles = getComputedStyle(element)

    expect(styles.backgroundColor).toBe('rgb(5, 5, 5)')
  })
})
