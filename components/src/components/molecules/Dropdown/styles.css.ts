import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

export const variants = recipe({
  base: [
    atoms({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'medium',
      position: 'absolute',
    }),
  ],
  variants: {
    opened: {
      true: style([
        atoms({
          visibility: 'visible',
          opacity: '100',
        }),
      ]),
      false: style([
        atoms({
          zIndex: '0',
          visibility: 'hidden',
          marginTop: '-12',
          opacity: '0',
        }),
      ]),
    },
    inner: {
      true: style([
        atoms({
          backgroundColor: 'grey',
          borderRadius: 'almostExtraLarge',
          borderTopRadius: 'none',
          boxShadow: '0',
          borderWidth: 'px',
          borderTopWidth: '0',
          borderColor: 'borderSecondary',
          paddingTop: '2.5',
          paddingX: '1.5',
          paddingBottom: '1.5',
          marginTop: '-2.5',
        }),
        style({
          transition: '0.35s all cubic-bezier(1, 0, 0.22, 1.6)',
        }),
      ]),
      false: style([
        atoms({
          padding: '1.5',
          backgroundColor: 'groupBackground',
          boxShadow: '0.02',
          borderRadius: '2xLarge',
        }),
      ]),
    },
  },
  compoundVariants: [
    {
      variants: {
        opened: true,
        inner: false,
      },
      style: style([
        atoms({
          zIndex: '20',
          marginTop: '1.5',
        }),
        style({
          transition:
            'all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.3s',
        }),
      ]),
    },
    {
      variants: {
        opened: false,
        inner: false,
      },
      style: style({
        transition:
          'all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s',
      }),
    },
    {
      variants: {
        opened: true,
        inner: true,
      },
      style: style({
        transition:
          'all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.35s',
      }),
    },
    {
      variants: {
        opened: false,
        inner: true,
      },
      style: style({
        transition:
          'all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s',
      }),
    },
  ],
})

export const menuButton = recipe({
  base: [
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '4',
      width: 'full',
      height: '12',
      padding: '3',
      fontWeight: 'semiBold',
    }),
    style({
      transition: '0.15s all ease-in-out',
      letterSpacing: '-0.01em',
      selectors: {
        '&:active': {
          transform: 'translateY(0px)',
          filter: 'brightness(1)',
        },
        '&:disabled': {
          color: vars.colors.textTertiary,
        },
      },
    }),
  ],
  variants: {
    inner: {
      true: style({
        justifyContent: 'center',
        selectors: {
          '&:hover': {
            color: vars.colors.accent,
          },
        },
      }),
      false: style({
        justifyContent: 'flex-start',
        selectors: {
          '&:hover': {
            transform: 'translateY(-1px)',
            filter: 'brightness(1.05)',
          },
        },
      }),
    },
    hasColor: {
      true: style({}),
    },
  },
  compoundVariants: [
    {
      variants: {
        inner: true,
        hasColor: false,
      },
      style: atoms({
        color: 'textSecondary',
      }),
    },
  ],
})
