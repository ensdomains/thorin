import {
  ADDITIONAL_COLORS,
  AdditionalColor,
  PALETTE_COLORS,
  PRIMARY_COLORS,
  PaletteColor,
  PrimaryColor,
} from '@/src/tokens/color3'

export type Color = PrimaryColor | PaletteColor | AdditionalColor

export type WithColor = { color: Color }

const COLORS = [...PRIMARY_COLORS, ...PALETTE_COLORS, ...ADDITIONAL_COLORS]

export const validateColor = (color: unknown, fallback = 'unset') => {
  if (!color) return fallback
  if (COLORS.includes(color as Color)) return `$${color}`
  return fallback
}
