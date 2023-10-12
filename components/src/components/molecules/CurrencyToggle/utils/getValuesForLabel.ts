import { Size } from '../CurrencyToggle'
import { getValuesForKnob } from './getValuesForKnob'

export const getTransform = ($size: Size, $type: 'eth' | 'fiat') => {
  const translateX = getValuesForKnob($size, 'translateX')
  if ($type === 'eth')
    return `translate(-50%,-50%) translateX(calc(${translateX} * -1))`
  return `translate(-50%,-50%) translateX(${translateX})`
}
