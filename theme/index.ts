import { Themes } from '@/interfaces/theme'
import darkTheme from './dark'
import lightTheme from './light'

const themes = {
  dark: darkTheme,
  light: lightTheme,
} satisfies Themes

export default themes
