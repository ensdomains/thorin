export type Font = 'mono' | 'sans'

export type FontSize =
  | 'headingOne'
  | 'headingTwo'
  | 'headingThree'
  | 'headingFour'
  | 'extraLarge'
  | 'large'
  | 'body'
  | 'small'
  | 'extraSmall'

export type FontWeight = 'light' | 'normal' | 'bold' | 'extraBold'

export const fonts: { [key in Font]: string } = {
  mono: `"iAWriter Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  sans: `"Satoshi", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
}

export const fontSizes: { [key in FontSize]: string } = {
  headingOne: '2.25rem',
  headingTwo: '1.875rem',
  headingThree: '1.625rem',
  headingFour: '1.375rem',
  extraLarge: '1.25rem',
  large: '1.125rem',
  body: '1rem',
  small: '0.875rem',
  extraSmall: '0.75rem',
}

export const fontWeights: { [key in FontWeight]: string } = {
  light: '300',
  normal: '500',
  bold: '700',
  extraBold: '830',
}

export const letterSpacings = {
  '-0.02': '-0.02em',
  '-0.015': '-0.015em',
  '-0.01': '-0.01em',
  normal: '0',
  '0.03': '0.03em',
}

export const lineHeights: { [key in FontSize]: string } = {
  headingOne: '3rem',
  headingTwo: '2.5rem',
  headingThree: '2.125rem',
  headingFour: '1.875rem',
  extraLarge: '1.625rem',
  large: '1.5rem',
  body: '1.25rem',
  small: '1.25rem',
  extraSmall: '1rem',
}
