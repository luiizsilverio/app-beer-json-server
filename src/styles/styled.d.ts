import 'styled-components'
import theme from './theme'

// Sobrescreve o tema padrão
declare module 'styled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType {}
}