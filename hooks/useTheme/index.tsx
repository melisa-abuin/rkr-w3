'use client'

import { Theme } from '@/interfaces/theme'
import React, { createContext, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { usePreferredTheme } from '../usePreferredTheme'

const ThemeContext = createContext<
  [Theme, React.Dispatch<React.SetStateAction<Theme | null>>] | undefined
>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = usePreferredTheme()

  if (!theme) {
    return null
  }

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
