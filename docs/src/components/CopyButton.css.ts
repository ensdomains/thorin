import { style } from '@vanilla-extract/css'

export const copyButton = style({
  'transform': 'translateY(0)',
  ':hover': {
    transform: 'translateY(-1px)',
  },
})
