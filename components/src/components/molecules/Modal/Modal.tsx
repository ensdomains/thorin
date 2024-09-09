import * as React from 'react'

import type { TransitionState } from 'react-transition-state'

import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getValueForMode } from './utils/getValueForMode'
import { Backdrop } from '../Backdrop/Backdrop'

type ContainerProps = {
  $state: TransitionState['status']
  $alignTop?: boolean
  $mobileOnly: boolean
}

const Container: React.FC<BoxProps & ContainerProps> = ({
  $state,
  $alignTop,
  $mobileOnly,
  ...props
}) => {
  const mobileMode = $alignTop ? 'mobileTop' : 'mobileBottom'
  const desktopMode = $mobileOnly ? mobileMode : 'desktop'
  const entered = $state === 'entered'
  return (
    <Box
      {...props}
      bottom={{
        base: getValueForMode(mobileMode, 'bottom'),
        sm: getValueForMode(desktopMode, 'bottom'),
      }}
      display="flex"
      flexDirection="row"
      left={{
        base: getValueForMode(mobileMode, 'left'),
        sm: getValueForMode(desktopMode, 'left'),
      }}
      opacity={entered ? 1 : 0}
      position="fixed"
      top={{
        base: getValueForMode(mobileMode, 'top'),
        sm: getValueForMode(desktopMode, 'top'),
      }}
      transform={{
        base: entered
          ? 'translateY(0px)'
          : getValueForMode(mobileMode, 'transform'),
        sm: entered
          ? 'translateY(0px)'
          : getValueForMode(desktopMode, 'transform'),
      }}
      transitionDuration={300}
      transitionProperty="all"
      transitionTimingFunction="popIn"
      translate={{
        base: getValueForMode(mobileMode, 'translate'),
        sm: getValueForMode(desktopMode, 'translate'),
      }}
      width={{
        base: getValueForMode(mobileMode, 'width'),
        sm: getValueForMode(desktopMode, 'width'),
      }}
      zIndex={9999}
    />
  )
}

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export type ModalProps = {
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
  /** if true, modal will remain centered to bottom of page */
  mobileOnly?: boolean
} & NativeDivProps

export const Modal = ({
  children,
  backdropSurface,
  onDismiss,
  open,
  alignTop,
  renderCallback,
  mobileOnly = false,
  ...props
}: ModalProps) => (
  <Backdrop
    open={open}
    renderCallback={renderCallback}
    surface={backdropSurface}
    onDismiss={onDismiss}
  >
    {({ state }) => (
      <Container
        $alignTop={alignTop}
        $mobileOnly={mobileOnly}
        $state={state.status}
        {...props}
      >
        {children}
      </Container>
    )}
  </Backdrop>
)

Modal.displayName = 'Modal'
