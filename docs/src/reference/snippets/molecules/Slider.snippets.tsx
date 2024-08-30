import * as React from 'react'
import { Slider } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Slider label="slider" />,
  },
]
