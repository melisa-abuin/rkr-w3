'use client'
export interface Theme {
  button: Record<
    string,
    {
      background: string
      color: string
      hoverBackground: string
      hoverColor: string
    }
  >
  color: Record<string, string>
  background: Record<string, string>
  text: Record<string, string>
  name: 'dark' | 'light'
}

export interface Themes {
  dark: Theme
  light: Theme
}
