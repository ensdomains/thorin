import { scale } from '@/src/css/utils/common'

type Alert = 'error' | 'warning' | 'info'

type Properties = {
  svgTransform: string
  backgroundColor: string
  color: string
}

type Property = keyof Properties

const alertMap: { [key in Alert]: Properties } = {
  info: {
    svgTransform: scale(1),
    backgroundColor: '$backgroundPrimary',
    color: '$text',
  },
  warning: {
    svgTransform: scale(0.5),
    backgroundColor: '$yellowPrimary',
    color: '$backgroundPrimary',
  },
  error: {
    svgTransform: scale(0.5),
    backgroundColor: '$redPrimary',
    color: '$backgroundPrimary',
  },
}

export const getValueForAlert = <T extends Property>(
  alert: Alert,
  property: T,
): Properties[T] => {
  return alertMap[alert][property]
}
