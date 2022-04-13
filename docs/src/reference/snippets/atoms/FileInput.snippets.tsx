import * as React from 'react'

import { FileInput } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <FileInput>
        {(context) => (context.name ? <div>{context.name}</div> : <div />)}
      </FileInput>
    ),
  },
]
