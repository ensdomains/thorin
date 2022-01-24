import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

export const variants = recipe({
  base: [
    atoms({
      background: 'groupBackground',
      padding: '1.5',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'medium',
      boxShadow: '0.02',
      boxShadowColor: 'foregroundSecondary',
      position: 'absolute',
    }),
    style({
      transition: 'all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear',
      borderRadius: vars.radii['2xLarge'],
    }),
  ],
  variants: {
    opened: {
      true: style([
        atoms({
          visibility: 'visible',
          marginTop: '1.5',
          opacity: '100',
        }),
      ]),
      false: style([
        atoms({
          visibility: 'hidden',
          marginTop: '-12',
          opacity: '0',
        }),
      ]),
    },
  },
})

export const menuButton = style([
  atoms({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '4',
    width: 'full',
    height: '12',
    padding: '3',
    justifyContent: 'flex-start',
    transitionDuration: '150',
    transitionProperty: 'all',
    transitionTimingFunction: 'inOut',
  }),
  style({
    letterSpacing: '-0.01em',
    selectors: {
      '&:hover': {
        transform: 'translateY(-1px)',
        filter: 'brightness(1.05)',
      },
      '&:active': {
        transform: 'translateY(0px)',
        filter: 'brightness(1)',
      },
      '&:disabled': {
        color: vars.colors.textTertiary,
      },
    },
  }),
])
