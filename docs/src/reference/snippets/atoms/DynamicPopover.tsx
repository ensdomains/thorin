import React from 'react'

import { Button, DynamicPopover, TooltipPopover } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Atoms',
    code: (
      <DynamicPopover
        placement="bottom-start"
        popover={<TooltipPopover>Popover Content</TooltipPopover>}
      >
        <Button>Button</Button>
      </DynamicPopover>
    ),
  },
]
