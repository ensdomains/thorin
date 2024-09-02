import type {
  AdditionalColor,
  PaletteColor,
  Hue } from '@/src/tokens/color'
import {
  ADDITIONAL_COLORS,
  PALETTE_COLORS,
  PRIMARY_COLORS,
} from '@/src/tokens/color'

export type Color = Hue | PaletteColor | AdditionalColor | 'inherit' | 'initial' | 'unset'

export type WithColor = { color?: Color }

const COLORS = [...PRIMARY_COLORS, ...PALETTE_COLORS, ...ADDITIONAL_COLORS, 'inherit', 'initial', 'unset'] as const

export const validateColor = (color: unknown, fallback = 'unset') => {
  if (!color) return fallback
  if (COLORS.includes(color as Color)) return `$${color}`
  return fallback
}
