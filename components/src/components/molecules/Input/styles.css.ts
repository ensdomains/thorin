import { recipe } from '@vanilla-extract/recipes'

import { globalStyle, style } from '@vanilla-extract/css'

import { commonVars, modeVars } from '@/src/css/theme.css'
import { scale } from '@/src/css/utils/common'
import { sprinkles } from '@/src/css/sprinkles.css'

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

export const container = recipe({
  base: {
    transitionProperty: 'color, border-color, background-color',
  },
  variants: {
    size: {
      small: sprinkles({ height: '10' }),
      medium: sprinkles({ height: '12' }),
      large: sprinkles({ height: '16' }),
      extraLarge: sprinkles({ height: '20' }),
    },
  },
})

export const labelVariants = recipe({
  variants: {
    size: {
      small: sprinkles({ fontSize: 'small', lineHeight: 'small', px: '3.5' }),
      medium: sprinkles({ fontSize: 'body', lineHeight: 'body', px: '4' }),
      large: sprinkles({ fontSize: 'large', lineHeight: 'large', px: '4' }),
      extraLarge: sprinkles({ fontSize: 'headingThree', lineHeight: 'headingThree', px: '6' }),
    },
  },
})
export const label = style({})

globalStyle(`${label} svg`, {
  display: 'block',
  color: modeVars.color.greyPrimary,
})

export const iconVariants = recipe({
  base: {
    order: -1,
  },
  variants: {
    size: {
      small: sprinkles({ flexBasis: '3', paddingLeft: '3.5', width: '3' }),
      medium: sprinkles({ flexBasis: '4', paddingLeft: '4', width: '4' }),
      large: sprinkles({ flexBasis: '5', paddingLeft: '5', width: '5' }),
      extraLarge: sprinkles({ flexBasis: '6', paddingLeft: '6', width: '6' }),
    },
  },
})

export const icon = style({})

globalStyle(`${icon} svg`, {
  width: commonVars.space.full,
  height: commonVars.space.full,
  color: modeVars.color.greyPrimary,
})
