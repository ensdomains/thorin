import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

export const variants = recipe({
  base: [
    atoms({
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 'full',
      transitionDuration: '200',
      transitionProperty: 'all',
      transitionTimingFunction: 'inOut',
      position: 'relative',
      zIndex: '10',
    }),
    style({
      padding: `${vars.space['2']} ${vars.space['4']} ${vars.space['2']} ${vars.space['2.5']} `,
    }),
  ],
  variants: {
    size: {
      small: style([
        atoms({
          maxWidth: '48',
        }),
      ]),
      medium: style([
        atoms({
          maxWidth: '52',
        }),
      ]),
      large: style([
        atoms({
          maxWidth: '80',
        }),
      ]),
    },
    hasChevron: {
      true: style({
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            transform: 'translateY(-1px)',
            filter: 'brightness(1.05)',
          },
        },
      }),
    },
    open: {
      true: style([
        atoms({
          boxShadow: '0',
          backgroundColor: 'foregroundSecondary',
        }),
      ]),
      false: style([
        atoms({
          boxShadow: '0.25',
          boxShadowColor: 'foregroundSecondary',
          backgroundColor: 'groupBackground',
        }),
      ]),
    },
  },
  compoundVariants: [
    {
      variants: {
        size: 'small',
        hasChevron: true,
      },
      style: atoms({
        maxWidth: '52',
      }),
    },
    {
      variants: {
        size: 'medium',
        hasChevron: true,
      },
      style: atoms({
        maxWidth: '56',
      }),
    },
    {
      variants: {
        size: 'large',
        hasChevron: true,
      },
      style: style({
        maxWidth: `calc(${vars.space['80']} + ${vars.space['4']})`,
      }),
    },
  ],
})

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
      transform: 'rotate(180deg)',
    }),
  ],
  variants: {
    open: {
      true: style([
        style({
          opacity: '1',
          transform: 'rotate(0deg)',
        }),
      ]),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
