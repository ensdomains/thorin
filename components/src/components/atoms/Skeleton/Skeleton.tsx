import * as React from 'react'

import classNames from 'clsx'

import * as styles from './styles.css'

import { Context } from '../../molecules/SkeletonGroup'
import { Box } from '../Box/Box'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  /** An alternative element type to render the component as.*/
  as?: 'span'
  /** If true, hides the content and shows the skeleton style. */
  loading?: boolean
} & NativeDivProps

export const Skeleton = ({ as, children, loading, ...props }: Props) => {
  const groupLoading = React.useContext(Context)
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
