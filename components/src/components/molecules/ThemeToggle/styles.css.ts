import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'

export const labelEth = style({})

export const labelFiat = style({})

export const checkbox = style({})

export const slider = style({})

globalStyle(`${checkbox}:not(:checked) ~ ${slider}`, {
  transform: 'translateX(-50%)',
})

globalStyle(`${checkbox}:checked ~ ${slider}`, {
  transform: 'translateX(50%)',
})

globalStyle(`${checkbox}:disabled ~ ${slider}`, {
  backgroundColor: modeVars.color.greyPrimary,
})

globalStyle(`${checkbox}:checked ~ ${labelEth}`, {
  color: modeVars.color.greyPrimary,
})

globalStyle(`${checkbox}:not(:checked) ~ ${labelFiat}`, {
  color: modeVars.color.greyPrimary,
})
