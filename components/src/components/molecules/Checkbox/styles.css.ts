import { style } from '@vanilla-extract/css'

import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../../css'

const color = {
  grey: atoms({
    backgroundColor: 'backgroundHide',
  }),
  white: atoms({
    backgroundColor: 'white',
  }),
}

export type Color = keyof typeof color

const getSwitchSizeVariant = (size: Size) => {
  const sizeToSpace = {
    small: 7,
    medium: 10,
    large: 14,
  }
  const sizeSpace = sizeToSpace[size]
  const generateSpace = (space: number) => `${space / 4}rem`

  return {
    variants: {
      variant: 'switch' as Variant,
      size,
    },
    style: style({
      width: generateSpace(sizeSpace * 2 - 1),
      height: generateSpace(sizeSpace),
      borderRadius: generateSpace(sizeSpace / 2),
      selectors: {
        '&::before': {
          width: generateSpace(sizeSpace - 2),
          height: generateSpace(sizeSpace - 2),
        },
      },
    }),
  }
}

const size = {
  small: style({}),
  medium: style({}),
  large: style({}),
}

export type Size = keyof typeof size

const variant = {
  regular: style([
    atoms({
      width: '7',
      height: '7',
    }),
    style({
      font: 'inherit',
      borderRadius: vars.space['2'],
      display: 'grid',
      placeContent: 'center',
      transition: 'transform 150ms ease-in-out, filter 150ms ease-in-out',
      selectors: {
        '&:hover': {
          transform: 'translateY(-1px)',
          filter: 'contrast(0.7)',
        },
        '&:active': {
          transform: 'translateY(0px)',
          filter: 'contrast(1)',
        },
        '&::before': {
          content: '',
          backgroundColor: vars.colors.accent,
          maskImage: `url('data:image/svg+xml; utf8, <svg width="${vars.space['4']}" height="${vars.space['4']}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`,
          width: vars.space['4'],
          height: vars.space['4'],
          transform: 'scale(0)',
          transition: 'transform 90ms ease-in-out',
        },
        '&:checked::before': {
          transform: 'scale(1)',
        },
      },
    }),
  ]),
  switch: style({
    display: 'grid',
    placeContent: 'center',
    transition: 'transform 150ms ease-in-out, filter 150ms ease-in-out',
    backgroundColor: vars.colors.accent,
    filter: 'grayscale(1) brightness(1.5)',
    selectors: {
      '&:hover': {
        transform: 'translateY(-1px)',
        filter: 'grayscale(1) brightness(1.55)',
      },
      '&:active': {
        transform: 'translateY(0px)',
        filter: 'grayscale(1) brightness(1.5)',
      },
      '&:checked:hover': {
        filter: 'grayscale(0) brightness(1.05)',
      },
      '&:checked:active': {
        filter: 'grayscale(0) brightness(1)',
      },
      '&::before': {
        content: '',
        backgroundColor: vars.colors.white,
        borderRadius: vars.radii['full'],
        transform: 'translateX(-50%)',
        transition: 'transform 90ms ease-in-out',
      },
      '&:checked::before': {
        transform: 'translateX(50%)',
      },
      '&:checked': {
        filter: 'grayscale(0) brightness(1)',
      },
    },
  }),
}

export type Variant = keyof typeof variant

export const input = recipe({
  base: [
    atoms({
      cursor: 'pointer',
      marginY: '1',
    }),
  ],
  variants: {
    variant,
    color,
    size,
    disabled: {
      true: {},
    },
  },
  compoundVariants: [
    getSwitchSizeVariant('small'),
    getSwitchSizeVariant('medium'),
    getSwitchSizeVariant('large'),
  ],
})
