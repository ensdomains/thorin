type Mode = 'mobileTop' | 'mobileBottom' | 'desktop'

type Properties = {
  width: string
  top: string
  left: string
  translate: string
  transform: string
  bottom: string
}

type Property = keyof Properties

const modeMap: { [key in Mode]: Properties } = {
  mobileBottom: {
    width: '$full',
    top: 'unset',
    left: '$0',
    translate: 'unset',
    transform: 'translateY(128px)',
    bottom: '$0',
  },
  mobileTop: {
    width: '$full',
    top: '$0',
    left: '$0',
    transform: 'translateY(-128px)',
    translate: 'unset',
    bottom: 'uset',
  },
  desktop: {
    width: 'min-content',
    top: '50%',
    left: '50%',
    transform: 'translateY(128px)',
    translate: '-50% -50%',
    bottom: 'unset',
  },
}
export const getValueForMode = (mode: Mode, property: Property) => {
  return modeMap[mode]?.[property] || modeMap.desktop[property]
}
