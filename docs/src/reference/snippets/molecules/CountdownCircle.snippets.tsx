import * as React from 'react'

import { CountdownCircle } from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <CountdownCircle countdownAmount={30} />,
  },
]
