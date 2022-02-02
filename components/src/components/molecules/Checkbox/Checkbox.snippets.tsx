import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Checkbox } from './Checkbox'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Checkbox label="Checkbox" />,
  },
]
