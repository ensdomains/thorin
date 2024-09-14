import type { Size } from '../CurrencyToggle'

type Properties = {
  width: string
  height: string
  borderRadius: string
}

type Property = keyof Properties

const checkBoxValues: { [key in Size]: Properties } = {
  extraSmall: {
    width: '$22.5',
    height: '$7',
    borderRadius: 'full',
  },
  small: {
    width: '$26',
    height: '10',
    borderRadius: '$large',
  },
  medium: {
    width: '$32',
    height: '12',
    borderRadius: '$large',
  },
}

export const getValueForCheckbox = (size: Size, property: Property) => {
  return checkBoxValues[size]?.[property] || checkBoxValues.extraSmall[property]
}
