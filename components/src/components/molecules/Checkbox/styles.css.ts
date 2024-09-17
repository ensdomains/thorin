import { globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'
import { translateY } from '@/src/css/utils/common'

export const checkbox = style({})

export const icon = style({
  maskImage: `url('data:image/svg+xml; utf8, <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`,
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
})

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

globalStyle(`${checkbox}:disabled:not(:checked):hover ~ ${icon}`, {
  backgroundColor: `${modeVars.color.border} !important`,
})

export const inputBox = style({
  'transform': translateY(0),
  'transition': 'transform 150ms ease-in-out',
  ':hover': {
    transform: translateY(-1),
  },
})
