import * as React from 'react'

import type { TransitionState } from 'react-transition-state'

import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getValueForMode } from './utils/getValueForMode'
import { Backdrop } from '../Backdrop/Backdrop'
import { clsx } from 'clsx'
import * as styles from './styles.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type ContainerProps = {
  $state: TransitionState['status']
  $alignTop?: boolean
  $mobileOnly: boolean
}

const Container: React.FC<BoxProps & ContainerProps> = ({
  $state,
  $alignTop,
  $mobileOnly,
  className,
  style,
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
      opacity={entered ? '1' : '0'}
      position="fixed"
      top={{
        base: getValueForMode(mobileMode, 'top'),
        sm: getValueForMode(desktopMode, 'top'),
      }}

      transitionDuration={300}
      transitionProperty="all"
      transitionTimingFunction="popIn"
      width={{
        base: getValueForMode(mobileMode, 'width'),
        sm: getValueForMode(desktopMode, 'width'),
      }}
      zIndex={9999}
      className={clsx(styles.container, className)}
      style={{
        ...style, ...assignInlineVars({
          [styles.transformBase]: entered
            ? 'translateY(0px)'
            : getValueForMode(mobileMode, 'transform'),
          [styles.translateBase]: getValueForMode(mobileMode, 'translate'),
          [styles.transformSm]: entered
            ? 'translateY(0px)'
            : getValueForMode(desktopMode, 'transform'),
          [styles.translateSm]: getValueForMode(desktopMode, 'translate'),
        }),
      }}
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
} & Omit<NativeDivProps, 'color'>

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
