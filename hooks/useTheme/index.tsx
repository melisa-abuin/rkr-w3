'use client'
import { Theme } from '@/interfaces/theme'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const ThemeContext = createContext<
  [Theme, React.Dispatch<React.SetStateAction<Theme>>] | undefined
>(undefined)

export function ThemeProvider({
  children,
  activeTheme,
}: {
  children: React.ReactNode
  activeTheme: Theme
}) {
  const [theme, setTheme] = useState(activeTheme)

  useEffect(() => {
    setTheme(activeTheme)
  }, [activeTheme])

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
