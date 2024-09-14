import type { Sprinkles } from '@/src/css/sprinkles.css'
import type { Size } from '../CurrencyToggle'
import type { Space } from '@/src/tokens'

type Properties = {
  width: Space
  height: Space
  borderRadius: Sprinkles['borderRadius']
}

type Property = keyof Properties

const checkBoxValues: { [key in Size]: Properties } = {
  extraSmall: {
    width: '22.5',
    height: '7',
    borderRadius: 'full',
  },
  small: {
    width: '26',
    height: '10',
    borderRadius: 'large',
  },
  medium: {
    width: '32',
    height: '12',
    borderRadius: 'large',
  },
}

export const getValueForCheckbox = <T extends Property>(size: Size, property: Property): Properties[T] => {
  return (checkBoxValues[size][property] || checkBoxValues.extraSmall[property]) as Properties[T]
}
