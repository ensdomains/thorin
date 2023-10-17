import type { Size } from '../PageButtons'

type Properties = {
  fontSize: string
  lineHeight: string
  borderRadius: string
  minWidth: string
  height: string
}

type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  small: {
    fontSize: '$small',
    lineHeight: '$small',
    borderRadius: '$large',
    minWidth: '$9',
    height: '$9',
  },
  medium: {
    fontSize: '$body',
    lineHeight: '$body',
    borderRadius: '$extraLarge',
    minWidth: '$10',
    height: '$10',
  },
}

export const getValueForSize = <T extends Property>(
  size: Size,
  property: T,
): Properties[T] => {
  return sizeMap[size]?.[property] || sizeMap.medium[property]
}
