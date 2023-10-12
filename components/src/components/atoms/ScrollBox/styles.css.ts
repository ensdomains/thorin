import { style } from '@vanilla-extract/css'

import { commonVars, modeVars } from '@/src/css/theme.css'

export const scrollBox = style({
  borderColor: modeVars.color.greyLight,
  selectors: {
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar:vertical': {
      width: commonVars.space['1.5'],
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar:horizontal': {
      height: commonVars.space['1.5'],
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderColor: 'inherit!important',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      border: 'none',
      borderRadius: '99999999999px',
      borderRightStyle: 'inset',
      borderRightWidth: 'calc(100vw + 100vh)',
    },
    '&::-webkit-scrollbar-thumb:horizontal': {
      border: 'none',
      borderRadius: '99999999999px',
      borderRightStyle: 'inset',
      borderRightWidth: 'calc(100vw + 100vh)',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
    '&:hover': {
      borderColor: modeVars.color.greyBright,
    },
  },
})
