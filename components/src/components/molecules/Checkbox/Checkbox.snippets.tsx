import * as React from 'react'

import { Snippet } from '../../../types'
import { Checkbox } from './Checkbox'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Checkbox label="Checkbox" />,
  },
]
