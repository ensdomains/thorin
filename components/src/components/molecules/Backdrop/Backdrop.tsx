import * as React from 'react'

import { Box, Portal } from '../..'

import { BackdropSurface } from '../../atoms/BackdropSurface'

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
        <Box
          alignItems="center"
          display="flex"
          height="full"
          justifyContent="center"
          ref={boxRef}
          width="full"
        >
          {children}
        </Box>
      </Background>
    </Portal>
  ) : null
}
