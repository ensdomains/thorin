import { createVar, globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'
import { translateY } from '@/src/css/utils/common'

export const input = style({})

export const label = style({})

export const circle = style({})

export const circleHover = style({})

globalStyle(`${input}:not(:disabled) ~ ${label}:hover ${circle}`, {
  opacity: 0,
})

globalStyle(`${input}:not(:checked) ~ ${label}`, {
  borderColor: modeVars.color.border,
  backgroundColor: modeVars.color.backgroundPrimary,
})

globalStyle(`${input}:not(:checked) ~ ${label} ${circle}`, {
  backgroundColor: modeVars.color.backgroundPrimary,
  color: modeVars.color.backgroundPrimary,
  borderColor: modeVars.color.border,
})

globalStyle(`${input}:not(:checked) ~ ${label} ${circleHover}`, {
  backgroundColor: modeVars.color.border,
  color: modeVars.color.textAccent,
  borderColor: modeVars.color.border,
})

globalStyle(`${input}:disabled:not(:checked) ~ ${label}`, {
  borderColor: modeVars.color.border,
  backgroundColor: modeVars.color.greySurface,
  color: modeVars.color.greyPrimary,
})

globalStyle(`${input}:disabled:not(:checked) ~ ${label} ${circle}`, {
  backgroundColor: modeVars.color.greySurface,
  color: modeVars.color.greySurface,
  borderColor: modeVars.color.border,
})

globalStyle(`${input}:disabled:checked ~ ${label}`, {
  borderColor: 'transparent',
  backgroundColor: modeVars.color.greySurface,
  color: modeVars.color.greyPrimary,
})

globalStyle(`${input}:disabled:checked ~ ${label} ${circle}`, {
  backgroundColor: modeVars.color.border,
  color: modeVars.color.greyPrimary,
  borderColor: 'transparent',
})

export const isContainerBoxDisabled = createVar()

export const containerBox = style({
  'transform': translateY(0),
  ':hover': {
    transform: isContainerBoxDisabled,
  },
})
