'use client'

import { useEffect, useState } from 'react'
import { Theme } from '@/interfaces/theme'
import themes from '@/theme'

const darkThemeSelector = '(prefers-color-scheme: dark)'

export const usePreferredTheme = (): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>,
] => {
  const defaultTheme = window.matchMedia(darkThemeSelector).matches
    ? themes.dark
    : themes.light

  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const mediaQuery = window.matchMedia(darkThemeSelector)
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? themes.dark : themes.light)
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return [theme, setTheme]
}
