import { DefaultTheme, WithTypography } from '../types'

type TypographyFunc = (
  theme: DefaultTheme,
  typography?: WithTypography['typography'],
  field?: 'fontSize' | 'lineHeight' | 'fontWeight',
) => string

const getFontSize: TypographyFunc = (theme, typography) => {
  if (!typography) return theme.fontSizes.body
  if (typography === 'small') return theme.fontSizes.small
  if (typography === 'large') return theme.fontSizes.large
  if (typography === 'extraLarge') return theme.fontSizes.extraLarge
  if (typography === 'label') return theme.fontSizes.extraSmall
  if (typography === 'labelHeading') return theme.fontSizes.small
  if (typography === 'Heading/H1') return theme.fontSizes.headingOne
  if (typography === 'Heading/H2') return theme.fontSizes.headingTwo
  if (typography === 'Heading/H3') return theme.fontSizes.headingThree
  if (typography === 'Heading/H4') return theme.fontSizes.headingFour
  if (typography === 'Large/XL Normal') return theme.fontSizes.extraLarge
  if (typography === 'Large/XL Bold') return theme.fontSizes.extraLarge
  if (typography === 'Large/Normal') return theme.fontSizes.large
  if (typography === 'Large/Bold') return theme.fontSizes.large
  if (typography === 'Body/Normal') return theme.fontSizes.body
  if (typography === 'Body/Bold') return theme.fontSizes.body
  if (typography === 'Small/Normal') return theme.fontSizes.small
  if (typography === 'Small/Bold') return theme.fontSizes.small
  if (typography === 'Small/XS Normal') return theme.fontSizes.extraSmall
  if (typography === 'Small/XS Bold') return theme.fontSizes.extraSmall
  return theme.fontSizes.body
}

const getLineHeight: TypographyFunc = (theme, typography) => {
  if (!typography) return theme.lineHeights.body
  if (typography === 'small') return theme.lineHeights.small
  if (typography === 'large') return theme.lineHeights.large
  if (typography === 'extraLarge') return theme.lineHeights.extraLarge
  if (typography === 'label') return theme.lineHeights.extraSmall
  if (typography === 'labelHeading') return theme.lineHeights.small
  if (typography === 'Heading/H1') return theme.lineHeights.headingOne
  if (typography === 'Heading/H2') return theme.lineHeights.headingTwo
  if (typography === 'Heading/H3') return theme.lineHeights.headingThree
  if (typography === 'Heading/H4') return theme.lineHeights.headingFour
  if (typography === 'Large/XL Normal') return theme.lineHeights.extraLarge
  if (typography === 'Large/XL Bold') return theme.lineHeights.extraLarge
  if (typography === 'Large/Normal') return theme.lineHeights.large
  if (typography === 'Large/Bold') return theme.lineHeights.large
  if (typography === 'Body/Normal') return theme.lineHeights.body
  if (typography === 'Body/Bold') return theme.lineHeights.body
  if (typography === 'Small/Normal') return theme.lineHeights.small
  if (typography === 'Small/Bold') return theme.lineHeights.small
  if (typography === 'Small/XS Normal') return theme.lineHeights.extraSmall
  if (typography === 'Small/XS Bold') return theme.lineHeights.extraSmall
  return '1rem'
}

const getFontWeight: TypographyFunc = (theme, typography) => {
  if (!typography) return theme.fontWeights.normal
  if (typography === 'small') return theme.fontWeights.normal
  if (typography === 'large') return theme.fontWeights.normal
  if (typography === 'extraLarge') return theme.fontWeights.normal
  if (typography === 'label') return theme.fontWeights.normal
  if (typography === 'labelHeading') return theme.fontWeights.normal
  if (typography === 'Heading/H1') return theme.fontWeights.extraBold
  if (typography === 'Heading/H2') return theme.fontWeights.bold
  if (typography === 'Heading/H3') return theme.fontWeights.bold
  if (typography === 'Heading/H4') return theme.fontWeights.bold
  if (typography === 'Large/XL Normal') return theme.fontWeights.normal
  if (typography === 'Large/XL Bold') return theme.fontWeights.bold
  if (typography === 'Large/Normal') return theme.fontWeights.normal
  if (typography === 'Large/Bold') return theme.fontWeights.bold
  if (typography === 'Body/Normal') return theme.fontWeights.normal
  if (typography === 'Body/Bold') return theme.fontWeights.bold
  if (typography === 'Small/Normal') return theme.fontWeights.normal
  if (typography === 'Small/Bold') return theme.fontWeights.bold
  if (typography === 'Small/XS Normal') return theme.fontWeights.normal
  if (typography === 'Small/XS Bold') return theme.fontWeights.bold
  return '1rem'
}

export const getTypography: TypographyFunc = (theme, typography, field) => {
  if (!typography) return 'initial'
  if (field === 'fontSize') return getFontSize(theme, typography)
  if (field === 'lineHeight') return getLineHeight(theme, typography)
  if (field === 'fontWeight') return getFontWeight(theme, typography)
  return 'initial'
}
