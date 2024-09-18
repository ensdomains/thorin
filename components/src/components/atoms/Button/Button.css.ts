import { createVar, style } from '@vanilla-extract/css'

export const counterIconBoxTransform = createVar()

export const counterIconBox = style({
  transform: counterIconBoxTransform,
})
