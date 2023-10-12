import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { scale } from '@/src/css/utils/common'

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
