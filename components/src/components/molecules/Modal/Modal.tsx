import * as React from 'react'
import styled from 'styled-components'

import { Backdrop, Card } from '../..'
import { Props as CardProps } from '../../atoms/Card/Card'
import { CloseSVG } from '@/src/icons'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const IconCloseContainer = styled(CloseSVG)`
  ${({ theme }) => `
  height: ${theme.space['6']};
  width: ${theme.space['6']};
  margin-top: -${theme.space['6']};
  opacity: ${theme.opacity['30']};
  cursor: pointer;
  padding: ${theme.space['1.25']};
  transition-propery: all;
  transition-duration: ${theme.transitionDuration['150']};
  transition-timing-function: ${theme.transitionTimingFunction['inOut']};
  `}

  &:hover {
    opacity: 0.5;
  }
`

type Props = {
  children: React.ReactNode
  backdropSurface?: React.ElementType
  onDismiss?: () => void
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
