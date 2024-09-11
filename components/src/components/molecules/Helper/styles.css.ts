import { sprinkles } from '@/src/css/sprinkles.css'
import { recipe } from '@vanilla-extract/recipes'

export const variants = recipe({
  variants: {
    alert: {
      error: sprinkles({
        backgroundColor: 'redSurface',
        borderColor: 'redPrimary',
      }),
      warning: sprinkles({
        backgroundColor: 'yellowSurface',
        borderColor: 'yellowPrimary',
      }),
      info: sprinkles({
        backgroundColor: 'blueSurface',
        borderColor: 'bluePrimary',
      }),
    },
    svgAlert: {
      error: sprinkles({ color: 'redPrimary' }),
      warning: sprinkles({ color: 'yellowPrimary' }),
      info: sprinkles({ color: 'bluePrimary' }),
    },
  },
})
