import type { Alert } from '@/src/types'

type Properties = {
  background: string
  border: string
  hover: string
  icon: string
  svg: string
  actionIcon: string
  actionSvg: string
  actionIconHover: string
  actionSvgHover: string
}

type Property = keyof Properties

export type WithAlert = { alert?: Alert }

const alertMap: { [key in Alert]: Properties } = {
  error: {
    background: '$redSurface',
    border: '$redPrimary',
    hover: '$redLight',
    icon: '$redPrimary',
    svg: '$textAccent',
    actionIcon: '$backgroundPrimary',
    actionSvg: '$redPrimary',
    actionIconHover: '$redLight',
    actionSvgHover: '$redDim',
  },
  warning: {
    background: '$yellowSurface',
    hover: '$yellowLight',
    border: '$yellowPrimary',
    icon: '$yellowPrimary',
    svg: '$textAccent',
    actionIcon: '$backgroundPrimary',
    actionSvg: '$yellowPrimary',
    actionIconHover: '$yellowLight',
    actionSvgHover: '$yellowDim',
  },
  info: {
    background: '$backgroundPrimary',
    hover: '$greySurface',
    border: '$border',
    icon: 'transparent',
    svg: '$text',
    actionIcon: '$accentSurface',
    actionSvg: '$accentPrimary',
    actionIconHover: '$accentLight',
    actionSvgHover: '$accentDim',
  },
}

export const getValueForAlert = <T extends Property>(
  alert: Alert,
  property: Property,
): Properties[T] => {
  return alertMap[alert][property] || alertMap.info[property]
}
