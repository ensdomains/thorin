import * as React from 'react'

import { Snippet } from '../../../types'
import { RadioButton } from '..'
import { RadioButtonGroup } from './RadioButtonGroup'
import { Card, FieldSet } from '../..'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Card padding="4" shadow>
        <FieldSet legend="Radio Buttons">
          <RadioButtonGroup>
            <RadioButton label="Label" name="RadioButtonGroup" value="10" />
            <RadioButton label="Label" name="RadioButtonGroup" value="10" />
            <RadioButton label="Label" name="RadioButtonGroup" value="10" />
          </RadioButtonGroup>
        </FieldSet>
      </Card>
    ),
  },
]
