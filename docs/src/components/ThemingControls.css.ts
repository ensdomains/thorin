// styles.css.ts
import { commonVars, modeVars } from '@ensdomains/thorin'
import { globalStyle, style } from '@vanilla-extract/css'

export const grid = style({
  display: 'grid',
  gap: commonVars.space['1'],
  gridTemplateColumns: `repeat(auto-fill, minmax(${commonVars.space['40']}, 1fr))`,
  width: commonVars.space['full'],
})

globalStyle('main', {
  margin: 'unset !important',
})

export const overlay = style({
  backgroundColor: modeVars.color.greyGradient,
  backdropFilter: 'blur(2px)',
})
