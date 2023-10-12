import { P, match } from 'ts-pattern'

import { BaseColour, Colour, validateBaseColour } from '../tokens/color3'

type Shade = 'Primary' | 'Secondary'

type ColourStyle =
  | BaseColour
  | `${BaseColour}${Shade}`
  | 'background'
  | 'disabled'

export type WithColourStyle = { colourStyle: ColourStyle }

type Properties = {
  background: Colour
  content: Colour
  hover: Colour
  border: Colour
}

type Property = keyof Properties

const getPrimaryColor = (colour: BaseColour, property: Property): Colour =>
  match(property)
    .with(P.union('background', 'border'), () => `${colour}Primary` as const)
    .with('content', () => 'textAccent' as const)
    .with('hover', () => `${colour}Bright` as const)
    .exhaustive()

const getSecondaryColor = (colour: BaseColour, property: Property): Colour =>
  match(property)
    .with(P.union('background', 'border'), () => `${colour}Surface` as const)
    .with('content', () => `${colour}Dim` as const)
    .with('hover', () => `${colour}Light` as const)
    .exhaustive()

const getBackgroundColor = (property: Property): Colour =>
  match(property)
    .with('background', () => 'backgroundPrimary' as const)
    .with('content', () => 'textSecondary' as const)
    .with('border', () => 'border' as const)
    .with('hover', () => 'greySurface' as const)
    .exhaustive()

const getDisabledColor = (property: Property): Colour =>
  match(property)
    .with('background', () => 'greyLight' as const)
    .with('content', () => 'textDisabled' as const)
    .with('border', () => 'greyLight' as const)
    .with('hover', () => 'greyLight' as const)
    .exhaustive()

export const getValueForColourStyle = (
  colourStyle: ColourStyle,
  property: Property,
): Colour => {
  const matches = colourStyle.match('^(.*)(Primary|Secondary)$')
  const colour = matches?.[1] || 'accent'
  const style = matches?.[2]
  return match([colour, style])
    .with([P._, 'Secondary'], ([colour]) =>
      getSecondaryColor(validateBaseColour(colour), property),
    )
    .with(['background', P._], () => getBackgroundColor(property))
    .with(['disabled', P._], () => getDisabledColor(property))
    .otherwise(([colour]) =>
      getPrimaryColor(validateBaseColour(colour), property),
    )
}
