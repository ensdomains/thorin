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
    const { style, dataset } = document.body
    const currBackdrops = () => parseInt(dataset.backdrops || '0')
    const modifyBackdrops = (modifier: number) =>
      (dataset.backdrops = String(currBackdrops() + modifier))
    const setStyles = (w: string, p: string, t: string) => {
      style.width = w
      style.position = p
      style.top = t
    }

    toggle(open || false)
    if (typeof window !== 'undefined') {
      if (open) {
        if (currBackdrops() === 0) {
          setStyles(
            `${document.body.clientWidth}px`,
            'fixed',
            `-${window.scrollY}px`,
          )
        }
        modifyBackdrops(1)
        return () => {
          if (currBackdrops() === 1) {
            setStyles('', '', '')
          }
          modifyBackdrops(-1)
          window.scroll({ top: parseFloat(style.top || '0') * -1 })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
    }
  }, [])

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
