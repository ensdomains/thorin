import * as React from 'react'

import { Snippet } from '../../../types'
import { FieldSet } from './FieldSet'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <FieldSet legend="Legend">
        <div />
      </FieldSet>
    ),
  },
]
