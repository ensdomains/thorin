import { lightTheme } from '@ensdomains/thorin'
import 'styled-components'

type Theme = typeof lightTheme

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
