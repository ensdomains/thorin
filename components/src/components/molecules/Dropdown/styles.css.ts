import { createVar, style } from '@vanilla-extract/css'

import { commonVars } from '@/src/css/theme.css'
import { recipe } from '@vanilla-extract/recipes'
import { brightness } from '@/src/css/utils/common'

export const menu = recipe({
  base: {
    transition: 'all .35s cubic-bezier(1, 0, 0.22, 1.6)',
  },
  variants: {
    transform: {
      enteringOrEntered: {
        transform: 'translateY(0)',
      },
      upShort: {
        transform: `translateY(${commonVars.space['2.5']})`,
      },
      downShort: {
        transform: `translateY(calc(-1 * ${commonVars.space['2.5']}))`,
      },
      upLong: {
        transform: `translateY(${commonVars.space['12']})`,
      },
      downLong: {
        transform: `translateY(calc(-1 * ${commonVars.space['12']}))`,
      },
    },
  },
})

export const menuButton = style({
  'fontSize': '100%',
  'filter': brightness(1),
  'transitionProperty': 'color, transform, filter',
  ':active': {
    filter: brightness(0.9),
  },
})

export const actionSheetItem = style({
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

export const menuButtonIndicator = style({
  transform: 'translateY(-50%)',
})

export const chevronTransform = createVar()

export const chevron = style({
  transform: chevronTransform,
})
