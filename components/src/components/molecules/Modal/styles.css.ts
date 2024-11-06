import { responsiveConditions } from '@/src/css/sprinkles.css'
import { createVar, style } from '@vanilla-extract/css'

export const transformBase = createVar()

export const transformSm = createVar()

export const translateBase = createVar()

export const translateSm = createVar()

export const container = style({
  'transform': transformBase,
  'translate': translateBase,
  '@media': {
    [responsiveConditions.sm['@media']]: {
      transform: transformSm,
      translate: translateSm,
    },
  },
})
