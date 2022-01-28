import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { RadioButton } from './RadioButton'
import { Card, FieldSet } from '../..'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Card padding="4" shadow>
        <FieldSet legend="Radio Buttons">
          <RadioButton label="Label" name="RadioButtonGroup" value="10" />
          <RadioButton label="Label" name="RadioButtonGroup" value="10" />
          <RadioButton label="Label" name="RadioButtonGroup" value="10" />
        </FieldSet>
      </Card>
    ),
  },
]
