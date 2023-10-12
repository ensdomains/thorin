import { P, match } from 'ts-pattern'

import { BaseColour, validateBaseColour } from '@/src/tokens/color3'

type Shade = 'Primary' | 'Secondary'

type ColorStyle = BaseColour | `${BaseColour}${Shade}`

export type WithColorStyle = { colorStyle?: ColorStyle }

type Properties = {
  background: string
  content: string
  hover: string
}

type Property = keyof Properties

const getPrimaryColor = (color: BaseColour, property: Property): string =>
  match(property)
    .with('background', () => `$${color}Primary`)
    .with('content', () => '$textAccent')
    .with('hover', () => `$${color}Bright`)
    .exhaustive()

const getSecondaryColor = (color: BaseColour, property: Property): string =>
  match(property)
    .with('background', () => `$${color}Surface`)
    .with('content', () => `$${color}Primary`)
    .with('hover', () => `$${color}Light`)
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
      getSecondaryColor(validateBaseColour(color), property),
    )
    .otherwise(([color]) =>
      getPrimaryColor(validateBaseColour(color), property),
    )
}
