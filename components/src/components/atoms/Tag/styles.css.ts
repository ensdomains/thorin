import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const variants = recipe({
  base: {
    background: 'red',
  },
  variants: {
    size: {
      small: style({
        height: '1rem',
      }),
      medium: style({
        height: '2rem',
      }),
    },
  },
})
