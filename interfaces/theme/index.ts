'use client'
import { PlayerColor } from '../player'

export type BadgeColor = Exclude<PlayerColor, null> | 'primary' | 'tertiary'

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
  badge: Record<
    BadgeColor,
    {
      background: string
      color: string
    }
  >
  color: Record<string, string>
  background: Record<string, string>
  text: {
    color: Record<string, string>
    hover: Record<string, string>
  }

  name: 'dark' | 'light'
}

export interface Themes {
  dark: Theme
  light: Theme
}
