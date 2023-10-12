import { style } from '@vanilla-extract/css'

import { commonVars, modeVars } from '@/src/css/theme.css'
import { brightness } from '@/src/css/utils/common'

export const slider = style({
  appearance: 'none',
  outline: 'none',
  selectors: {
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      width: commonVars.space['4'],
      height: commonVars.space['4'],
      background: modeVars.color.accent,
      borderRadius: commonVars.radii.full,
      cursor: 'pointer',
      transition: 'filter 0.15s ease-in-out',
      filter: brightness(1),
    },
    '&::-webkit-slider-thumb:hover': {
      filter: brightness(1),
    },
    '&::-webkit-slider-thumb:active': {
      filter: brightness(1),
    },
    '&::-moz-range-thumb': {
      appearance: 'none',
      width: commonVars.space['4'],
      height: commonVars.space['4'],
      background: modeVars.color.accent,
      borderRadius: commonVars.radii.full,
      cursor: 'pointer',
      transition: 'filter 0.15s ease-in-out',
      filter: brightness(1),
    },
    '&::-moz-range-thumb:hover': {
      filter: brightness(1),
    },
    '&::-moz-range-thumb:active': {
      filter: brightness(1),
    },
  },
})
