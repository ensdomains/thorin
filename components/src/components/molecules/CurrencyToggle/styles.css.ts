import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'

export const labelEth = style({
  transform: 'translate(-100%, -50%)',
})

export const labelFiat = style({
  transform: 'translate(0%, -50%)',
})

export const checkbox = style({})

export const slider = style({
  transition: 'transform 0.3s ease-in-out, background-color 0.1s ease-in-out',
  transform: 'translate(-50%, -50%)',
})

globalStyle(`${checkbox}:not(:checked) ~ ${slider}`, {
  transform: 'translate(-100%, -50%)',
})

globalStyle(`${checkbox}:checked ~ ${slider}`, {
  transform: 'translate(0%, -50%)',
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
