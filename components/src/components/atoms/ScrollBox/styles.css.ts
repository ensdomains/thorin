import { createVar, style } from '@vanilla-extract/css'

import { commonVars, modeVars } from '@/src/css/theme.css'

const scrollBar = createVar()

export const scrollBox = style({
  vars: {
    [scrollBar]: modeVars.color.greyLight,
  },
  overflow: 'auto',
  position: 'relative',
  width: commonVars.space.full,
  height: commonVars.space.full,
  borderColor: modeVars.color.greyLight,
  transition: `var(${scrollBar}) 0.15s ease-in-out, height 0.15s ease-in-out, var(--top-line-color) 0.15s ease-in-out, var(--bottom-line-color) 0.15s ease-in-out`,
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
      boxShadow: `inset 0 0 ${commonVars.space['3']} ${commonVars.space['3']} var(${scrollBar})`,
      border: 'solid $1 transparent',
      borderRadius: commonVars.space['3'],
      backgroundColor: 'transparent',
    },
    '&:hover': {
      [scrollBar]: modeVars.color.greyBright,
    },
  },
})
