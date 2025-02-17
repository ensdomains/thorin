import { style } from '@vanilla-extract/css'

export const iconGrid = style({
  'gridTemplateColumns': 'repeat(auto-fit, minmax(4.5rem, 1fr))',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(5rem, 1fr))',
    },
  },
})
