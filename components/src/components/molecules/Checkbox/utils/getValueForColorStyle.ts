import { P, match } from 'ts-pattern'

import type { Hue } from '@/src/tokens/color'
import { validatePrimaryColor } from '@/src/tokens/color'

type Shade = 'Primary' | 'Secondary'

type ColorStyle = Hue | `${Hue}${Shade}`

export type WithColorStyle = { colorStyle?: ColorStyle }

type Properties = {
  background: string
  content: string
}

type Property = keyof Properties

const getPrimaryColor = (color: Hue, property: Property): string =>
  match(property)
    .with('background', () => `$${color}Primary`)
    .with('content', () => '$textAccent')
    .exhaustive()

const getSecondaryColor = (color: Hue, property: Property): string =>
  match(property)
    .with(P.union('background'), () => `$${color}Surface`)
    .with('content', () => `$${color}Primary`)
    .exhaustive()

export const getValueForColorStyle = (
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
    .otherwise(([color]) =>
      getPrimaryColor(validatePrimaryColor(color), property),
    )
}
