import { style } from '@vanilla-extract/css'

import { commonVars } from '@/src/css/theme.css'

export const actionSheeItem = style({
  selectors: {
    '&:first-child': {
      borderTopLeftRadius: commonVars.radii.large,
      borderTopRightRadius: commonVars.radii.large,
    },
    '&:last-child': {
      borderBottomLeftRadius: commonVars.radii.large,
      borderBottomRightRadius: commonVars.radii.large,
    },
  },
})
