'use client'

import { useEffect, useState } from 'react'
import { Theme } from '@/interfaces/theme'
import themes from '@/theme'

const darkThemeSelector = '(prefers-color-scheme: dark)'

export const usePreferredTheme = (): [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>,
] => {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const defaultTheme = window.matchMedia(darkThemeSelector).matches
      ? themes.dark
      : themes.light

    setTheme(defaultTheme)
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
