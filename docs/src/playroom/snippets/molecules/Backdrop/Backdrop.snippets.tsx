import * as React from 'react'

import { Backdrop, Card, Typography } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Backdrop open>
        <Card>
          <Typography className="">This is a modal popup</Typography>
        </Card>
      </Backdrop>
    ),
  },
]
