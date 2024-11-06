import { commonVars } from '@/src/css/theme.css'

import type { Size } from '../Select'
import type { FontSize, LineHeight } from '@/src/tokens/typography'
import type { Space } from '@/src/tokens'
type Properties = {
  fontSize: FontSize
  lineHeight: LineHeight
  height: Space
  outerPadding: Space
  iconWidth: Space
  rowHeight: Space
  maxHeightFunc: (rows: number) => `calc(${string})`
}

type Property = keyof Properties

const sizeMap: { [key in Size]: Properties } = {
  small: {
    fontSize: 'small',
    lineHeight: 'small',
    height: '10',
    outerPadding: '3.5',
    iconWidth: '3',
    rowHeight: '9',
    maxHeightFunc: (rows: number) => `calc(${rows} * ${commonVars.space['9']})`,
  },
  medium: {
    fontSize: 'body',
    lineHeight: 'body',
    height: '12',
    outerPadding: '4',
    iconWidth: '4',
    rowHeight: '11',
    maxHeightFunc: (rows: number) =>
      `calc(${rows} * ${commonVars.space['11']})`,
  },
}

export const getValueForSize = <T extends Property>(
  size: Size,
  property: T,
): Properties[T] => {
  return sizeMap[size]?.[property] || sizeMap.medium[property]
}
