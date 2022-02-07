import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { atoms, vars } from '../../../css'

export const variants = recipe({
  base: [
    style({
      stroke: vars.colors.accent,
    }),
  ],
  variants: {
    size: {
      small: atoms({
        height: '16',
        strokeWidth: '1',
        width: '16',
      }),
      large: atoms({
        height: '24',
        strokeWidth: '1',
        width: '24',
      }),
    },
    disabled: {
      true: style({
        stroke: vars.colors.foregroundSecondary,
      }),
    },
  },
})

export const numberBox = recipe({
  base: [
    atoms({
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: 'accent',
    }),
  ],
  variants: {
    size: {
      small: atoms({
        height: '16',
        width: '16',
      }),
      large: atoms({
        fontSize: 'extraLarge',
        marginTop: '-0.5',
        height: '24',
        width: '24',
      }),
    },
    disabled: {
      true: atoms({
        color: 'textPlaceholder',
      }),
    },
  },
})

export const circle = recipe({
  base: [
    style({
      transition: 'all 1s linear, stroke-width 0.2s ease-in-out 1s',
    }),
  ],
  variants: {
    finished: {
      true: style({
        strokeWidth: '0',
      }),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
