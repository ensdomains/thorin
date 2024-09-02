import * as React from 'react'

import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'

export const VisuallyHidden: React.FC<BoxProps> = props => (
  <Box
    as="div"
    borderWidth="0"
    height="px"
    margin="-px"
    overflow="hidden"
    padding="0"
    position="absolute"
    whiteSpace="nowrap"
    width="px"
    {...props}
  />
)

VisuallyHidden.displayName = 'VisuallyHidden'
