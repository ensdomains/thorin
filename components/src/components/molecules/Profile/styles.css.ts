import { sprinkles } from '@/src/css/sprinkles.css'
import { brightness, translateY } from '@/src/css/utils/common'
import { createVar } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const hasDropdownBrightness = createVar()
export const hasDropdownTransform = createVar()

export const variants = recipe({
  base: {
    'transitionProperty': 'color, border-color, background-color, transform, filter',
    'filter': brightness(1),
    'transform': translateY(0),
    ':hover': {
      filter: hasDropdownBrightness,
      transform: hasDropdownTransform,
    },
  },
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
