import { globalStyle, style } from '@vanilla-extract/css'

export const avatar = style({})

globalStyle(`${avatar} > * `, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})
