// styles.css.ts
import { commonVars } from '@ensdomains/thorin'
import { globalStyle, style } from '@vanilla-extract/css'

export const grid = style({
  display: 'grid',
  gap: commonVars.space['8'],
  gridTemplateColumns: `repeat(2, minmax(${commonVars.space['36']}, 1fr))`,
  width: 'max-content',
})

globalStyle('main', {
  margin: 'unset !important',
})
