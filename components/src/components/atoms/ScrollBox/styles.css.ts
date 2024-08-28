import { style } from '@vanilla-extract/css'

import { commonVars, cssVars, modeVars } from '@/src/css/theme.css'

export const scrollBox = style({
  overflow: 'auto',
  position: 'relative',
  width: commonVars.space.full,
  height: commonVars.space.full,
  borderColor: modeVars.color.greyLight,
  transition: `${modeVars.color.greyLight} 0.15s ease-in-out, height 0.15s ${cssVars.transitionTimingFunction.popIn}, var(--top-line-color) 0.15s ease-in-out, var(--bottom-line-color) 0.15s ease-in-out`,
  selectors: {
    '&::-webkit-scrollbar': {
      width: commonVars.space['3.5'],
      transition: 'box-shadow 0.15s ease-in-out',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-track-piece': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      transition: 'box-shadow 0.15s ease-in-out',
      boxShadow: `inset 0 0 ${commonVars.space['3']} ${commonVars.space['3']} ${modeVars.color.greyLight}`,
      border: `solid ${commonVars.space['1']} transparent`,
      borderRadius: commonVars.space['3'],
      backgroundColor: 'transparent',
    },
    '&:hover': {
      color: modeVars.color.greyBright,
    },
  },
})
