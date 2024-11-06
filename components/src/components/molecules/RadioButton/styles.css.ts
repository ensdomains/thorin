import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'
import { brightness, translateY } from '@/src/css/utils/common'

export const radio = style({})

export const mark = style({
  translate: '-50% -50%',
})

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

export const input = style({
  'filter': brightness(1),
  'transform': translateY(0),
  ':hover': {
    filter: brightness(1.05),
    transform: translateY(-1),
  },
  ':disabled': {
    filter: brightness(1),
    transform: translateY(0),
  },
})
