import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { DropdownButton } from './DropdownButton'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <DropdownButton
        dropdownItems={[
          { label: 'Dashboard', onClick: () => null },
          { label: 'Disconnect', onClick: () => null, color: 'red' },
        ]}
      >
        Open Menu
      </DropdownButton>
    ),
  },
]
