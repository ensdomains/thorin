import * as React from 'react'

import { Box, BoxProps } from '../../Box'
import * as styles from './styles.css'

export const BackdropSurface = ({ ...props }: BoxProps) => (
  <Box className={styles.backdrop} {...props} />
)
