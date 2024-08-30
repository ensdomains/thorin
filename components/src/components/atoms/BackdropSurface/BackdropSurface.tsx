import * as React from 'react'

import type { TransitionState } from 'react-transition-state'

import { backdropSurface } from './styles.css'
import { Box, BoxProps } from '../Box/Box'

type Props = { $state: TransitionState['status'], $empty: boolean } & BoxProps

export const BackdropSurface = React.forwardRef<HTMLElement, Props>(
  ({ $empty, $state, ...props }, ref) => (
    <Box
      {...props}
      className={backdropSurface({
        entered: !$empty && $state === 'entered',
      })}
      height="100vh"
      left="$0"
      overflow="hidden"
      position="fixed"
      ref={ref}
      top="$0"
      transitionDuration="$300"
      transitionProperty="all"
      transitionTimingFunction="$popIn"
      width="100vw"
      zIndex="999"
    />
  ),
)

BackdropSurface.displayName = 'BackdropSurface'
