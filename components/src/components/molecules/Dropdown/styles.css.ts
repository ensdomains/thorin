import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

const size = {
  small: atoms({
    paddingX: '0.25',
    paddingY: '0.5',
  }),
  medium: atoms({
    paddingY: '2.5',
    paddingX: '3.5',
  }),
}
export type Size = keyof typeof size

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
    align: {
      left: style({
        left: '0',
      }),
      right: style({
        right: '0',
      }),
    },
    shortThrow: {
      true: style({}),
      false: style({}),
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
    {
      variants: {
        opened: false,
        shortThrow: true,
      },
      style: atoms({
        marginTop: '-2.5',
      }),
    },
    {
      variants: {
        opened: false,
        shortThrow: false,
      },
      style: atoms({
        marginTop: '-12',
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
      justifyContent: 'space-between',
      gap: '4',
      borderWidth: 'px',
      borderColor: 'borderSecondary',
      fontWeight: 'semiBold',
      cursor: 'pointer',
      position: 'relative',
    }),
  ],
  variants: {
    size,
    open: {
      true: style([
        atoms({
          borderTopRadius: 'almostExtraLarge',
          borderBottomRadius: 'none',
          borderBottomWidth: '0',
          backgroundColor: 'grey',
          color: 'textTertiary',
        }),
        style({
          transition:
            '0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.3s color ease-in-out, 0.2s border-radius ease-in-out, 0s border-width 0.1s',
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
          borderRadius: 'almostExtraLarge',
          boxShadow: '0.02',
        }),
        style({
          transition:
            '0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.15s color ease-in-out, 0s border-width 0.15s, 0.15s border-color ease-in-out',
          selectors: {
            '&:hover': {
              borderColor: vars.colors.border,
            },
          },
        }),
      ]),
    },
  },
})
