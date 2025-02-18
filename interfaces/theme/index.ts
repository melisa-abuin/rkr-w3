'use client'
export interface Theme {
  color: Record<string, string>
  background: Record<string, string>
  text: Record<string, string>
  name: 'dark' | 'light'
}

export interface Themes {
  dark: Theme
  light: Theme
}
