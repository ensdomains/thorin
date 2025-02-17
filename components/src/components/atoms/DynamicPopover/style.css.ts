import { responsiveConditions } from '@/src/css/sprinkles.css'
import { createVar, style } from '@vanilla-extract/css'

export const popoverBoxWidth = createVar()

export const mobileWidth = createVar()

export const container = style({
  'WebkitBackfaceVisibility': 'hidden',
  'MozBackfaceVisibility': 'hidden',
  'backfaceVisibility': 'hidden',
  'width': mobileWidth,
  '@media': {
    [responsiveConditions.xs['@media']]: {
      width: popoverBoxWidth,
    },
  },
})
