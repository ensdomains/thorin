import type { lightTheme } from '@ensdomains/thorin'
import 'styled-components'

type Theme = typeof lightTheme

declare module 'styled-components' {
  type DefaultTheme = Theme
}
