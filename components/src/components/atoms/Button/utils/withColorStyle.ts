import { P, match } from 'ts-pattern'

import type { Color, Hue } from '@/src/tokens/color'
import { validatePrimaryColor } from '@/src/tokens/color'

type Shade = 'Primary' | 'Secondary'

export type ColorStyle =
  | Hue
  | `${Hue}${Shade}`
  | 'background'
  | 'disabled'
  | 'transparent'

export type WithColorStyle = { colorStyle?: ColorStyle }

type Properties = {
  background: Color
  content: Color
  hover: Color
  border: Color
}

type Property = keyof Properties

const getPrimaryColor = (color: Hue, property: Property): Color =>
  match(property)
    .with(P.union('background', 'border'), () => `${color}Primary` as Color)
    .with('content', () => 'textAccent' as const)
    .with('hover', () => `${color}Bright` as Color)
    .exhaustive()

const getSecondaryColor = (color: Hue, property: Property): Color =>
  match(property)
    .with(P.union('background', 'border'), () => `${color}Surface` as Color)
    .with('content', () => `${color}Dim` as Color)
    .with('hover', () => `${color}Light` as Color)
    .exhaustive()

const getBackgroundColor = (property: Property): Color =>
  match(property)
    .with('background', () => 'backgroundPrimary' as const)
    .with('content', () => 'textSecondary' as const)
    .with('border', () => 'border' as const)
    .with('hover', () => 'greySurface' as const)
    .exhaustive()

const getDisabledColor = (property: Property): Color =>
  match(property)
    .with('background', () => 'greyLight' as const)
    .with('content', () => 'textDisabled' as const)
    .with('border', () => 'greyLight' as const)
    .with('hover', () => 'greyLight' as const)
    .exhaustive()

const getTransparentColor = (property: Property): Color =>
  match(property)
    .with('background', () => 'transparent' as Color)
    .with('content', () => 'textPrimary' as const)
    .with('border', () => 'transparent' as Color)
    .with('hover', () => 'greyLight' as const)
    .exhaustive()

export const getValueForColourStyle = (
  colorStyle: ColorStyle,
  property: Property,
): Color => {
  const matches = colorStyle.match('^(.*?)(Primary|Secondary)?$')
  const color = matches?.[1] || 'accent'
  const style = matches?.[2]
  return match([color, style])
    .with([P._, 'Secondary'], ([color]) =>
      getSecondaryColor(validatePrimaryColor(color), property),
    )
    .with(['background', P._], () => getBackgroundColor(property))
    .with(['disabled', P._], () => getDisabledColor(property))
    .with(['transparent', P._], () => getTransparentColor(property))
    .otherwise(([color]) =>
      getPrimaryColor(validatePrimaryColor(color), property),
    )
}
