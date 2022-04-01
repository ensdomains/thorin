import * as React from 'react'

import { Checkbox } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Checkbox label="Checkbox" />,
  },
]
