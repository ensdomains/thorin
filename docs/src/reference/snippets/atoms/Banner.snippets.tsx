import * as React from 'react'
import { Banner } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Banner title="Banner">Message</Banner>,
  },
]
