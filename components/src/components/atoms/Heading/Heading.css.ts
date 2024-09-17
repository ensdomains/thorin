import { sprinkles } from '@/src/css/sprinkles.css'
import { recipe } from '@vanilla-extract/recipes'

export const heading = recipe({
  variants: {
    level: {
      ['1']: sprinkles({
        fontSize: 'headingTwo',
        fontWeight: 'extraBold',
        lineHeight: 'headingTwo',
      }),
      ['2']: sprinkles({
        fontSize: 'extraLarge',
        fontWeight: 'bold',
        lineHeight: 'extraLarge',
      }),
    },
  },
})
