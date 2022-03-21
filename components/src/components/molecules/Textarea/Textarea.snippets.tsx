import * as React from 'react'

import { Snippet } from '../../../types'
import { Textarea } from './Textarea'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Textarea label="Label" />,
  },
]
