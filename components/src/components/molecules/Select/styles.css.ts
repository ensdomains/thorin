import { createVar, style } from '@vanilla-extract/css'

import { modeVars } from '@/src/css/theme.css'

export const input = style({
  selectors: {
    '&::placeholder': {
      color: modeVars.color.greyPrimary,
    },
  },
})

export const rootInput = style({
  appearance: 'none',
})

export const selectOptionListSize = createVar()

export const selectOptionList = style({
  maxHeight: selectOptionListSize,
})

export const selectOptionContainerBottom = createVar()

export const selectOptionContainerTop = createVar()

export const selectOptionContainer = style({
  transition: 'all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0.3s linear',
  top: selectOptionContainerTop,
  bottom: selectOptionContainerBottom,
})

export const toggleMenuButtonRotation = createVar()

export const toggleMenuButton = style({
  transform: toggleMenuButtonRotation,
})
