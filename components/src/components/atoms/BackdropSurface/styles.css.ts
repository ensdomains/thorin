import { style } from '@vanilla-extract/css'

import { atoms, vars } from '../../../css'

export const backdrop = style([
  atoms({
    width: 'viewWidth',
    height: 'viewHeight',
    position: 'fixed',
    overflow: 'hidden',
    backgroundColor: 'backgroundHide',
  }),
  style({
    '@supports': {
      '(-webkit-backdrop-filter: none) or (backdrop-filter: none)': {
        backdropFilter: `blur(2px)`,
        WebkitBackdropFilter: 'blur(2px)',
        backgroundColor: vars.colors.backgroundHide,
      },
    },
    top: 0,
  }),
])
