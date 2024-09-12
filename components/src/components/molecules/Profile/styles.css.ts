import { sprinkles } from '@/src/css/sprinkles.css'
import { recipe } from '@vanilla-extract/recipes'

export const variants = recipe({
  variants: {
    size: {
      small: sprinkles({
        height: '10',
        padding: '0',
        width: '10',
        maxWidth: '0',
        paddingRight: '0',
      }),
      medium: sprinkles({
        height: '12',
        padding: '1',
        width: '45',
        maxWidth: '45',
        paddingRight: '4',
      }),
      large: sprinkles({
        height: '14',
        padding: '1',
        width: 'fit',
        maxWidth: '80',
        paddingRight: '5',
      }),
    },
  },
})
