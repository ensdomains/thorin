import * as React from 'react'

import {
  Card,
  FieldSet,
  RadioButton,
  RadioButtonGroup,
} from '@ensdomains/thorin'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Card>
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
