import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'
import { translateY } from '@/src/css/utils/common'

export const radio = style({})

export const mark = style({})

globalStyle(`${radio}:not(:checked) ~ ${mark}`, {
  opacity: 0,
  scale: 0.3,
})

globalStyle(`${radio}:not(:checked):hover ~ ${mark}`, {
  backgroundColor: modeVars.color.greyPrimary,
})

globalStyle(`${radio}:checked:hover ~ ${mark}`, {
  transform: translateY(-1),
})

globalStyle(`${radio}:checked:disabled ~ ${mark}`, {
  backgroundColor: modeVars.color.greyPrimary,
  transform: translateY(0),
})
