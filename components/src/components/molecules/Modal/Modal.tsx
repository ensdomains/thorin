import * as React from 'react'
import styled, { css } from 'styled-components'

import type { TransitionState } from 'react-transition-state'

import { mq } from '@/src/utils/responsiveHelpers'

import { Backdrop } from '../..'

const Container = styled.div<{ $state: TransitionState; $alignTop?: boolean }>(
  ({ theme, $state, $alignTop }) => css`
    width: 100%;

    position: fixed;
    left: 0;
    z-index: 9999;

    ${$alignTop
      ? css`
          top: 0;
        `
      : css`
          bottom: 0;
        `}

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
          transform: translateY(${$alignTop ? '-' : ''}128px);
        `}
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  children: NativeDivProps['children']
  /** An element providing styling for the backdrop component. Defaults to the BackdropSurface component. */
  backdropSurface?: React.ElementType
  /** A handler for click events in the background. */
  onDismiss?: () => void
  /** If true, the modal is visible. */
  open: boolean
  /** Aligns the modal to the top of the page. Only applies to mobile views. */
  alignTop?: boolean
  /** A callback fired on the render of children */
  renderCallback?: () => void
} & NativeDivProps

export const Modal = ({
  children,
  backdropSurface,
  onDismiss,
  open,
  alignTop,
  renderCallback,
  ...props
}: Props) => (
  <Backdrop
    open={open}
    renderCallback={renderCallback}
    surface={backdropSurface}
    onDismiss={onDismiss}
  >
    {({ state }) => (
      <Container $alignTop={alignTop} $state={state} {...props}>
        {children}
      </Container>
    )}
  </Backdrop>
)

Modal.displayName = 'Modal'
