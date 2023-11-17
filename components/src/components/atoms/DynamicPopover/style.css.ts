import { ComplexStyleRule, style } from '@vanilla-extract/css'

export const container = style({
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
} as ComplexStyleRule)
