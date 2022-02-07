import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { CountdownCircle } from './CountdownCircle'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <CountdownCircle countdownAmount={30} />,
  },
]
