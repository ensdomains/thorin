import * as React from 'react'

import { Box, BoxProps } from '../Box/Box'

export const VisuallyHidden = (props: BoxProps) => (
  <Box
    as="div"
    borderWidth="$0"
    height="$px"
    margin="$-px"
    overflow="hidden"
    padding="$0"
    position="absolute"
    whiteSpace="nowrap"
    width="$px"
    {...props}
  />
)

VisuallyHidden.displayName = 'VisuallyHidden'
