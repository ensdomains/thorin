import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { scale, translateY } from '@/src/css/utils/common'

export const textarea = recipe({
  variants: {
    showAction: {
      true: {},
    },
  },
})

globalStyle(`${textarea({})}:placeholder-shown ~ button`, {
  opacity: 0,
  transform: scale(0.8),
  pointerEvents: 'none',
})

globalStyle(`${textarea({ showAction: true })}:placeholder-shown ~ button`, {
  opacity: 0,
  transform: scale(0.8),
  pointerEvents: 'none',
})

export const container = style({
  transitionProperty: 'color, border-color, background-color',
})

export const actionButton = style({
  'transform': translateY(0),
  ':hover': {
    transform: translateY(-1),
  },
})
