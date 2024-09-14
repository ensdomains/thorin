import type { TransitionState } from 'react-transition-state'

import type { Sprinkles } from '@/src/css/sprinkles.css'

import type { Direction } from '../Select'

type Properties = {
  zIndex: string
  visibility: Sprinkles['visibility']
  top: string
  bottom: string
  opacity: '0' | '1'
}

type Property = keyof Properties

const transitionMap: {
  [key in TransitionState['status']]?: { [key in Direction]: Properties }
} & { default: { [key in Direction]: Properties } } = {
  entered: {
    up: {
      zIndex: '20',
      visibility: 'visible',
      top: 'auto',
      bottom: 'calc(100% + 0.5rem)',
      opacity: '1',
    },
    down: {
      zIndex: '20',
      visibility: 'visible',
      top: 'calc(100% + 0.5rem)',
      bottom: 'auto',
      opacity: '1',
    },
  },
  default: {
    up: {
      zIndex: '1',
      visibility: 'hidden',
      top: 'auto',
      bottom: 'calc(100% - 3rem)',
      opacity: '0',
    },
    down: {
      zIndex: '1',
      visibility: 'hidden',
      top: 'calc(100% - 3rem)',
      bottom: 'auto',
      opacity: '0',
    },
  },
}

export const getValueForTransitionState = <T extends Property>(
  state: TransitionState['status'] | 'default',
  property: T,
  direction: Direction,
): Properties[T] => {
  return (
    transitionMap[state]?.[direction]?.[property]
    || transitionMap.default.down[property]
  )
}
