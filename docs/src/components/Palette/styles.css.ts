import { style } from '@vanilla-extract/css'
import { commonVars } from '@ensdomains/thorin'

export const grid = style({
  display: 'grid',
  gap: commonVars.space['2'],
  gridTemplateColumns: `${commonVars.space['5']} repeat(6, minmax(${commonVars.space['24']}, 1fr))`,
  gridTemplateRows: `${commonVars.space['5']} repeat(9, ${commonVars.space['24']})`,
  marginRight: commonVars.space['2'],
  marginBottom: commonVars.space['2'],
})

export const colorLabel = style({
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
})
