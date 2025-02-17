import * as React from 'react'

import type { TransitionState } from 'react-transition-state'

import { backdropSurface } from './styles.css'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import { clsx } from 'clsx'

export type BackdropSurfaceProps = { $state: TransitionState['status'], $empty: boolean } & BoxProps

export const BackdropSurface = React.forwardRef<HTMLElement, BackdropSurfaceProps>(
  ({ $empty, $state, className, ...props }, ref) => (
    <Box
      className={clsx(className, backdropSurface({
        entered: !$empty && $state === 'entered',
      }))}
      height="viewHeight"
      left="0"
      overflow="hidden"
      position="fixed"
      ref={ref}
      top="0"
      transitionDuration={300}
      transitionProperty="all"
      transitionTimingFunction="popIn"
      width="viewWidth"
      zIndex={9999}
      data-testid="backdrop-surface"
      {...props}
    />
  ),
)

BackdropSurface.displayName = 'BackdropSurface'
