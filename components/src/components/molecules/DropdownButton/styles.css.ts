import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

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

export const innerMenuButton = recipe({
  base: [
    atoms({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingY: '3.5',
      paddingX: '4',
      borderWidth: 'px',
      borderColor: 'borderSecondary',
      fontWeight: 'semiBold',
      cursor: 'pointer',
      position: 'relative',
    }),
  ],
  variants: {
    open: {
      true: style([
        atoms({
          borderTopRadius: 'large',
          borderBottomRadius: 'none',
          borderBottomWidth: '0',
          backgroundColor: 'grey',
          color: 'textTertiary',
        }),
        style({
          transition:
            '0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.15s color ease-in-out, 0s border-width 0.1s',
          selectors: {
            '&:hover': {
              color: vars.colors.accent,
            },
          },
        }),
      ]),
      false: style([
        atoms({
          backgroundColor: 'background',
          color: 'textSecondary',
          borderRadius: 'large',
        }),
        style({
          transition:
            '0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.15s color ease-in-out, 0s border-width 0.25s',
        }),
      ]),
    },
  },
})
