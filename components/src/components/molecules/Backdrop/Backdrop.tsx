import * as React from 'react'

import { Box, Portal } from '../..'

import { BackdropSurface } from '../../atoms/BackdropSurface'

type Props = {
  children: React.ReactNode
  surface?: React.ElementType
  allowDismiss?: boolean
  onDismiss?: () => void
}

export const Backdrop = ({
  children,
  surface,
  allowDismiss,
  onDismiss,
}: Props) => {
  const Background = surface || BackdropSurface

  const dismissClick = () => allowDismiss && onDismiss && onDismiss()

  return (
    <Portal className="modal">
      <Background onClick={dismissClick}>
        <Box
          alignItems="center"
          display="flex"
          height="full"
          justifyContent="center"
          width="full"
        >
          {children}
        </Box>
      </Background>
    </Portal>
  )
}
