import type { commonVars } from '@/src/css/theme.css'

import type { Size } from '../Toggle'

type Properties = {
  knobSize: keyof typeof commonVars.space
  translateX: keyof typeof commonVars.space
}

type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  small: {
    knobSize: '5',
    translateX: '2.5',
  },
  medium: {
    knobSize: '6',
    translateX: '2',
  },
  large: {
    knobSize: '8',
    translateX: '3',
  },
}

export const getValueForSize = <T extends Property>(
  size: Size,
  property: T,
): Properties[T] => {
  return sizeMap[size]?.[property] || sizeMap.medium[property]
}
