import { translateY } from '@/src/css/utils/common'
import { createVar, style } from '@vanilla-extract/css'

export const counterIconBoxTransform = createVar()

export const counterIconBox = style({
  transform: counterIconBoxTransform,
})

export const hasShadow = createVar()

export const buttonBox = style({
  'boxShadow': hasShadow,
  'transform': translateY(0),
  ':hover': {
    transform: translateY(-1),
  },
  ':active': {
    transform: translateY(-1),
  },
  ':disabled': {
    transform: translateY(0),
  },
})
