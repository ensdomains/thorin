import React from 'react'

import { Button, DynamicPopover } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Atoms',
    code: (
      <DynamicPopover placement="bottom-start" popover="Popover Content">
        <Button>Button</Button>
      </DynamicPopover>
    ),
  },
]
