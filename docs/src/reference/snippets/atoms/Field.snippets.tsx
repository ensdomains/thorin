import * as React from 'react'

import { Field } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

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
