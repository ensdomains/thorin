import { createVar, style } from '@vanilla-extract/css'

export const trailingSvgBoxTransform = createVar()

export const trailingSVGBox = style({
  transform: trailingSvgBoxTransform,
})

export const containerBox = style({
  'transform': 'translateY(0)',
  ':hover': {
    transform: 'translateY(-1px)',
  },
})
