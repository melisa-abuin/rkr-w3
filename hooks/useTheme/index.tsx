'use client'
import { Theme } from '@/interfaces/theme'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import themes from '@/theme'

const darkThemeSelector = '(prefers-color-scheme: dark)'

const ThemeContext = createContext<
  [Theme, React.Dispatch<React.SetStateAction<Theme>>] | undefined
>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(themes.light)

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(darkThemeSelector).matches
    setTheme(prefersDarkScheme ? themes.light : themes.light)

    const mediaQuery = window.matchMedia(darkThemeSelector)
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? themes.dark : themes.light)
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

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
