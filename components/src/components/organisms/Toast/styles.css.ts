import { style } from '@vanilla-extract/css'

export const container = style({
  backgroundColor: 'rbga(255,255,255,0.8)',
  backdropFilter: 'blur(16px)',
})

export const draggable = style({
  marginBottom: 'calc(-1 * 0.5rem)',
})
