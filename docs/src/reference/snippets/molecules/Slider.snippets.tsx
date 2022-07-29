import * as React from 'react'
import { Slider } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Slider label="slider" />,
  },
]
