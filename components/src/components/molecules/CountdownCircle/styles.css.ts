import { sprinkles } from '@/src/css/sprinkles.css'
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
