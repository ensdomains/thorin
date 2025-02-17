import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { commonVars } from '@/src/css/theme.css'
import { recipe } from '@vanilla-extract/recipes'

export const avatar = style({})

export const img = recipe({
  base: {
    display: 'none',
    position: 'absolute',
    height: commonVars.space.full,
    width: commonVars.space.full,
    objectFit: 'cover',
  },
  variants: {
    loaded: {
      true: {
        display: 'block',
      },
    },
    disabled: {
      true: {
        filter: 'grayscale(1)',
      },
    },
  },
})

export const overlay = recipe({
  variants: {
    checked: {
      true: {
        background: `rgba(56, 137, 255, 0.75)`,
      },
      false: {
        background: `rgba(0,0,0, 0.25)`,
      },
    },
    disabled: {
      true: {
        background: 'transparent',
      },
    },
  },
})

export const iconClass = style({
  width: '40%',
})

export const placeholder = styleVariants({
  disabled: {
    filter: 'grayscale(1)',
  },
})

globalStyle(`${avatar} > * `, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})
