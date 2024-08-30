import * as React from 'react'

import { Dropdown } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Dropdown
        items={[
          { label: 'Regular Item', onClick: () => null },
          { label: 'Red Item', onClick: () => null, color: 'red' },
        ]}
        label="Dropdown"
      />
    ),
  },
]
