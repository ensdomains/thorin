import { style, globalStyle } from '@vanilla-extract/css'
export const liveEditor = style({})

globalStyle(`${liveEditor} .token`, {
  font: 'mono',
  fontSize: '1.0625rem',
  fontFeatureSettings: 'ss01, ss03',
})
