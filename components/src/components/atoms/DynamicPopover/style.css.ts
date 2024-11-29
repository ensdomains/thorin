import { responsiveConditions } from '@/src/css/sprinkles.css'
import type { ComplexStyleRule } from '@vanilla-extract/css'
import { createVar, style } from '@vanilla-extract/css'

export const popoverBoxWidth = createVar()

export const mobileWidth = createVar()

export const container = style({
  'WebkitBackfaceVisibility': 'hidden',
  'MozBackfaceVisibility': 'hidden',
  'backfaceVisibility': 'hidden',
  '@media': {
    [responsiveConditions.sm['@media']]: {
      width: popoverBoxWidth,
    },
    [responsiveConditions.xs['@media']]: {
      width: mobileWidth,
    },
  },
} as ComplexStyleRule)
