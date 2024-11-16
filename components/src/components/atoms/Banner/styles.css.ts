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

export const svgBoxTransform = createVar()

export const svgBox = style({
  transform: svgBoxTransform,
})

export const actionButtonIconBoxHasAction = createVar()

export const actionButtonIconBox = style({
  'transform': translateY(0),
  ':hover': {
    transform: actionButtonIconBoxHasAction,
  },
})
