import type { Size } from '../CurrencyToggle'

export const CONTAINER_SIZES: {
  [key in Size]: {
    width: string
    height: string
  }
} = {
  extraSmall: {
    width: '22.5',
    height: '7',
  },
  small: {
    width: '26',
    height: '10',
  },
  medium: {
    width: '32',
    height: '12',
  },
}

export const KNOB_SIZES: {
  [key in Size]: {
    width: string
    height: string
    translateX: string
  }
} = {
  extraSmall: {
    width: '10',
    height: '5.5',
    translateX: '5',
  },
  small: {
    width: '12',
    height: '8',
    translateX: '6',
  },
  medium: {
    width: '15',
    height: '10',
    translateX: '7.5',
  },
}
