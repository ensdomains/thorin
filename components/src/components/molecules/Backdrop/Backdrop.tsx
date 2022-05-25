import * as React from 'react'
import { TransitionState, useTransition } from 'react-transition-state'
import styled from 'styled-components'

import { Portal } from '../..'

import { BackdropSurface } from '../../atoms/BackdropSurface'

const Container = styled.div`
  ${({ theme }) => `
  align-items: center;
  justify-content: center;
  display: flex;
  height: ${theme.space.full};
  width: ${theme.space.full};
  padding: ${theme.space['2']};
  `}
`

type Props = {
  children: (renderProps: { state: TransitionState }) => React.ReactNode
  /** An element that provides backdrop styling. Defaults to BackdropSurface component. */
  surface?: React.ElementType
  /** A event fired when the background is clicked. */
  onDismiss?: () => void
  /** If true, backdrop and it's children are visible */
  open: boolean
}

export const Backdrop = ({ children, surface, onDismiss, open }: Props) => {
  const [state, toggle] = useTransition({
    timeout: {
      enter: 50,
      exit: 300,
    },
    mountOnEnter: true,
    unmountOnExit: true,
    onChange: (event) => {
      console.log(event)
    },
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
    <Portal className="modal">
      <Background $state={state} onClick={dismissClick}>
        <Container ref={boxRef}>{children({ state })}</Container>
      </Background>
    </Portal>
  ) : null
}

Backdrop.displayName = 'Backdrop'
