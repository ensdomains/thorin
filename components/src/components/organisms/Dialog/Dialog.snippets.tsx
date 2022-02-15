import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Dialog } from './Dialog'
import { Button, Typography } from '../..'

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
