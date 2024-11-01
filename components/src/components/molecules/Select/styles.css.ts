import { style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'

export const input = style({
  selectors: {
    '&::placeholder': {
      color: modeVars.color.greyPrimary,
    },
  },
})

export const rootInput = style({
  appearance: 'none',
})
