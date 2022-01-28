import { style } from '@vanilla-extract/css'

import { atoms, vars } from '../../../css'

export const backdrop = style([
  atoms({
    width: 'viewWidth',
    height: 'viewHeight',
    position: 'fixed',
    overflow: 'hidden',
    backgroundColor: 'backgroundHideFallback',
  }),
  style({
    '@supports': {
      '(-webkit-backdrop-filter: none) or (backdrop-filter: none)': {
        backdropFilter: `blur(30px)`,
        WebkitBackdropFilter: 'blur(30px)',
        backgroundColor: vars.colors.backgroundHide,
      },
    },
    top: 0,
  }),
])
