import * as React from 'react'
import { CheckboxRow } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <CheckboxRow label="Label" />,
  },
]
