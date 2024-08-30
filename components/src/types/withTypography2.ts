import type {
  FontSize,
  FontWeight,
  fontWeights } from '../tokens/typography'
import {
  fontSizes,
} from '../tokens/typography'

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
  size: `$${FontSize}`
  lineHeight: `$${FontSize}`
  weight: `$${FontWeight}`
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
    size: '$extraSmall',
    lineHeight: '$extraSmall',
    weight: '$normal',
  },
  labelHeading: {
    size: '$small',
    lineHeight: '$small',
    weight: '$normal',
  },
} as { [key in Legacy]: FontDetail }

const makeFonts = () => {
  return Object.fromEntries(
    fonts.map((font) => {
      const fontWeight = fontOverides[font]?.weight || 'normal'
      return [
        font,
        {
          size: `$${font}`,
          lineHeight: `$${font}`,
          weight: `$${fontWeight}`,
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
        size: `$${font}`,
        lineHeight: `$${font}`,
        weight: '$bold',
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

export const getValueForFontVariant = (
  fontVariant: FontVariant,
  property: keyof FontDetail,
) => {
  return fontDetails[fontVariant]?.[property]
}

export type WithTypography = {
  fontVariant?: FontVariant
}
