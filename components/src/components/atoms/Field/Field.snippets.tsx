import * as React from 'react'

import { Snippet } from '../../../types'
import { Field } from './Field'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Field label="Label">
        <div />
      </Field>
    ),
  },
]
