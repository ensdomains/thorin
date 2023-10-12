import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'

export const checkbox = style({})

export const icon = style({})

globalStyle(`${checkbox}:disabled:checked ~ ${icon}`, {
  backgroundColor: `${modeVars.color.greyPrimary} !important`,
})

globalStyle(`${checkbox}:disabled:not(:checked) ~ ${icon}`, {
  backgroundColor: `${modeVars.color.border} !important`,
})

globalStyle(`${checkbox}:not(:checked):not(:hover) ~ ${icon}`, {
  backgroundColor: `${modeVars.color.border} !important`,
})

globalStyle(`${checkbox}:not(:checked):hover ~ ${icon}`, {
  backgroundColor: `${modeVars.color.backgroundPrimary} !important`,
})
