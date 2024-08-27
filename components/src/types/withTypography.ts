import { fontSizes, fontWeights, lineHeights } from '../tokens/typography'

type Legacy = 'label' | 'labelHeading'

type FontSizes = keyof typeof fontSizes

type BoldFontSizes = keyof Omit<
  typeof fontSizes,
  'headingOne' | 'headingTwo' | 'headingThree' | 'headingFour'
>

const fonts = Object.keys(fontSizes) as FontSizes[]

const fontOverides: {
  [key in FontSizes]?: {
    weight?: keyof typeof fontWeights
  }
} = {
  headingOne: {
    weight: 'extraBold',
  },
  headingTwo: {
    weight: 'bold',
  },
  headingThree: {
    weight: 'bold',
  },
  headingFour: {
    weight: 'bold',
  },
}

type FontDetail = {
  size: string
  lineHeight: string
  weight: string
}

const boldFontSizes = [
  'extraLarge',
  'large',
  'body',
  'small',
  'extraSmall',
] as BoldFontSizes[]

const legacy = {
  label: {
    size: fontSizes.extraSmall,
    lineHeight: lineHeights.extraSmall,
    weight: fontWeights.normal,
  },
  labelHeading: {
    size: fontSizes.small,
    lineHeight: lineHeights.small,
    weight: fontWeights.normal,
  },
} as { [key in Legacy]: FontDetail }

const makeFonts = () => {
  return Object.fromEntries(
    fonts.map((font) => {
      const fontWeight = fontOverides[font]?.weight || 'normal'
      return [
        font,
        {
          size: fontSizes[font],
          lineHeight: lineHeights[font],
          weight: fontWeights[fontWeight],
        },
      ]
    }),
  ) as { [key in FontSizes]: FontDetail }
}

const makeBoldFonts = () => {
  return Object.fromEntries(
    boldFontSizes.map(font => [
      `${font}Bold`,
      {
        size: fontSizes[font],
        lineHeight: lineHeights[font],
        weight: fontWeights.bold,
      },
    ]),
  ) as {
    [key in `${BoldFontSizes}Bold`]: FontDetail
  }
}

const makeFontDetails = () => {
  return {
    ...legacy,
    ...makeFonts(),
    ...makeBoldFonts(),
  }
}

const fontDetails = makeFontDetails()

export type FontVariant = keyof typeof fontDetails

export const getFontSize = (fontVariant: FontVariant) => {
  return fontDetails[fontVariant]?.size
}

export const getLineHeight = (fontVariant: FontVariant) => {
  return fontDetails[fontVariant]?.lineHeight
}

export const getFontWeight = (fontVariant: FontVariant) => {
  return fontDetails[fontVariant]?.weight
}

export type WithTypography = {
  fontVariant?: FontVariant
}
