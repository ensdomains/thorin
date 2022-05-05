import * as React from 'react'
import styled from 'styled-components'

import { Backdrop, Card } from '../..'
import { Props as CardProps } from '../../atoms/Card/Card'
import { tokens } from '@/src/tokens'
import { CloseSVG } from '@/src/icons'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const IconCloseContainer = styled(CloseSVG)`
  height: ${tokens.space['6']};
  width: ${tokens.space['6']};
  margin-top: -${tokens.space['6']};
  opacity: ${tokens.opacity['30']};
  cursor: pointer;
  padding: ${tokens.space['1.25']};
  transition-propery: all;
  transition-duration: ${tokens.transitionDuration['150']};
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};

  &:hover {
    opacity: 0.5;
  }
`

type Props = {
  children: React.ReactNode
  /** An element providing styling for the backdrop component. Defaults to the BackdropSurface component. */
  backdropSurface?: React.ElementType
  /** A handler for click events in the background. */
  onDismiss?: () => void
  /** If true, the modal is visible. */
  open: boolean
} & CardProps

export const Modal = ({
  children,
  backdropSurface,
  onDismiss,
  open,
  ...cardProps
}: Props) => (
  <Backdrop {...{ open, onDismiss, surface: backdropSurface }}>
    <Container>
      <Card {...cardProps}>{children}</Card>
      {onDismiss && (
        <IconCloseContainer data-testid="close-icon" onClick={onDismiss} />
      )}
    </Container>
  </Backdrop>
)

Modal.displayName = 'Modal'
