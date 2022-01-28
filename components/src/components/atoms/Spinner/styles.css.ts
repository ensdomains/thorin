import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { keyframes, style } from '@vanilla-extract/css'

import { atoms, motionSafe, vars } from '../../../css'

const rotate = keyframes({
  '100%': { transform: 'rotate(1turn)' },
})

export const variants = recipe({
  base: [
    style({
      stroke: vars.colors.current,
      ...motionSafe({
        animation: `1.1s linear infinite ${rotate}`,
      }),
    }),
  ],
  variants: {
    size: {
      small: atoms({
        height: '6',
        strokeWidth: '1.25',
        width: '6',
      }),
      large: atoms({
        height: '16',
        strokeWidth: '1.25',
        width: '16',
      }),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
