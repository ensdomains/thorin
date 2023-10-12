import { keyframes, style } from '@vanilla-extract/css'

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
