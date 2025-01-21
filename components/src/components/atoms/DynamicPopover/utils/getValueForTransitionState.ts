import type { Sprinkles } from '@/src/css/sprinkles.css'
import type { TransitionState } from 'react-transition-state'

type Properties = {
  display: 'block'
  visibility: 'visible' | 'hidden'
  opacity: Sprinkles['opacity']
  transitionProperty: 'none' | 'all'
  pointerEvents: 'none' | 'auto'
  topFunc: (x: number) => `${number}px`
  leftFunc: (y: number) => `${number}px`
}

const transitionStateValues: {
  [key in TransitionState['status']]: Properties
} = {
  unmounted: {
    display: 'block',
    visibility: 'hidden',
    opacity: '0',
    transitionProperty: 'none',
    pointerEvents: 'none',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
  },
  preEnter: {
    display: 'block',
    visibility: 'visible',
    opacity: '0',
    transitionProperty: 'none',
    pointerEvents: 'none',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
  },
  entering: {
    display: 'block',
    visibility: 'visible',
    opacity: '1',
    transitionProperty: 'all',
    pointerEvents: 'auto',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
  },
  entered: {
    display: 'block',
    visibility: 'visible',
    opacity: '1',
    transitionProperty: 'all',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
    pointerEvents: 'auto',
  },
  preExit: {
    display: 'block',
    visibility: 'visible',
    opacity: '0',
    transitionProperty: 'all',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
    pointerEvents: 'none',
  },
  exiting: {
    display: 'block',
    visibility: 'visible',
    opacity: '0',
    transitionProperty: 'all',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
    pointerEvents: 'none',
  },
  exited: {
    display: 'block',
    visibility: 'hidden',
    opacity: '0',
    transitionProperty: 'none',
    topFunc: () => `0px`,
    leftFunc: () => `0px`,
    pointerEvents: 'none',
  },
} as const

type Property = keyof (typeof transitionStateValues)['unmounted']

export const getValueForTransitionState = <T extends Property>(
  state: TransitionState['status'],
  property: T,
): Properties[T] => transitionStateValues[state][property]
