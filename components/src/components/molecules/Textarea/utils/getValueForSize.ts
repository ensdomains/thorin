import type { Size } from '../Textarea'

type Properties = {
  actionSize: string
  iconSize: string
  fontSize: string
  paddingY: string
  paddingX: string
  paddingAction: string
}

type Property = keyof Properties

const sizeMap: { [key in NonNullable<Size>]: Properties } = {
  small: {
    actionSize: '10',
    iconSize: '$3',
    fontSize: 'small',
    paddingX: '3.5',
    paddingY: '2.5',
    paddingAction: '$9',
  },
  medium: {
    actionSize: '12',
    iconSize: '4',
    fontSize: 'body',
    paddingX: '4',
    paddingY: '3.5',
    paddingAction: '10',
  },
}

export const getValueForSize = <T extends Property>(
  size: NonNullable<Size>,
  property: Property,
): Properties[T] => {
  return sizeMap[size]?.[property] || sizeMap.medium[property]
}
