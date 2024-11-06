import { translateY } from '@/src/css/utils/common'
import { createVar, style } from '@vanilla-extract/css'

export const svg = style({
  width: '100%',
  height: '100%',
})

export const containerBoxHasAction = createVar()

export const containerBox = style({
  'transform': translateY(0),
  ':hover': {
    transform: containerBoxHasAction,
  },
})
