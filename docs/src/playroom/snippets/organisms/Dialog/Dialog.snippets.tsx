import * as React from 'react'

import { Button, Dialog, Typography } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Dialog
        leading={<Button>Leading</Button>}
        open
        subtitle="Dialog Subtitle"
        title="Dialog Title"
        trailing={<Button>Trailing</Button>}
        onDismiss={() => alert('dismissed')}
      >
        <Typography>Dialog text content.</Typography>
      </Dialog>
    ),
  },
]
