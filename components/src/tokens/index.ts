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
import { transitionDuration, transitionTimingFunction } from './transition'
import { colorStyles, type ColorStyleBase } from './colorStyle'

const combinedColors = {
  light: { ...colors.light, ...colorStyles.light },
  dark: { ...colors.dark, ...colorStyles.dark },
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
    0: `${shadows['0']} ${colors.light.backgroundSecondary}`,
    0.02: `${shadows['0.02']} ${colors.light.backgroundSecondary}`,
    0.25: `${shadows['0.25']} ${colors.light.backgroundSecondary}`,
    0.5: `${shadows['0.5']} ${colors.light.backgroundSecondary}`,
    1: `${shadows['1']} ${colors.light.backgroundSecondary}`,
  },
  dark: {
    0: `${shadows['0']} ${colors.dark.backgroundSecondary}`,
    0.02: `${shadows['0.02']} ${colors.dark.backgroundSecondary}`,
    0.25: `${shadows['0.25']} ${colors.dark.backgroundSecondary}`,
    0.5: `${shadows['0.5']} ${colors.dark.backgroundSecondary}`,
    1: `${shadows['1']} ${colors.dark.backgroundSecondary}`,
  },
}

export const tokens = {
  borderStyles,
  borderWidths,
  colors: combinedColors,
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
export type Colors = keyof typeof colors.light
export type ColorStyles = ColorStyleBase
export type Radii = keyof typeof radii
export type TransitionDuration = keyof typeof transitionDuration
