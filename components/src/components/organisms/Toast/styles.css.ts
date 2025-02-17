import { createVar, style } from '@vanilla-extract/css'

export const containerLeft = createVar()
export const containerRight = createVar()
export const containerTop = createVar()
export const containerBottom = createVar()
export const containerWidth = createVar()
export const containerTransform = createVar()

export const container = style({
  backgroundColor: 'rbga(255,255,255,0.8)',
  backdropFilter: 'blur(16px)',
  left: containerLeft,
  right: containerRight,
  top: containerTop,
  bottom: containerBottom,
  width: containerWidth,
  boxShadow: '0.02',
  transform: containerTransform,
})

export const draggable = style({
  marginBottom: 'calc(-1 * 0.5rem)',
})
