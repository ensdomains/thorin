import { recipe } from '@vanilla-extract/recipes'

import { style } from '@vanilla-extract/css'

import { atoms, vars } from '../../../css'

export const select = recipe({
  base: [
    atoms({
      background: 'background',
      borderColor: 'backgroundHide',
      borderWidth: 'px',
      borderRadius: 'extraLarge',
      cursor: 'pointer',
      position: 'relative',
      padding: '4',
      height: '14',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: '10',
    }),
  ],
  variants: {
    open: {
      true: {},
    },
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
        background: 'backgroundTertiary',
      }),
    },
  },
})

export const selectOption = recipe({
  base: [
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '3',
      width: 'full',
      height: '9',
      paddingX: '2',
      justifyContent: 'flex-start',
      transitionDuration: '150',
      transitionProperty: 'all',
      transitionTimingFunction: 'inOut',
      borderRadius: 'medium',
      marginY: '0.5',
    }),
    style({
      selectors: {
        '&:hover': {
          backgroundColor: vars.colors.foregroundSecondaryHover,
        },
        '&::first-child': {
          marginTop: '0',
        },
        '&::last-child': {
          marginBottom: '0',
        },
      },
    }),
  ],
  variants: {
    selected: {
      true: atoms({
        backgroundColor: 'foregroundSecondary',
      }),
    },
    disabled: {
      true: style([
        atoms({
          color: 'textTertiary',
        }),
        style({
          cursor: 'not-allowed',
          selectors: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        }),
      ]),
    },
  },
})

export const selectOptionContainer = recipe({
  base: [
    atoms({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop: '1.5',
      padding: '1.5',
      position: 'absolute',
      visibility: 'hidden',
      opacity: '0',
      width: 'full',
      height: 'fit',
      borderRadius: 'medium',
      boxShadow: '0.02',
      overflow: 'hidden',
    }),
  ],
  variants: {
    open: {
      true: style([
        atoms({
          zIndex: '20',
          visibility: 'visible',
          marginTop: '1.5',
          opacity: '100',
        }),
        style({
          transition:
            'all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0s linear 0.3s',
        }),
      ]),
      false: style([
        atoms({
          zIndex: '0',
          visibility: 'hidden',
          marginTop: '-12',
          opacity: '0',
        }),
        style({
          transition:
            'all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0s linear 0s',
        }),
      ]),
    },
  },
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
    disabled: {
      true: style({
        opacity: '0.1',
      }),
    },
  },
})

export const wrapper = atoms({
  position: 'relative',
})
