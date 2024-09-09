import { P, match } from 'ts-pattern'

import type { Hue } from '@/src/tokens/color'
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
  background: string
  content: string
  hover: string
  border: string
}

type Property = keyof Properties

const getPrimaryColor = (color: Hue, property: Property): string =>
  match(property)
    .with(P.union('background', 'border'), () => `$${color}Primary`)
    .with('content', () => '$textAccent')
    .with('hover', () => `$${color}Bright`)
    .exhaustive()

const getSecondaryColor = (color: Hue, property: Property): string =>
  match(property)
    .with(P.union('background', 'border'), () => `$${color}Surface`)
    .with('content', () => `$${color}Dim`)
    .with('hover', () => `$${color}Light`)
    .exhaustive()

const getBackgroundColor = (property: Property): string =>
  match(property)
    .with('background', () => '$backgroundPrimary')
    .with('content', () => '$textSecondary')
    .with('border', () => '$border')
    .with('hover', () => '$greySurface')
    .exhaustive()

const getDisabledColor = (property: Property): string =>
  match(property)
    .with('background', () => '$greyLight')
    .with('content', () => '$textDisabled')
    .with('border', () => '$greyLight')
    .with('hover', () => '$greyLight')
    .exhaustive()

const getTransparentColor = (property: Property): string =>
  match(property)
    .with('background', () => 'transparent')
    .with('content', () => '$textPrimary')
    .with('border', () => 'transparent')
    .with('hover', () => '$greyLight')
    .exhaustive()

export const getValueForColourStyle = (
  colorStyle: ColorStyle,
  property: Property,
): string => {
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
