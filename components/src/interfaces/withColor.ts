import {
  ADDITIONAL_COLORS,
  AdditionalColour,
  BASE_COLOURS,
  BaseColour,
  SHADED_COLORS,
  ShadedColor,
} from '@/src/tokens/color3'

export type Color = BaseColour | ShadedColor | AdditionalColour

export type WithColor = { color?: Color }

const COLORS = [...BASE_COLOURS, ...SHADED_COLORS, ...ADDITIONAL_COLORS]

export const validateColor = (color: unknown, fallback = 'unset') => {
  if (!color) return fallback
  if (COLORS.includes(color as Color)) return `$${color}`
  return fallback
}
