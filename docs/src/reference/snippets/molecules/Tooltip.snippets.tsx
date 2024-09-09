import * as React from 'react'

import { Button, Tooltip } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Atoms',
    code: (
      <>
        <Tooltip content={<span>Tooltip Content</span>}>
          <Button id="buttonId">Button</Button>
        </Tooltip>
      </>
    ),
  },
]
