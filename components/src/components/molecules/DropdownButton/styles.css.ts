import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms } from '../../../css'

export const chevron = recipe({
  base: [
    atoms({
      marginLeft: '1',
      width: '3',
      marginRight: '0.5',
      transitionDuration: '200',
      transitionProperty: 'all',
      transitionTimingFunction: 'inOut',
    }),
    style({
      opacity: '0.3',
      transform: 'rotate(0deg)',
    }),
  ],
  variants: {
    open: {
      true: style([
        style({
          opacity: '1',
          transform: 'rotate(180deg)',
        }),
      ]),
    },
  },
})
