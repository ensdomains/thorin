import * as React from 'react'
import { TransitionState, useTransition } from 'react-transition-state'

import { Portal } from '../..'

import { BackdropSurface } from '../../atoms/BackdropSurface'

type Props = {
  /** A function that renders the children nodes */
  children: (renderProps: { state: TransitionState }) => React.ReactNode
  /** An element that provides backdrop styling. Defaults to BackdropSurface component. */
  surface?: React.ElementType
  /** A event fired when the background is clicked. */
  onDismiss?: () => void
  /** If true, backdrop and it's children are visible */
  open: boolean
  /** If true, removes background */
  noBackground?: boolean
  className?: string
}

export const Backdrop = ({
  children,
  surface,
  onDismiss,
  noBackground = false,
  className = 'modal',
  open,
}: Props) => {
  const [state, toggle] = useTransition({
    timeout: {
      enter: 50,
      exit: 300,
    },
    mountOnEnter: true,
    unmountOnExit: true,
  })
  const boxRef = React.useRef<HTMLDivElement | null>(null)
  const Background = surface || BackdropSurface

  const dismissClick = (e: React.MouseEvent<HTMLElement>) =>
    e.target === boxRef.current && onDismiss && onDismiss()

  React.useEffect(() => {
    toggle(open || false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return state !== 'unmounted' ? (
    <Portal className={className}>
      {onDismiss && (
        <Background
          $empty={noBackground}
          $state={state}
          ref={boxRef}
          onClick={dismissClick}
        />
      )}
      {children({ state })}
    </Portal>
  ) : null
}

Backdrop.displayName = 'Backdrop'
