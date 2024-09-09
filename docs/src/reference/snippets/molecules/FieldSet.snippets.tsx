import * as React from 'react'

import { FieldSet } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

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
