import * as React from 'react'

import { Snippet } from '../../../types'
import { Skeleton } from './Skeleton'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Skeleton loading>_</Skeleton>,
  },
]
