import { P, match } from 'ts-pattern'

import type { Color, Hue } from '@/src/tokens/color'
import { validatePrimaryColor } from '@/src/tokens/color'

type Shade = 'Primary' | 'Secondary'

type ColorStyle = Hue | `${Hue}${Shade}`

export type WithColorStyle = { colorStyle?: ColorStyle }

type Properties = {
  background: string
  content: string
}

type Property = keyof Properties

const getPrimaryColor = (color: Hue, property: Property): Color =>
  match(property)
    .with('background', () => `${color}Primary` as const)
    .with('content', () => 'textAccent' as const)
    .exhaustive()

const getSecondaryColor = (color: Hue, property: Property): Color =>
  match(property)
    .with(P.union('background'), () => `${color}Surface` as const)
    .with('content', () => `${color}Primary` as const)
    .exhaustive()

export const getValueForColorStyle = (
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
    .otherwise(([color]) =>
      getPrimaryColor(validatePrimaryColor(color), property),
    )
}
