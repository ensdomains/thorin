import { style } from '@vanilla-extract/css'

import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

const color = {
  grey: atoms({
    backgroundColor: 'backgroundHide',
  }),
  white: atoms({
    backgroundColor: 'white',
  }),
}

export type Color = keyof typeof color

export const input = recipe({
  base: [
    atoms({
      width: '7',
      height: '7',
      marginY: '1',
      cursor: 'pointer',
    }),
    style({
      font: 'inherit',
      borderRadius: vars.space['2'],
      display: 'grid',
      placeContent: 'center',
      transition: 'transform 150ms ease-in-out, filter 150ms ease-in-out',
      selectors: {
        '&:hover': {
          transform: 'translateY(-1px)',
          filter: 'brightness(1.05)',
        },
        '&:active': {
          transform: 'translateY(0px)',
          filter: 'brightness(1)',
        },
        '&::before': {
          content: '',
          backgroundColor: vars.colors.accent,
          maskImage: `url('data:image/svg+xml; utf8, <svg width="${vars.space['4']}" height="${vars.space['4']}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`,
          width: vars.space['4'],
          height: vars.space['4'],
          transform: 'scale(0)',
          transition: 'transform 90ms ease-in-out',
        },
        '&:checked::before': {
          transform: 'scale(1)',
        },
      },
    }),
  ],
  variants: {
    color,
    disabled: {
      true: {},
    },
  },
})
