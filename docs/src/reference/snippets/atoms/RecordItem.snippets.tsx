import * as React from 'react'
import { RecordItem } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <RecordItem keyLabel="Key" value="True value">
        Display value
      </RecordItem>
    ),
  },
]
