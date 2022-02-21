import * as React from 'react'

import * as styles from './style.css'

import { Backdrop, Box, Card, IconClose } from '../..'
import { Props as CardProps } from '../../atoms/Card/Card'

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
    <Box display="flex" flexDirection="row">
      <Card {...cardProps}>{children}</Card>
      {onDismiss && (
        <Box
          as={IconClose}
          className={styles.closeButton}
          data-testid="close-icon"
          onClick={onDismiss}
        />
      )}
    </Box>
  </Backdrop>
)
