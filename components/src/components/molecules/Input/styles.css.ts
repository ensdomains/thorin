import { recipe } from '@vanilla-extract/recipes'

import { globalStyle, style } from '@vanilla-extract/css'

import { commonVars, modeVars } from '@/src/css/theme.css'
import { scale } from '@/src/css/utils/common'

export const label = style({})

export const icon = style({})

export const input = recipe({
  base: {
    selectors: {
      '&::placeholder': {
        color: modeVars.color.greyPrimary,
        fontWeight: 'bold',
      },
    },
  },
  variants: {
    size: {
      small: {
        selectors: {
          '&::placeholder': {
            fontWeight: commonVars.fontWeights.normal,
          },
        },
      },
      medium: {
        selectors: {
          '&::placeholder': {
            fontWeight: commonVars.fontWeights.normal,
          },
        },
      },
      large: {
        selectors: {
          '&::placeholder': {
            fontWeight: commonVars.fontWeights.bold,
          },
        },
      },
      extraLarge: {
        selectors: {
          '&::placeholder': {
            fontWeight: commonVars.fontWeights.bold,
          },
        },
      },
    },
    showAction: {
      true: {},
    },
  },
})

globalStyle(`${label} svg`, {
  display: 'block',
  color: modeVars.color.greyPrimary,
})

globalStyle(`${icon} svg`, {
  width: commonVars.space.full,
  height: commonVars.space.full,
  color: modeVars.color.greyPrimary,
})

globalStyle(`${input({})}:placeholder-shown ~ button`, {
  opacity: 0,
  transform: scale(0.8),
  pointerEvents: 'none',
})

globalStyle(`${input({ showAction: true })}:placeholder-shown ~ button`, {
  opacity: 1,
  transform: scale(1),
  pointerEvents: 'all',
})
