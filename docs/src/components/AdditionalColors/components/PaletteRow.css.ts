import { createVar, style } from '@vanilla-extract/css'

export const paletteCellBackgroundColor = createVar()

export const paletteCell = style({
  'backgroundColor': paletteCellBackgroundColor,
  'transform': 'scale(1)',
  ':hover': {
    transform: 'scale(1.05)',
  },
})
