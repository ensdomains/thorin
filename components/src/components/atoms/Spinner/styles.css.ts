import { sprinkles } from '@/src/css/sprinkles.css'
import { keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const rotate = keyframes({
  '100%': {
    transform: 'rotate(1turn)',
  },
})

export const animation = style({
  animationName: rotate,
  animationDuration: '1.1s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
})

export const variants = recipe({
  variants: {
    size: {
      small: sprinkles({
        wh: '4',
        strokeWidth: '1',
      }),
      medium: sprinkles({
        wh: '6',
        strokeWidth: '1.25',
      }),
      large: sprinkles({
        wh: '16',
        strokeWidth: '1',
      }),
    },
  },
})
