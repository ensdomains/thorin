import type { Size } from '../Profile'

type Properties = {
  height: string
  padding: string
  width: string
  maxWidth: string
  paddingRight: string
}

type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  small: {
    height: '$10',
    padding: '$0',
    width: '$10',
    maxWidth: '',
    paddingRight: '',
  },
  medium: {
    height: '$12',
    padding: '$1',
    width: '$45',
    maxWidth: '$45',
    paddingRight: '$4',
  },
  large: {
    height: '$14',
    padding: '$1',
    width: 'fit-content',
    maxWidth: '$80',
    paddingRight: '$5',
  },
}

export const getValueForSize = (size: Size, property: Property) => {
  return sizeMap[size]?.[property] || sizeMap.small[property]
}
