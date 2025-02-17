import { recipe } from '@vanilla-extract/recipes'

export const backdropSurface = recipe({
  variants: {
    entered: {
      true: {
        'backgroundColor': 'rgba(0, 0, 0, 0.5)',
        '@supports': {
          '(-webkit-backdrop-filter: none) or (backdrop-filter: none)': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(16px)',
          },
        },
      },
      false: {
        'backgroundColor': 'rgba(0, 0, 0, 0)',
        '@supports': {
          '(-webkit-backdrop-filter: none) or (backdrop-filter: none)': {
            backdropFilter: 'blur(0px)',
          },
        },
      },
    },
  },
})
