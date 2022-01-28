import { style } from '@vanilla-extract/css'

import { atoms } from '../../../css'

export const closeButton = style([
  atoms({
    height: '6',
    width: '6',
    marginTop: '-6',
    opacity: '30',
    cursor: 'pointer',
    padding: '1.25',
    transitionProperty: 'all',
    transitionDuration: '150',
    transitionTimingFunction: 'inOut',
  }),
  style({
    selectors: {
      '&:hover': {
        opacity: '.5',
      },
    },
  }),
])
