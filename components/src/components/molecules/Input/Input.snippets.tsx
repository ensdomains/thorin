import * as React from 'react'

import { Snippet } from '../../../types'
import { Input } from './Input'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Input label="Label" />,
  },
]
