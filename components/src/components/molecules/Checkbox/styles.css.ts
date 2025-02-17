import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'
import { translateY } from '@/src/css/utils/common'

export const checkbox = style({})

export const icon = style({})

globalStyle(`${checkbox}:disabled:checked ~ ${icon}`, {
  stroke: `${modeVars.color.greyPrimary} !important`,
})

globalStyle(`${checkbox}:disabled:not(:checked) ~ ${icon}`, {
  stroke: `${modeVars.color.border} !important`,
})

globalStyle(`${checkbox}:not(:checked):not(:hover) ~ ${icon}`, {
  stroke: `${modeVars.color.border} !important`,
})

export const inputBox = style({
  'transform': translateY(0),
  'transition': 'transform 150ms ease-in-out',
  ':hover': {
    transform: translateY(-1),
  },
})
