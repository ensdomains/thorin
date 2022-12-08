import { borderStyles, borderWidths, radii } from './border'
import { shadows } from './shadows'
import { colors } from './color'
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
  popIn: 'cubic-bezier(0.15, 1.15, 0.6, 1)',
}

export const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

const boxShadows = {
  light: {
    '0': `${shadows['0']} ${colors.light.backgroundSecondary}`,
    '0.02': `${shadows['0.02']} ${colors.light.backgroundSecondary}`,
    '0.25': `${shadows['0.25']} ${colors.light.backgroundSecondary}`,
    '0.5': `${shadows['0.5']} ${colors.light.backgroundSecondary}`,
    '1': `${shadows['1']} ${colors.light.backgroundSecondary}`,
  },
  dark: {
    '0': `${shadows['0']} ${colors.dark.backgroundSecondary}`,
    '0.02': `${shadows['0.02']} ${colors.dark.backgroundSecondary}`,
    '0.25': `${shadows['0.25']} ${colors.dark.backgroundSecondary}`,
    '0.5': `${shadows['0.5']} ${colors.dark.backgroundSecondary}`,
    '1': `${shadows['1']} ${colors.dark.backgroundSecondary}`,
  },
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
  shadows,
  space,
  breakpoints,
  transitionDuration,
  transitionTimingFunction,
  boxShadows,
}

export const baseTheme = {
  borderStyles,
  borderWidths,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  opacity,
  radii,
  shadows,
  space,
  breakpoints,
  transitionDuration,
  transitionTimingFunction,
}

export const lightTheme = {
  ...baseTheme,
  colors: tokens.colors.light,
  boxShadows: tokens.boxShadows.light,
  mode: 'light',
}

export const darkTheme = {
  ...baseTheme,
  colors: tokens.colors.dark,
  boxShadows: tokens.boxShadows.dark,
  mode: 'dark',
}

export type { Hue, Mode } from './color'
export type Tokens = typeof lightTheme
export type Breakpoints = keyof typeof breakpoints
export type Space = keyof typeof space
export type Colors = Exclude<keyof typeof colors.light, 'raw' | 'gradients'>
export type Radii = keyof typeof radii
