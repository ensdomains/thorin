import { TransitionState } from 'react-transition-state'

const transitionStateValues: {
  [key in TransitionState['status']]: {
    display: string
    visibility: string
    opacity: number
    transitionProperty: string
    pointerEvents: string
    topFunc: (x: number) => string
    leftFunc: (y: number) => string
  }
} = {
  unmounted: {
    display: 'block',
    visibility: 'hidden',
    opacity: 0,
    transitionProperty: 'none',
    pointerEvents: 'none',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
  },
  preEnter: {
    display: 'block',
    visibility: 'visible',
    opacity: 0,
    transitionProperty: 'none',
    pointerEvents: 'none',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
  },
  entering: {
    display: 'block',
    visibility: 'visible',
    opacity: 1,
    transitionProperty: 'all',
    pointerEvents: 'auto',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
  },
  entered: {
    display: 'block',
    visibility: 'visible',
    opacity: 1,
    transitionProperty: 'all',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
    pointerEvents: 'auto',
  },
  preExit: {
    display: 'block',
    visibility: 'visible',
    opacity: 0,
    transitionProperty: 'all',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
    pointerEvents: 'none',
  },
  exiting: {
    display: 'block',
    visibility: 'visible',
    opacity: 0,
    transitionProperty: 'all',
    topFunc: (x: number) => `${x}px`,
    leftFunc: (y: number) => `${y}px`,
    pointerEvents: 'none',
  },
  exited: {
    display: 'block',
    visibility: 'hidden',
    opacity: 0,
    transitionProperty: 'none',
    topFunc: () => `0px`,
    leftFunc: () => `0px`,
    pointerEvents: 'none',
  },
}

type Property = keyof typeof transitionStateValues['unmounted']

export const getValueForTransitionState = (
  state: TransitionState['status'],
  property: Property,
): any => transitionStateValues[state][property]
