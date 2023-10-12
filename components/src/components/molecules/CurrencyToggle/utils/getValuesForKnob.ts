import { commonVars } from '@/src/css/theme.css'

import { Size } from '../CurrencyToggle'
import { KNOB_SIZES } from './constants'

type Property = 'width' | 'height' | 'translateX'

export const getValuesForKnob = (size: Size, property: Property) => {
  const value =
    KNOB_SIZES[size]?.[property] || (KNOB_SIZES.small[property] as any)
  console.log(
    'var',
    value,
    commonVars.space[value as keyof typeof commonVars.space],
  )
  if (property === 'translateX')
    return commonVars.space[value as keyof typeof commonVars.space]
  if (property === 'width' || property === 'height') return `$${value}`
  return ''
}
