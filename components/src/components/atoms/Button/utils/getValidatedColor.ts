import type { Hue } from '@/src/tokens/color'
import { validatePrimaryColor } from '@/src/tokens/color'

export type Color = Hue

export type WithColor = { color: Color }

export const getValidatedColor = (
  color?: Color,
  fallback = 'textPrimary',
): string => {
  if (!color) return fallback
  const matches = color.match('^(.*?)(Primary|Secondary)?$')
  const baseColor = matches?.[1] || 'accent'
  const validatedColor = validatePrimaryColor(baseColor, 'accent')
  return `$${validatedColor}Primary`
}
