import * as React from 'react'
import styled from 'styled-components'

import { Portal } from '../..'

import { BackdropSurface } from '../../atoms/BackdropSurface'
import { tokens } from '@/src/tokens'

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: ${tokens.space.full};
  width: ${tokens.space.full};
`

type Props = {
  children: React.ReactNode
  surface?: React.ElementType
  onDismiss?: () => void
  open: boolean
}

export const Backdrop = ({ children, surface, onDismiss, open }: Props) => {
  const boxRef = React.useRef<HTMLDivElement | null>(null)
  const Background = surface || BackdropSurface

  const dismissClick = (e: React.MouseEvent<HTMLElement>) =>
    e.target === boxRef.current && onDismiss && onDismiss()

  return open ? (
    <Portal className="modal">
      <Background onClick={dismissClick}>
        <Container ref={boxRef}>{children}</Container>
      </Background>
    </Portal>
  ) : null
}
