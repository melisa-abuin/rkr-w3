'use client'
import { TestText } from './styled'
import { ThemeProvider } from '@/hooks/useTheme'
import themes from '@/theme'
import { useState, useEffect } from 'react'
import { Theme } from '@/interfaces/theme'

export default function Home() {
  const [defaulTheme, setDefaulTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    setDefaulTheme(prefersDarkScheme ? themes.dark : themes.light)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setDefaulTheme(e.matches ? themes.dark : themes.light)
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  if (!defaulTheme) {
    return null
  }

  return (
    <ThemeProvider activeTheme={defaulTheme}>
      <main>
        <TestText>Hi!</TestText>
      </main>
      <footer>footer</footer>
    </ThemeProvider>
  )
}
