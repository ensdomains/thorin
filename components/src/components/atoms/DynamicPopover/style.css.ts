import type { ComplexStyleRule } from '@vanilla-extract/css'
import { style } from '@vanilla-extract/css'

export const container = style({
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
} as ComplexStyleRule)
