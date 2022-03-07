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

const transitionDuration = {
  '75': '75ms',
  '100': '100ms',
  '150': '150ms',
  '200': '200ms',
  '300': '300ms',
  '500': '500ms',
  '700': '700ms',
  '1000': '1000ms',
}

const transitionTimingFunction = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
}

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
  transitionDuration,
  transitionTimingFunction,
}

export type { Accent, Mode } from './color'
export type Tokens = typeof tokens
export type Breakpoints = keyof typeof breakpoints
export type Space = keyof typeof space
export type Colors = keyof typeof colors.light
export type Radii = keyof typeof radii
