import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { commonVars, modeVars } from '@/src/css/theme.css'

export const statusDot = recipe({
  base: {},
  variants: {
    show: {
      true: {
        selectors: {
          '&:after': {
            content: '""',
            position: 'absolute',
            width: commonVars.space['4'],
            height: commonVars.space['4'],
            backgroundColor: modeVars.color.bluePrimary,
            opacity: 0,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: modeVars.color.backgroundPrimary,
            transform: 'scale(0.3)',
            transition: 'all 0.3s ease-out',
            boxSizing: 'border-box',
            borderRadius: '50%',
            top: commonVars.space['-1.5'],
            right: commonVars.space['-1.5'],
          },
          '&:focus-within:after': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
    },
    validated: {
      true: {
        selectors: {
          '&:after': {
            backgroundColor: modeVars.color.greenPrimary,
            opacity: 1,
            transform: 'scale(1)',
          },
          '&:focus-within:after': {
            backgroundColor: modeVars.color.bluePrimary,
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
    },
    error: {
      true: {
        selectors: {
          '&:after': {
            backgroundColor: modeVars.color.redPrimary,
            opacity: 1,
            transform: 'scale(1)',
          },
          '&:focus-within:after': {
            backgroundColor: modeVars.color.redPrimary,
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
    },
  },
})

export type StatusDot = RecipeVariants<typeof statusDot>
