import * as React from 'react'

import { Field } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

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
