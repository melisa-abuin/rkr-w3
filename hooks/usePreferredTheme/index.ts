import { useEffect, useState } from 'react'
import { Theme } from '@/interfaces/theme'
import themes from '@/theme'

const darkThemeSelector = '(prefers-color-scheme: dark)'

export const usePreferredTheme = (): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>,
] => {
  const [theme, setTheme] = useState<Theme>(themes.light)

  useEffect(() => {
    // Get the user preferred theme set at browser level
    const prefersDarkScheme = window.matchMedia(darkThemeSelector).matches
    setTheme(prefersDarkScheme ? themes.dark : themes.light)

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
