import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

const size = {
  medium: atoms({
    height: '14',
  }),
  large: atoms({
    height: '16',
  }),
  extraLarge: atoms({
    height: '18',
  }),
}

export type Size = keyof typeof size

export const inputParent = style({})

export const root = recipe({
  base: [
    atoms({
      borderWidth: '0.75',
      borderColor: 'transparent',
      borderRadius: '2xLarge',
      color: 'text',
      display: 'flex',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
    }),
    style({
      selectors: {
        '&:focus-within': {
          borderColor: vars.colors.accentSecondary,
        },
      },
    }),
  ],
  variants: {
    size,
    disabled: {
      true: atoms({
        borderColor: 'foregroundSecondary',
        backgroundColor: 'background',
      }),
      false: {},
    },
    error: {
      true: style([
        atoms({
          borderColor: 'red',
          cursor: 'default',
        }),
        style({
          selectors: {
            '&:focus-within': {
              borderColor: vars.colors.red,
            },
          },
        }),
      ]),
    },
    suffix: {
      true: atoms({
        height: '16',
      }),
    },
  },
})

const container = atoms({
  alignItems: 'center',
  display: 'flex',
  height: 'full',
  lineHeight: 'none',
})

const text = atoms({
  color: 'inherit',
  fontFamily: 'sans',
  fontWeight: 'medium',
})

const affix = style([container, text, style({ lineHeight: 'normal' })])
export const prefix = style([
  affix,
  atoms({ paddingLeft: '4', paddingRight: '2' }),
])
export const suffix = style([
  affix,
  atoms({ paddingRight: '2', paddingLeft: '2' }),
])

export const input = recipe({
  base: style([
    atoms({
      backgroundColor: 'transparent',
      position: 'relative',
      width: 'full',
    }),
    style({
      selectors: {
        '&::placeholder': {
          color: vars.colors.textPlaceholder,
          fontWeight: vars.fontWeights.bold,
        },
      },
    }),
  ]),
  variants: {
    size: {
      medium: atoms({
        fontSize: 'base',
      }),
      large: atoms({
        fontSize: 'large',
      }),
      extraLarge: atoms({
        fontSize: 'headingThree',
        paddingX: '6',
      }),
    },
    disabled: {
      true: atoms({
        opacity: '50',
        cursor: 'not-allowed',
      }),
      false: {},
    },
    type: {
      number: style({
        fontFeatureSettings: "'kern' 1,  'tnum' 1, 'calt' 0",
        fontVariantNumeric: 'tabular-nums',
      }),
      text: {},
    },
  },
})

export const ghost = recipe({
  base: [
    atoms({
      borderColor: 'transparent',
      inset: '0',
      position: 'absolute',
      pointerEvents: 'none',
      whiteSpace: 'pre',
    }),
    style({ lineHeight: 'normal' }),
  ],
  variants: {
    type: {
      number: style({
        fontFeatureSettings: "'kern' 1,  'tnum' 1, 'calt' 0",
        fontVariantNumeric: 'tabular-nums',
      }),
      text: {},
    },
  },
})

export const variants = recipe({
  base: [style([container, text, atoms({ paddingX: '4' })])],
  variants: {
    prefix: {
      true: atoms({
        paddingLeft: 'none',
      }),
    },
    suffix: {
      true: atoms({
        paddingRight: 'none',
      }),
    },
  },
})

export const max = style([
  atoms({
    backgroundColor: 'foregroundSecondary',
    borderRadius: 'medium',
    color: { base: 'textSecondary', hover: 'text' },
    cursor: 'pointer',
    fontSize: 'label',
    fontWeight: 'semiBold',
    height: 'max',
    lineHeight: 'none',
    padding: '2',
    textTransform: 'uppercase',
    transitionDuration: '150',
    transitionProperty: 'colors',
    transitionTimingFunction: 'inOut',
    visibility: 'hidden',
  }),
  style({
    selectors: {
      [`${inputParent}:hover &`]: {
        visibility: 'visible',
      },
      [`${inputParent}:focus-within &`]: {
        visibility: 'visible',
      },
    },
  }),
])
