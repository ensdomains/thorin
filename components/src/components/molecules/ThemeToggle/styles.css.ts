import { createVar, globalStyle, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'
import { recipe } from '@vanilla-extract/recipes'
import { sprinkles } from '@/src/css/sprinkles.css'

export const labelEth = style({})

export const labelFiat = style({})

export const checkbox = style({})

export const labelTransform = createVar()

export const label = style({
  transition: 'color 0.1s linear',
  translate: '-50% -50%',
  transform: labelTransform,
})

export const slider = style({
  transition: 'transform 0.3s ease-in-out, background-color 0.1s ease-in-out',
  translate: '-50% -50%',
})

globalStyle(`${checkbox}:not(:checked) ~ ${slider}`, {
  transform: 'translateX(-50%)',
})

globalStyle(`${checkbox}:checked ~ ${slider}`, {
  transform: 'translateX(50%)',
})

globalStyle(`${checkbox}:disabled ~ ${slider}`, {
  backgroundColor: modeVars.color.greyPrimary,
})

globalStyle(`${checkbox}:checked ~ ${labelEth}`, {
  color: modeVars.color.greyPrimary,
})

globalStyle(`${checkbox}:not(:checked) ~ ${labelFiat}`, {
  color: modeVars.color.greyPrimary,
})

export const icon = style({
  transform: 'scale(0.6)',
})

export const variants = recipe({
  variants: {
    size: {
      extraSmall: sprinkles({
        width: '12',
        height: '6.5',
      }),
      small: sprinkles({
        width: '20',
        height: '10',
      }),
      medium: sprinkles({
        width: '24',
        height: '12',
      }),
    },
    knob: {
      extraSmall: sprinkles({
        wh: '5.5',
      }),
      small: sprinkles({
        wh: '9',
      }),
      medium: sprinkles({
        wh: '11',
      }),
    },
  },
})
