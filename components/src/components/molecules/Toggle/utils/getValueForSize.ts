import { commonVars } from '@/src/css/theme.css'

import type { Size } from '../Toggle'

type Properties = {
  width: string
  height: string
  knobSize: keyof typeof commonVars.space
  translateX: keyof typeof commonVars.space
}

type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  small: {
    width: '$12',
    height: '$7',
    knobSize: '5',
    translateX: '2.5',
  },
  medium: {
    width: '$12',
    height: '$8',
    knobSize: '6',
    translateX: '2',
  },
  large: {
    width: '$16',
    height: '$10',
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
