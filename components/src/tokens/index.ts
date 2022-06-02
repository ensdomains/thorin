import { borderStyles, borderWidths, radii } from './border'
import { shadows } from './shadows'
import { accentsRaw, colors, shades, shadesRaw } from './color'
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
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

const boxShadows = {
  light: {
    '0': `${shadows['0']} ${colors.light.foregroundSecondary}`,
    '0.02': `${shadows['0.02']} ${colors.light.foregroundSecondary}`,
    '0.25': `${shadows['0.25']} ${colors.light.foregroundSecondary}`,
    '0.5': `${shadows['0.5']} ${colors.light.foregroundSecondary}`,
    '1': `${shadows['1']} ${colors.light.foregroundSecondary}`,
  },
  dark: {
    '0': `${shadows['0']} ${colors.dark.foregroundSecondary}`,
    '0.02': `${shadows['0.02']} ${colors.dark.foregroundSecondary}`,
    '0.25': `${shadows['0.25']} ${colors.dark.foregroundSecondary}`,
    '0.5': `${shadows['0.5']} ${colors.dark.foregroundSecondary}`,
    '1': `${shadows['1']} ${colors.dark.foregroundSecondary}`,
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
  shades,
  shadows,
  space,
  breakpoints,
  transitionDuration,
  transitionTimingFunction,
  boxShadows,
  accentsRaw,
  shadesRaw,
}

export const baseTheme = {
  borderStyles,
  borderWidths,
  colors: colors.base,
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
  colors: {
    ...baseTheme.colors,
    ...tokens.colors.light,
  },
  shades: tokens.shades.light,
  boxShadows: tokens.boxShadows.light,
  accentsRaw: tokens.accentsRaw.light,
  shadesRaw: tokens.shadesRaw.light,
  mode: 'light',
}

export const darkTheme = {
  ...tokens,
  colors: {
    ...baseTheme.colors,
    ...tokens.colors.dark,
  },
  shades: tokens.shades.dark,
  boxShadows: tokens.boxShadows.dark,
  accentsRaw: tokens.accentsRaw.dark,
  shadesRaw: tokens.shadesRaw.dark,
  mode: 'dark',
}

export type { Accent, Mode } from './color'
export type Tokens = typeof lightTheme
export type Breakpoints = keyof typeof breakpoints
export type Space = keyof typeof space
export type Colors = keyof typeof colors.light
export type Radii = keyof typeof radii
