import type { Alert } from '@/src/types'

type Properties = {
  background: string
  border: string
  svg: string
}

type Property = keyof Properties

export type WithAlert = { alert?: Alert }

const alertMap: { [key in Alert]: Properties } = {
  error: {
    background: '$redSurface',
    border: '$redPrimary',
    svg: '$redPrimary',
  },
  warning: {
    background: '$yellowSurface',
    border: '$yellowPrimary',
    svg: '$yellowPrimary',
  },
  info: {
    background: '$blueSurface',
    border: '$bluePrimary',
    svg: '$bluePrimary',
  },
}

export const getValueForAlert = <T extends Property>(
  alert: Alert,
  property: Property,
): Properties[T] => {
  return alertMap[alert][property] || alertMap.info[property]
}
