import type { DynamicPopoverSide } from '@/src/components/atoms/DynamicPopover/DynamicPopover'
import type { Space } from '@/src/tokens'
import type { Color } from '@/src/tokens/color'

type Properties = {
  top: Space
  left: Space
  right: Space
  bottom: Space
  margin: Space
  borderTopColorFunction: (color: Color) => Color
  borderRightColorFunction: (color: Color) => Color
  borderBottomColorFunction: (color: Color) => Color
  borderLeftColorFunction: (color: Color) => Color
}

type Property = keyof Properties

const propertyMap: { [key in DynamicPopoverSide]: Properties } = {
  top: {
    top: 'unset',
    left: '0',
    right: '0',
    bottom: '-4.5',
    margin: 'center',
    borderTopColorFunction: (color: Color) => color,
    borderRightColorFunction: () => 'transparent' as Color,
    borderBottomColorFunction: () => 'transparent' as Color,
    borderLeftColorFunction: () => 'transparent' as Color,
  },
  bottom: {
    top: '-4.5',
    left: '0',
    right: '0',
    bottom: 'unset',
    margin: 'center',
    borderTopColorFunction: () => 'transparent' as Color,
    borderRightColorFunction: () => 'transparent' as Color,
    borderBottomColorFunction: (color: Color) => color,
    borderLeftColorFunction: () => 'transparent' as Color,
  },
  left: {
    top: '0',
    left: 'unset',
    right: '-4.5',
    bottom: '0',
    margin: 'center',
    borderTopColorFunction: () => 'transparent' as Color,
    borderRightColorFunction: () => 'transparent' as Color,
    borderBottomColorFunction: () => 'transparent' as Color,
    borderLeftColorFunction: (color: Color) => color,
  },
  right: {
    top: '0',
    left: '-4.5',
    right: 'unset',
    bottom: '0',
    margin: 'center',
    borderTopColorFunction: () => 'transparent' as Color,
    borderRightColorFunction: (color: Color) => color,
    borderBottomColorFunction: () => 'transparent' as Color,
    borderLeftColorFunction: () => 'transparent' as Color,
  },
} as const

export const getValueForPlacement = <T extends Property>(
  placement: DynamicPopoverSide,
  property: T,
): Properties[T] => {
  return propertyMap[placement]?.[property] || propertyMap.top[property]
}
