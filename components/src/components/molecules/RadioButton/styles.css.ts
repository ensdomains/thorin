import { style } from '@vanilla-extract/css'

import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

export const input = recipe({
  base: [
    atoms({
      width: '6',
      height: '6',
      marginY: '2',
      cursor: 'pointer',
    }),
    style({
      font: 'inherit',
      backgroundColor: vars.colors.backgroundHide,
      borderRadius: '50%',
      display: 'grid',
      placeContent: 'center',
      transition: 'transform 150ms ease-in-out, filter 150ms ease-in-out',
      selectors: {
        '&:hover': {
          transform: 'translateY(-1px)',
          filter: 'contrast(0.7)',
        },
        '&:active': {
          transform: 'translateY(0px)',
          filter: 'contrast(1)',
        },
        '&::before': {
          content: '',
          width: vars.space['4.5'],
          height: vars.space['4.5'],
          borderRadius: '50%',
          transform: 'scale(0)',
          transition: 'transform 90ms ease-in-out',
          backgroundImage: vars.colors.accentGradient,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        },
        '&:checked::before': {
          transform: 'scale(1)',
        },
      },
    }),
  ],
  variants: {
    disabled: {
      true: {},
    },
  },
})
