import * as React from 'react'

import type { TransitionState } from 'react-transition-state'

import { backdropSurface } from './styles.css'
import { Box, BoxProps } from '../Box'

type Props = { $state: TransitionState; $empty: boolean } & BoxProps

export const BackdropSurface = ({ $empty, $state, ...props }: Props) => (
  <Box
    {...props}
    className={backdropSurface({ entered: !$empty && $state === 'entered' })}
    height="100vh"
    left="$0"
    overflow="hidden"
    position="fixed"
    top="$0"
    transitionDuration="$300"
    transitionProperty="all"
    transitionTimingFunction="$popIn"
    width="100vw"
    zIndex="999"
  />
)

BackdropSurface.displayName = 'BackdropSurface'
