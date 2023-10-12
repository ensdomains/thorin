import { BaseColour, validateBaseColour } from '@/src/tokens/color3'

export type Color = BaseColour

export type WithColor = { color: Color }

export const getValidatedColor = (color: Color = 'accent'): string => {
  const matches = color.match('^(.*?)(Primary|Secondary)?$')
  const baseColor = matches?.[1] || 'accent'
  const validatedColor = validateBaseColour(baseColor, 'accent')
  return `$${validatedColor}Primary`
}
