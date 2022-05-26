import * as React from 'react'
import styled, { css } from 'styled-components'

import type { TransitionState } from 'react-transition-state'

import { Backdrop } from '../..'
import { largerThan } from '@/src/utils/responsiveHelpers'

const Container = styled.div<{ $state: TransitionState }>`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  width: 100%;
  ${largerThan.sm`
    align-self: center;
    width: initial;
  `}

  ${({ theme }) => css`
    transition: ${theme.transitionDuration['300']} all
      ${theme.transitionTimingFunction.popIn};
  `}

  ${({ $state }) =>
    $state === 'entered'
      ? css`
          opacity: 1;
          transform: translateY(0px);
        `
      : css`
          opacity: 0;
          transform: translateY(128px);
        `}
`

type Props = {
  children: React.ReactNode
  /** An element providing styling for the backdrop component. Defaults to the BackdropSurface component. */
  backdropSurface?: React.ElementType
  /** A handler for click events in the background. */
  onDismiss?: () => void
  /** If true, the modal is visible. */
  open: boolean
}

export const Modal = ({
  children,
  backdropSurface,
  onDismiss,
  open,
}: Props) => (
  <Backdrop {...{ open, onDismiss, surface: backdropSurface }}>
    {({ state }) => <Container $state={state}>{children}</Container>}
  </Backdrop>
)

Modal.displayName = 'Modal'
