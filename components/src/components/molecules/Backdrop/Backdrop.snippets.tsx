import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Backdrop } from './Backdrop'
import { Card, Typography } from '../..'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Backdrop open>
        <Card padding="4">
          <Typography>This is a modal popup</Typography>
        </Card>
      </Backdrop>
    ),
  },
]
