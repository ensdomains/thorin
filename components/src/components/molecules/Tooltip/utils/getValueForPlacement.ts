import type { DynamicPopoverSide } from '@/src/components/atoms/DynamicPopover/DynamicPopover'

type Properties = {
  display: string
  alignItems: string
  top: string
  left: string
  right: string
  bottom: string
  margin: string
  borderTopColorFunction: (color: string) => string
  borderRightColorFunction: (color: string) => string
  borderBottomColorFunction: (color: string) => string
  borderLeftColorFunction: (color: string) => string
}

type Property = keyof Properties

const propertyMap: { [key in DynamicPopoverSide]: Properties } = {
  top: {
    display: '',
    alignItems: '',
    top: 'unset',
    left: '0',
    right: '0',
    bottom: '-18px',
    margin: '0 auto',
    borderTopColorFunction: (color: string) => color,
    borderRightColorFunction: () => 'transparent',
    borderBottomColorFunction: () => 'transparent',
    borderLeftColorFunction: () => 'transparent',
  },
  bottom: {
    display: '',
    alignItems: '',
    top: '-18px',
    left: '0',
    right: '0',
    bottom: 'unset',
    margin: '0 auto',
    borderTopColorFunction: () => 'transparent',
    borderRightColorFunction: () => 'transparent',
    borderBottomColorFunction: (color: string) => color,
    borderLeftColorFunction: () => 'transparent',
  },
  left: {
    display: '',
    alignItems: '',
    top: '0',
    left: 'unset',
    right: '-18px',
    bottom: '0',
    margin: 'auto 0',
    borderTopColorFunction: () => 'transparent',
    borderRightColorFunction: () => 'transparent',
    borderBottomColorFunction: () => 'transparent',
    borderLeftColorFunction: (color: string) => color,
  },
  right: {
    display: '',
    alignItems: '',
    top: '0',
    left: '-18px',
    right: 'unset',
    bottom: '0',
    margin: 'auto 0',
    borderTopColorFunction: () => 'transparent',
    borderRightColorFunction: (color: string) => color,
    borderBottomColorFunction: () => 'transparent',
    borderLeftColorFunction: () => 'transparent',
  },
}

export const getValueForPlacement = <T extends Property>(
  placement: DynamicPopoverSide,
  property: T,
): Properties[T] => {
  return propertyMap[placement]?.[property] || propertyMap.top[property]
}
