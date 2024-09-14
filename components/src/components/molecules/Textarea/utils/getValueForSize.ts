import type { Space } from '@/src/tokens'
import type { Size } from '../Textarea'
import type { FontSize } from '@/src/tokens/typography'

type Properties = {
  actionSize: Space
  iconSize: Space
  fontSize: FontSize
  paddingY: Space
  paddingX: Space
  paddingAction: Space
}

type Property = keyof Properties

const sizeMap = {
  small: {
    actionSize: '10',
    iconSize: '3',
    fontSize: 'small',
    paddingX: '3.5',
    paddingY: '2.5',
    paddingAction: '9',
  },
  medium: {
    actionSize: '12',
    iconSize: '4',
    fontSize: 'body',
    paddingX: '4',
    paddingY: '3.5',
    paddingAction: '10',
  },
} as const

export const getValueForSize = <T extends Property>(
  size: NonNullable<Size>,
  property: Property,
): Properties[T] => {
  return (sizeMap[size]?.[property] || sizeMap.medium[property]) as Properties[T]
}
