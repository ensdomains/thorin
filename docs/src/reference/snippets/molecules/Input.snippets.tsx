import * as React from 'react'

import { Input } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Input label="Label" />,
  },
]
