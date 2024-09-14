import type { Space } from '@/src/tokens'
import type { Size } from '../Input'
import type { FontSize } from '@/src/tokens/typography'
import type { Sprinkles } from '@/src/css/sprinkles.css'

type Properties = {
  height: Space
  outerPadding: Space
  innerPadding: Space
  gap: Space
  icon: Space
  iconPadding: Space
  labelFontSize: FontSize
  borderRadius: Sprinkles['borderRadius']
}

type Property = keyof Properties

const inputMaps: { [key in Size]: Properties } = {
  small: {
    outerPadding: '3.5',
    innerPadding: '1.75',
    gap: '2',
    icon: '3',
    iconPadding: '8.5',
    height: '10',
    labelFontSize: 'small',
    borderRadius: 'large',
  },
  medium: {
    outerPadding: '4',
    innerPadding: '2',
    gap: '2',
    icon: '4',
    iconPadding: '10',
    height: '12',
    labelFontSize: 'body',
    borderRadius: 'large',
  },
  large: {
    outerPadding: '4',
    innerPadding: '2',
    gap: '2',
    icon: '5',
    iconPadding: '11',
    height: '16',
    labelFontSize: 'large',
    borderRadius: '2.5xLarge',
  },
  extraLarge: {
    outerPadding: '6',
    innerPadding: '3',
    gap: '2',
    icon: '6',
    iconPadding: '14',
    height: '20',
    labelFontSize: 'headingThree',
    borderRadius: '2.5xLarge',
  },
}

export const getValueForSize = <T extends Property>(size: Size, property: T): Properties[T] => {
  return inputMaps[size]?.[property] || inputMaps.medium[property]
}
