import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Skeleton } from '../../atoms'
import { SkeletonGroup } from './SkeletonGroup'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <SkeletonGroup loading>
        <Skeleton>_</Skeleton>
      </SkeletonGroup>
    ),
  },
]
