import * as React from 'react'
import styled, { css } from 'styled-components'

import type { TransitionState } from 'react-transition-state'

import { Backdrop } from '../..'
import { mq } from '@/src/utils/responsiveHelpers'

const Container = styled.div<{ $state: TransitionState }>(
  ({ theme, $state }) => css`
    width: 95%;

    position: fixed;
    left: 2.5%;
    z-index: 9999;
    bottom: ${theme.space['4']};

    display: flex;
    flex-direction: row;

    ${mq.sm.min(css`
      width: min-content;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      bottom: initial;
    `)}

    transition: ${theme.transitionDuration['300']} all
      ${theme.transitionTimingFunction.popIn};

    ${$state === 'entered'
      ? css`
          opacity: 1;
          transform: translateY(0px);
        `
      : css`
          opacity: 0;
          transform: translateY(128px);
        `}
  `,
)

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
