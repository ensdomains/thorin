import type { FontSize } from '@/src/tokens/typography'

type LegacyFont = 'label' | 'labelHeading'

type HeadingFont = Extract<
  FontSize,
  'headingOne' | 'headingTwo' | 'headingThree' | 'headingFour'
>

type VariableFont = Exclude<
  FontSize,
  'headingOne' | 'headingTwo' | 'headingThree' | 'headingFour'
>

export type FontVariant =
  | LegacyFont
  | HeadingFont
  | VariableFont
  | `${VariableFont}Bold`

type Properties = {
  fontSize: string
  lineHeight: string
  fontWeight: string
}

type Property = keyof Properties

const variantMap: { [key in FontVariant]: Properties } = {
  label: {
    fontSize: '$extraSmall',
    lineHeight: '$extraSmall',
    fontWeight: '$normal',
  },
  labelHeading: {
    fontSize: '$small',
    lineHeight: '$small',
    fontWeight: '$normal',
  },
  headingOne: {
    fontSize: '$headingOne',
    lineHeight: '$headingOne',
    fontWeight: '$extraBold',
  },
  headingTwo: {
    fontSize: '$headingTwo',
    lineHeight: '$headingTwo',
    fontWeight: '$bold',
  },
  headingThree: {
    fontSize: '$headingThree',
    lineHeight: '$headingThree',
    fontWeight: '$bold',
  },
  headingFour: {
    fontSize: '$headingFour',
    lineHeight: '$headingFour',
    fontWeight: '$bold',
  },
  extraLargeBold: {
    fontSize: '$extraLarge',
    lineHeight: '$extraLarge',
    fontWeight: '$bold',
  },
  extraLarge: {
    fontSize: '$extraLarge',
    lineHeight: '$extraLarge',
    fontWeight: '$normal',
  },
  largeBold: {
    fontSize: '$large',
    lineHeight: '$large',
    fontWeight: '$bold',
  },
  large: {
    fontSize: '$large',
    lineHeight: '$large',
    fontWeight: '$normal',
  },
  bodyBold: {
    fontSize: '$body',
    lineHeight: '$body',
    fontWeight: '$bold',
  },
  body: {
    fontSize: '$body',
    lineHeight: '$body',
    fontWeight: '$normal',
  },
  smallBold: {
    fontSize: '$small',
    lineHeight: '$small',
    fontWeight: '$bold',
  },
  small: {
    fontSize: '$small',
    lineHeight: '$small',
    fontWeight: '$normal',
  },
  extraSmallBold: {
    fontSize: '$extraSmall',
    lineHeight: '$extraSmall',
    fontWeight: '$bold',
  },
  extraSmall: {
    fontSize: '$extraSmall',
    lineHeight: '$extraSmall',
    fontWeight: '$normal',
  },
}

export const getValueForVariant = <T extends Property>(
  variant: FontVariant,
  property: Property,
): Properties[T] => {
  return variantMap[variant]?.[property] || variantMap.body[property]
}
