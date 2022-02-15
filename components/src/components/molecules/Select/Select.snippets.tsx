import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Select } from './Select'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Select
        label="Select"
        options={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
          { value: '3', label: 'Three' },
        ]}
      />
    ),
  },
]
