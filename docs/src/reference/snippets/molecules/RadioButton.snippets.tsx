import * as React from 'react'

import { Card, FieldSet, RadioButton } from '@ensdomains/thorin'

import type { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Card>
        <FieldSet legend="Radio Buttons">
          <RadioButton label="Label" name="RadioButtonGroup" value="10" />
          <RadioButton label="Label" name="RadioButtonGroup" value="10" />
          <RadioButton label="Label" name="RadioButtonGroup" value="10" />
        </FieldSet>
      </Card>
    ),
  },
]
