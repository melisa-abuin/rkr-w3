'use client'

import { useEffect, useState } from 'react'

const darkThemeSelector = '(prefers-color-scheme: dark)'

export const usePrefersDarkMode = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(darkThemeSelector)

    setPrefersDarkMode(mediaQuery.matches)

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches)
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return prefersDarkMode
}