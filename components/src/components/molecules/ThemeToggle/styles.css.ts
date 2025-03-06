import { responsiveConditions, sprinkles } from '@/src/css/sprinkles.css'
import { space } from '@/src/tokens/space'
import { globalStyle, style } from '@vanilla-extract/css'

export const container = sprinkles({
  width: 'full',
  display: 'flex',
  flexDirection: { base: 'column-reverse', sm: 'column' },
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: { base: '2', sm: '0' },
  padding: { sm: '2' },
})

export const themeItem = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4',
    borderRadius: 'large',
    borderWidth: '1x',
    borderStyle: 'solid',
    borderColor: 'border',
    cursor: { base: 'pointer', disabled: 'not-allowed' },
    backgroundColor: { hover: 'greySurface' },
  }),
  style({
    'transition': 'all 0.1s ease-in-out',
    '@media': {
      [responsiveConditions.sm['@media']]: {
        border: 'none',
      },
    },
  }),
])

globalStyle(`${themeItem} > div`, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: space[2],
})

export const checkIcon = sprinkles({
  width: '4',
  height: '4',
  display: 'block',
  color: 'green',
})
