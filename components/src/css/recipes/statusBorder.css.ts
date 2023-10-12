import { recipe } from '@vanilla-extract/recipes'

import { modeVars } from '../theme.css'

export const statusBorder = recipe({
  base: {
    borderColor: modeVars.color.border,
    selectors: {
      '&:not(:disabled):focus-within': {
        borderColor: modeVars.color.accentBright,
      },
    },
  },
  variants: {
    readonly: {
      true: {
        cursor: 'default',
        selectors: {
          '&:not(:disabled):focus-within': {
            borderColor: modeVars.color.border,
          },
        },
      },
    },
    error: {
      true: {
        borderColor: modeVars.color.redPrimary,
        selectors: {
          '&:not(:disabled):focus-within': {
            borderColor: modeVars.color.redPrimary,
          },
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        borderColor: modeVars.color.border,
        backgroundColor: modeVars.color.greyLight,
        selectors: {
          '&:not(:disabled):focus-within': {
            borderColor: modeVars.color.border,
          },
        },
      },
    },
  },
})
