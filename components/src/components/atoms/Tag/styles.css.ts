import { translateY } from '@/src/css/utils/common'
import { createVar, style } from '@vanilla-extract/css'

export const tagHover = createVar()

export const tag = style({
  'transitionProperty': 'color, border-color, background-color, transform',
  'transform': translateY(0),
  ':hover': {
    transform: tagHover,
  },
  ':active': {
    transform: translateY(-1),
  },
})
