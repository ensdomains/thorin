import * as React from 'react'

import classNames from 'clsx'

import * as styles from './styles.css'

import { SkeletonGroupContext } from '../../molecules/SkeletonGroup/SkeletonGroup'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'

export type SkeletonProps = {
  /** An alternative element type to render the component as. */
  as?: 'span'
  /** If true, hides the content and shows the skeleton style. */
  loading?: boolean
} & BoxProps

export const Skeleton: React.FC<SkeletonProps> = ({ as, children, loading, ...props }) => {
  const groupLoading = React.useContext(SkeletonGroupContext)
  const active = loading ?? groupLoading

  return (
    <Box
      {...props}
      as={as}
      className={classNames({ [styles.animations]: active })}
    >
      <Box visibility={active ? 'hidden' : 'visible'}>{children}</Box>
    </Box>
  )
}

Skeleton.displayName = 'Skeleton'
