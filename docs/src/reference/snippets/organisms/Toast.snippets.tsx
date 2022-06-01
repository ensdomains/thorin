import * as React from 'react'
import { Toast } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Toast open title="toast" onClose={() => void 0} />,
  },
]
