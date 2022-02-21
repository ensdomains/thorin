import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Modal } from './Modal'
import { Typography } from '../..'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Modal open padding="4">
        <Typography>This is a modal popup.</Typography>
      </Modal>
    ),
  },
]
