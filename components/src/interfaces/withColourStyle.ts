import { P, match } from 'ts-pattern'

import type { Color, Hue } from '../tokens/color'
import { validatePrimaryColor } from '../tokens/color'

type Shade = 'Primary' | 'Secondary'

type ColourStyle =
  | Hue
  | `${Hue}${Shade}`
  | 'background'
  | 'disabled'

export type WithColourStyle = { colourStyle: ColourStyle }

type Properties = {
  background: Color
  content: Color
  hover: Color
  border: Color
}

type Property = keyof Properties

const getPrimaryColor = (colour: Hue, property: Property): Color =>
  match(property)
    .with(P.union('background', 'border'), () => `${colour}Primary` as const)
    .with('content', () => 'textAccent' as const)
    .with('hover', () => `${colour}Bright` as const)
    .exhaustive()

const getSecondaryColor = (colour: Hue, property: Property): Color =>
  match(property)
    .with(P.union('background', 'border'), () => `${colour}Surface` as const)
    .with('content', () => `${colour}Dim` as const)
    .with('hover', () => `${colour}Light` as const)
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

export const getValueForColourStyle = (
  colourStyle: ColourStyle,
  property: Property,
): Color => {
  const matches = colourStyle.match('^(.*)(Primary|Secondary)$')
  const colour = matches?.[1] || 'accent'
  const style = matches?.[2]
  return match([colour, style])
    .with([P._, 'Secondary'], ([colour]) =>
      getSecondaryColor(validatePrimaryColor(colour), property),
    )
    .with(['background', P._], () => getBackgroundColor(property))
    .with(['disabled', P._], () => getDisabledColor(property))
    .otherwise(([colour]) =>
      getPrimaryColor(validatePrimaryColor(colour), property),
    )
}
