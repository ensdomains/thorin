import type { Size } from '../Button'

type Properties = {
  fontSize: string
  lineHeight: string
  height: string
  px: string
  svgSize: string
}

type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  small: {
    fontSize: '$small',
    lineHeight: '$small',
    height: '$10',
    px: '$3.5',
    svgSize: '$3',
  },
  medium: {
    fontSize: '$body',
    lineHeight: '$body',
    height: '$12',
    px: '$4',
    svgSize: '$4',
  },
  flexible: {
    fontSize: '$body',
    lineHeight: '$body',
    height: 'initial',
    px: '$4',
    svgSize: '$4',
  },
}

export const getValueForSize = <T extends Property>(
  size: Size,
  property: T,
): Properties[T] => {
  return sizeMap[size]?.[property] || sizeMap.medium[property]
}
