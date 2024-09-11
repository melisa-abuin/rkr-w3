import { render } from '@testing-library/react'
import { ThemeProvider } from '@/hooks/useTheme'
import themes from '@/theme'
import { ReactNode } from 'react'

jest.mock('@/hooks/usePreferredTheme', () => ({
  usePreferredTheme: jest.fn(() => [themes.light, jest.fn()]),
}))

const renderWithTheme = (ui: ReactNode) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

export { renderWithTheme }
