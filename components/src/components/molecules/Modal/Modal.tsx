import * as React from 'react'
import styled from 'styled-components'

import Svg from '@/src/components/atoms/Svg'

import { Backdrop, Card } from '../..'
import { Props as CardProps } from '../../atoms/Card/Card'
import { tokens } from '@/src/tokens'
import { IconCloseSvg } from '@/src/components/atoms/icons/Close.svg'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const IconCloseContainer = styled(Svg)`
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
        <IconCloseContainer
          data-testid="close-icon"
          svg={IconCloseSvg}
          onClick={onDismiss}
        />
      )}
    </Container>
  </Backdrop>
)
