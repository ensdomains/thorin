import * as React from 'react'

import { Skeleton, SkeletonGroup } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

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
