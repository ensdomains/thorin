export const fonts = {
  mono: `"iAWriter Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  sans: `"Satoshi", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
} as const

export type Font = keyof typeof fonts

export const fontSizes = {
  headingOne: '2.25rem',
  headingTwo: '1.875rem',
  headingThree: '1.625rem',
  headingFour: '1.375rem',
  extraLarge: '1.25rem',
  large: '1.125rem',
  body: '1rem',
  small: '0.875rem',
  extraSmall: '0.75rem',
} as const

export type FontSize = keyof typeof fontSizes

export const fontWeights = {
  light: '300',
  normal: '500',
  bold: '700',
  extraBold: '830',
} as const

export type FontWeight = keyof typeof fontWeights

export const letterSpacings = {
  '-0.02': '-0.02em',
  '-0.015': '-0.015em',
  '-0.01': '-0.01em',
  'normal': '0',
  '0.03': '0.03em',
} as const

export type LetterSpacing = keyof typeof letterSpacings

export const lineHeights = {
  headingOne: '3rem',
  headingTwo: '2.5rem',
  headingThree: '2.125rem',
  headingFour: '1.875rem',
  extraLarge: '1.625rem',
  large: '1.5rem',
  body: '1.25rem',
  small: '1.25rem',
  extraSmall: '1rem',
} as const

export type LineHeight = keyof typeof lineHeights
