import { recipe } from '@vanilla-extract/recipes'

import { commonVars, modeVars } from '@/src/css/theme.css'

import { translateX } from '@/src/css/utils/common'

import { getValueForSize } from './utils/getValueForSize'
import { sprinkles } from '@/src/css/sprinkles.css'

export const toggle = recipe({
  base: {
    selectors: {
      '&::after': {
        content: '',
        display: 'block',
        position: 'absolute',
        background: modeVars.color.backgroundPrimary,
        borderRadius: commonVars.radii.full,
        transition:
          'transform 0.3s ease-in-out, background-color 0.1s ease-in-out',
      },
      '&:not(:checked):disabled': {
        backgroundColor: modeVars.color.border,
      },
      '&:not(:checked):disabled::after': {
        backgroundColor: modeVars.color.greyPrimary,
      },
      '&:checked:disabled': {
        backgroundColor: modeVars.color.blueLight,
      },
      '&:checked:disabled::after': {
        background: modeVars.color.backgroundPrimary,
      },
    },
  },
  variants: {
    size: {
      small: {
        selectors: {
          '&::after': {
            width: commonVars.space[getValueForSize('small', 'knobSize')],
            height: commonVars.space[getValueForSize('small', 'knobSize')],
          },
          '&:not(:checked)::after': {
            transform: translateX(
              `calc(-1 * ${
                commonVars.space[getValueForSize('small', 'translateX')]
              })`,
            ),
          },
          '&:checked::after': {
            transform: translateX(
              commonVars.space[getValueForSize('small', 'translateX')],
            ),
          },
        },
      },
      medium: {
        selectors: {
          '&::after': {
            width: commonVars.space[getValueForSize('medium', 'knobSize')],
            height: commonVars.space[getValueForSize('medium', 'knobSize')],
          },
          '&:not(:checked)::after': {
            transform: translateX(
              `calc(-1 * ${
                commonVars.space[getValueForSize('medium', 'translateX')]
              })`,
            ),
          },
          '&:checked::after': {
            transform: translateX(
              commonVars.space[getValueForSize('medium', 'translateX')],
            ),
          },
        },
      },
      large: {
        selectors: {
          '&::after': {
            width: commonVars.space[getValueForSize('large', 'knobSize')],
            height: commonVars.space[getValueForSize('large', 'knobSize')],
          },
          '&:not(:checked)::after': {
            transform: translateX(
              `calc(-1 * ${
                commonVars.space[getValueForSize('large', 'translateX')]
              })`,
            ),
          },
          '&:checked::after': {
            transform: translateX(
              commonVars.space[getValueForSize('large', 'translateX')],
            ),
          },
        },
      },
    },
  },
})

export const checkbox = recipe({
  variants: {
    size: {
      small: sprinkles({
        width: '12',
        height: '7',
      }),
      medium: sprinkles({
        width: '12',
        height: '8',
      }),
      large: sprinkles({
        width: '16',
        height: '10',
      }),
    },
  },
})
