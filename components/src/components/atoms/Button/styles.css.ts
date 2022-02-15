import { style } from '@vanilla-extract/css'
import { CSSVarFunction } from '@vanilla-extract/private'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { Gradients } from '../../../tokens/color'

import { atoms, rgb, vars } from '../../../css'

const shape = {
  circle: atoms({
    borderRadius: 'full',
  }),
  square: {},
}

export type Shape = keyof typeof shape

const size = {
  extraSmall: atoms({
    borderRadius: 'large',
    fontSize: 'small',
    padding: '2',
  }),
  small: atoms({
    borderRadius: 'large',
    fontSize: 'small',
    height: '10',
    paddingX: '4',
  }),
  medium: atoms({
    borderRadius: 'extraLarge',
    fontSize: 'large',
    paddingY: '3.5',
    paddingX: '4',
  }),
}

export type Size = keyof typeof size

const getAccentVars = (colorVar: CSSVarFunction, colorName: Gradients) => ({
  [vars.colors.accent]: rgb(colorVar),
  [vars.colors.accentText]: vars.colors.white,
  [vars.colors.accentGradient]: vars.mode.gradients[colorName],
  [vars.colors.accentSecondary]: rgb(
    colorVar,
    vars.mode.shades.accentSecondary,
  ),
  [vars.colors.accentSecondaryHover]: rgb(
    colorVar,
    vars.mode.shades.accentSecondaryHover,
  ),
})

const tone = {
  accent: {},
  blue: style({
    vars: getAccentVars(vars.mode.colors.blue, 'blue'),
  }),
  green: style({
    vars: getAccentVars(vars.mode.colors.green, 'green'),
  }),
  red: style({
    vars: getAccentVars(vars.mode.colors.red, 'red'),
  }),
}

export type Tone = keyof typeof tone

const variant = {
  primary: style([
    atoms({
      color: 'accentText',
      backgroundColor: 'accent',
    }),
  ]),
  secondary: style([
    atoms({
      color: 'textSecondary',
      backgroundColor: 'grey',
    }),
  ]),
  action: style([
    atoms({
      color: 'accentText',
      background: 'accentGradient',
    }),
  ]),
  transparent: style([
    atoms({
      color: 'textTertiary',
      backgroundColor: {
        hover: 'foregroundTertiary',
        active: 'foregroundTertiary',
      },
    }),
  ]),
}

export type Variant = keyof typeof variant

const getShapeSizeCompoundVariant = (shape: Shape, size: Size) => ({
  variants: {
    shape,
    size,
  },
  style: style([
    atoms({
      borderRadius:
        shape === 'square'
          ? size === 'small'
            ? 'large'
            : '2xLarge'
          : undefined,
      minWidth: size === 'small' ? '10' : '14',
    }),
    style({
      padding: 0,
    }),
  ]),
})

export const variants = recipe({
  base: style([
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '4',
      justifyContent: 'center',
      transitionDuration: '150',
      transitionProperty: 'all',
      transitionTimingFunction: 'inOut',
    }),
    style({
      letterSpacing: '-0.01em',
      boxShadow: `${vars.shadows['0.25']} ${vars.colors.grey}`,
      selectors: {
        '&:hover': {
          transform: 'translateY(-1px)',
          filter: 'brightness(1.05)',
        },
        '&:active': {
          transform: 'translateY(0px)',
          filter: 'brightness(1)',
        },
        '&:disabled': {
          backgroundColor: vars.colors.grey,
          color: vars.colors.textTertiary,
          boxShadow: 'none',
        },
      },
    }),
  ]),
  variants: {
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
      false: {},
    },
    center: {
      true: atoms({
        position: 'relative',
      }),
      false: {},
    },
    pressed: {
      true: style({
        filter: 'brightness(0.95)',
      }),
      false: {},
    },
    shadowless: {
      true: style({
        boxShadow: 'none !important',
      }),
      false: {},
    },
    shape,
    size,
    tone,
    variant,
  },
  compoundVariants: [
    // Shape + Size
    getShapeSizeCompoundVariant('circle', 'medium'),
    getShapeSizeCompoundVariant('circle', 'small'),
    getShapeSizeCompoundVariant('square', 'medium'),
    getShapeSizeCompoundVariant('square', 'small'),
    // Center + Size
    {
      variants: {
        center: true,
        size: 'medium',
      },
      style: atoms({
        paddingX: '14',
      }),
    },
    {
      variants: {
        center: true,
        size: 'medium',
      },
      style: atoms({
        paddingX: '15',
      }),
    },
    {
      variants: {
        shadowless: true,
        pressed: true,
        variant: 'transparent',
      },
      style: atoms({
        backgroundColor: 'backgroundSecondary',
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
