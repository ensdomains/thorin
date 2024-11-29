import { sprinkles } from '@/src/css/sprinkles.css'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const variants = recipe({
  variants: {
    size: {
      small: sprinkles({
        fontSize: 'body',
        lineHeight: 'body',
        marginTop: '0',
        wh: '16',
      }),
      large: sprinkles({
        fontSize: 'extraLarge',
        lineHeight: 'extraLarge',
        marginTop: '-0.5',
        wh: '24',
      }),
    },
  },
})

export const circle = style({
  transition: 'all 1s linear, stroke-width 0.2s ease-in-out 1s',
})
