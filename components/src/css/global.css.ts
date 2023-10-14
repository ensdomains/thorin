import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  appearance: 'none',
  outline: 'none',
  boxSizing: 'border-box',
  color: 'inherit',
  margin: 0,
  padding: 0,
  borderWidth: 0,
  verticalAlign: 'baseline',
  background: 'none',
})

globalStyle('svg', {
  fill: 'currentColor',
  display: 'block',
})
