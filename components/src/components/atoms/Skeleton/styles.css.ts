import { keyframes, style } from '@vanilla-extract/css'

import { commonVars, modeVars } from '@/src/css/theme.css'

const shine = keyframes({
  to: {
    backgroundPositionX: '-200%',
  },
})

export const animations = style({
  backgroundColor: modeVars.color.greyLight,
  backgroundImage: `linear-gradient(
    90deg,
    ${modeVars.color.greyLight} 0px,
    ${modeVars.color.greySurface} 18%,
    ${modeVars.color.greyLight} 33%
  )`,
  backgroundSize: '200% 100%',
  animationName: shine,
  animationDuration: '1.5s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  borderRadius: commonVars.radii.medium,
  width: 'fit-content',
})
