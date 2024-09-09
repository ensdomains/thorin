import * as React from 'react'

import { Avatar } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <div style={{ width: '100px' }}>
        <Avatar
          label="Avatar"
          src="https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png"
        />
      </div>
    ),
  },
]
