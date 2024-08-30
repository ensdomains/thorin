import * as React from 'react'

import { CountdownCircle } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <CountdownCircle countdownSeconds={30} />,
  },
]
