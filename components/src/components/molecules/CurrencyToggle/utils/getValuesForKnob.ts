import type { Size } from '../CurrencyToggle'
import { KNOB_SIZES } from './constants'
import type { Space } from '@/src/tokens'

type Property = 'width' | 'height' | 'translateX'

export const getValuesForKnob = (size: Size, property: Property): Space => {
  const value
    = KNOB_SIZES[size]?.[property] || (KNOB_SIZES.small[property])
  if (property === 'translateX')
    return value
  return value
}
