import { borderStyles, borderWidths, radii } from './border'
import { shadows } from './shadows'
import { colours } from './colour'
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
    '0': `${shadows['0']} ${colours.light.background.secondary}`,
    '0.02': `${shadows['0.02']} ${colours.light.background.secondary}`,
    '0.25': `${shadows['0.25']} ${colours.light.background.secondary}`,
    '0.5': `${shadows['0.5']} ${colours.light.background.secondary}`,
    '1': `${shadows['1']} ${colours.light.background.secondary}`,
  },
  dark: {
    '0': `${shadows['0']} ${colours.dark.background.secondary}`,
    '0.02': `${shadows['0.02']} ${colours.dark.background.secondary}`,
    '0.25': `${shadows['0.25']} ${colours.dark.background.secondary}`,
    '0.5': `${shadows['0.5']} ${colours.dark.background.secondary}`,
    '1': `${shadows['1']} ${colours.dark.background.secondary}`,
  },
}

export const tokens = {
  borderStyles,
  borderWidths,
  colours,
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
  colours: tokens.colours.light,
  boxShadows: tokens.boxShadows.light,
  mode: 'light',
}

export const darkTheme = {
  ...baseTheme,
  colours: tokens.colours.dark,
  boxShadows: tokens.boxShadows.dark,
  mode: 'dark',
}

export type { Hue, Mode } from './colour'
export type Tokens = typeof lightTheme
export type Breakpoints = keyof typeof breakpoints
export type Space = keyof typeof space
export type Colours = keyof typeof colours.light
export type Radii = keyof typeof radii
