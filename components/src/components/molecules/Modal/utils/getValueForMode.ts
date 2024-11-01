import type { Space } from '@/src/tokens'

type Mode = 'mobileTop' | 'mobileBottom' | 'desktop'

type Properties = {
  width: Space
  top: Space
  left: Space
  translate: string
  transform: string
  bottom: Space
}

type Property = keyof Properties

const modeMap: { [key in Mode]: Properties } = {
  mobileBottom: {
    width: 'full',
    top: 'unset',
    left: '0',
    translate: 'unset',
    transform: 'translateY(128px)',
    bottom: '0',
  },
  mobileTop: {
    width: 'full',
    top: '0',
    left: '0',
    transform: 'translateY(-128px)',
    translate: 'unset',
    bottom: 'unset',
  },
  desktop: {
    width: 'min',
    top: '1/2',
    left: '1/2',
    transform: 'translateY(128px)',
    translate: '-50% -50%',
    bottom: 'unset',
  },
}
export const getValueForMode = <P extends Property>(mode: Mode, property: P) => {
  return modeMap[mode]?.[property] || modeMap.desktop[property]
}
