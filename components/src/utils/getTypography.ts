import { DefaultTheme, WithTypography } from '../types'

type TypographyFunc = (
  theme: DefaultTheme,
  typography?: WithTypography['fontVariant'],
  field?: 'fontSize' | 'lineHeight' | 'fontWeight',
) => string

const getFontSize: TypographyFunc = (theme, typography) => {
  if (!typography) return theme.fontSizes.body
  return (
    {
      label: theme.fontSizes.extraSmall,
      labelHeading: theme.fontSizes.small,
      heading1: theme.fontSizes.headingOne,
      heading2: theme.fontSizes.headingTwo,
      heading3: theme.fontSizes.headingThree,
      heading4: theme.fontSizes.headingFour,
      extraLarge: theme.fontSizes.extraLarge,
      extraLargeBold: theme.fontSizes.extraLarge,
      large: theme.fontSizes.large,
      largeBold: theme.fontSizes.large,
      regular: theme.fontSizes.body,
      regularBold: theme.fontSizes.body,
      small: theme.fontSizes.small,
      smallBold: theme.fontSizes.small,
      extraSmall: theme.fontSizes.extraSmall,
      extraSmallBold: theme.fontSizes.extraSmall,
    }[typography] || theme.fontSizes.body
  )
}

const getLineHeight: TypographyFunc = (theme, typography) => {
  if (!typography) return theme.lineHeights.body
  return (
    {
      label: theme.lineHeights.extraSmall,
      labelHeading: theme.lineHeights.small,
      heading1: theme.lineHeights.headingOne,
      heading2: theme.lineHeights.headingTwo,
      heading3: theme.lineHeights.headingThree,
      heading4: theme.lineHeights.headingFour,
      extraLarge: theme.lineHeights.extraLarge,
      extraLargeBold: theme.lineHeights.extraLarge,
      large: theme.lineHeights.large,
      largeBold: theme.lineHeights.large,
      regular: theme.lineHeights.body,
      regularBold: theme.lineHeights.body,
      small: theme.lineHeights.small,
      smallBold: theme.lineHeights.small,
      extraSmall: theme.lineHeights.extraSmall,
      extraSmallBold: theme.lineHeights.extraSmall,
    }[typography] || theme.lineHeights.body
  )
}

const getFontWeight: TypographyFunc = (theme, typography) => {
  if (!typography) return theme.fontWeights.normal
  return (
    {
      label: theme.fontWeights.normal,
      labelHeading: theme.fontWeights.normal,
      heading1: theme.fontWeights.extraBold,
      heading2: theme.fontWeights.bold,
      heading3: theme.fontWeights.bold,
      heading4: theme.fontWeights.bold,
      extraLarge: theme.fontWeights.normal,
      extraLargeBold: theme.fontWeights.bold,
      large: theme.fontWeights.normal,
      largeBold: theme.fontWeights.bold,
      regular: theme.fontWeights.normal,
      regularBold: theme.fontWeights.bold,
      small: theme.fontWeights.normal,
      smallBold: theme.fontWeights.bold,
      extraSmall: theme.fontWeights.normal,
      extraSmallBold: theme.fontWeights.bold,
    }[typography] || theme.fontWeights.normal
  )
}

export const getTypography: TypographyFunc = (theme, typography, field) => {
  if (!typography) return 'initial'
  if (field === 'fontSize') return getFontSize(theme, typography)
  if (field === 'lineHeight') return getLineHeight(theme, typography)
  if (field === 'fontWeight') return getFontWeight(theme, typography)
  return 'initial'
}
