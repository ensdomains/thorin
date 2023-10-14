import type { Size } from '../ThemeToggle'
type Properties = {
  width: string
  height: string
  knobSize: string
}
type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  extraSmall: {
    width: '$12',
    height: '$6.5',
    knobSize: '$5.5',
  },
  small: {
    width: '$20',
    height: '$10',
    knobSize: '$9',
  },
  medium: {
    width: '$24',
    height: '$12',
    knobSize: '$11',
  },
}

export const getValueForSize = <T extends Property>(
  size: Size,
  property: T,
): Properties[T] => {
  return sizeMap[size]?.[property] || sizeMap.small[property]
}
