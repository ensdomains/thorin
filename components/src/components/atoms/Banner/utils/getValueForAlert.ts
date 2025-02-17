import type { Color } from '@/src/tokens/color'
import type { Alert } from '@/src/types'

type Properties = {
  background: Color
  border: Color
  hover: Color
  icon: Color
  svg: Color
  actionIcon: Color
  actionSvg: Color
  actionIconHover: Color
  actionSvgHover: Color
}

type Property = keyof Properties

export type WithAlert = { alert?: Alert }

const alertMap: { [key in Alert]: Properties } = {
  error: {
    background: 'redSurface',
    border: 'redPrimary',
    hover: 'redLight',
    icon: 'redPrimary',
    svg: 'textAccent',
    actionIcon: 'backgroundPrimary',
    actionSvg: 'redPrimary',
    actionIconHover: 'redLight',
    actionSvgHover: 'redDim',
  },
  warning: {
    background: 'yellowSurface',
    hover: 'yellowLight',
    border: 'yellowPrimary',
    icon: 'yellowPrimary',
    svg: 'textAccent',
    actionIcon: 'backgroundPrimary',
    actionSvg: 'yellowPrimary',
    actionIconHover: 'yellowLight',
    actionSvgHover: 'yellowDim',
  },
  info: {
    background: 'backgroundPrimary',
    hover: 'greySurface',
    border: 'border',
    icon: 'transparent' as Color,
    svg: 'text',
    actionIcon: 'accentSurface',
    actionSvg: 'accentPrimary',
    actionIconHover: 'accentLight',
    actionSvgHover: 'accentDim',
  },
} as const

export const getValueForAlert = <T extends Property>(
  alert: Alert,
  property: Property,
): Properties[T] => {
  return alertMap[alert][property] || alertMap.info[property]
}
