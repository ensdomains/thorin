import { borderStyles, borderWidths, radii } from './border'
import { shadows } from './shadows'
import { colors, shades } from './color'
import { opacity } from './opacity'
import { space } from './space'
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
} from './typography'

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const tokens = {
  borderStyles,
  borderWidths,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  opacity,
  radii,
  shades,
  shadows,
  space,
  breakpoints,
}

export type { Accent, Mode } from './color'
export type Tokens = typeof tokens
export type Breakpoints = keyof typeof breakpoints
export type Space = keyof typeof space
