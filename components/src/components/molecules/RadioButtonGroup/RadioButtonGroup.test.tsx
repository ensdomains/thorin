import * as React from 'react'
import { useState } from 'react'

import { cleanup, render, screen, userEvent } from '@/test'

import { RadioButtonGroup } from './RadioButtonGroup'
import { FieldSet, RadioButton } from '@/src'
// import { RadioButton } from '@/src/components'

const RadioButtonGroupWithState = () => {
  const [state, setState] = useState<boolean>(false)
  return (
    <FieldSet
      data-testid="radio-group"
      legend={`Radio Buttons - Current Value: ${state || '30'}`}
    >
      <RadioButtonGroup onChange={(val) => setState(val)}>
        <RadioButton label="10" name="RadioButtonGroup" value="10" />
        <RadioButton label="20" name="RadioButtonGroup" value="20" />
        <RadioButton checked label="30" name="RadioButtonGroup" value="30" />
      </RadioButtonGroup>
    </FieldSet>
  )
}

describe('<RadioButtonGroup />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<RadioButtonGroupWithState />)
    expect(
      screen.getByText('Radio Buttons - Current Value: 30'),
    ).toBeInTheDocument()
  })

  it('should update which radio button is checked correctly', () => {
    render(<RadioButtonGroupWithState />)
    userEvent.click(screen.getByLabelText('20'))
    expect(screen.getByLabelText('20')).toBeChecked()
  })

  it('should update state correctly', () => {
    render(<RadioButtonGroupWithState />)
    userEvent.click(screen.getByLabelText('20'))
    expect(
      screen.getByText('Radio Buttons - Current Value: 20'),
    ).toBeInTheDocument()
  })

  it('should work with plain radio buttons', () => {
    const PlainJaneRadios = () => {
      const [state, setState] = useState<boolean>(false)
      return (
        <FieldSet
          data-testid="radio-group"
          legend={`Radio Buttons - Current Value: ${state || '30'}`}
        >
          <RadioButtonGroup onChange={(val) => setState(val)}>
            <input id="html" name="fav_language" type="radio" value="HTML" />
            <label htmlFor="html">HTML</label>
            <input id="css" name="fav_language" type="radio" value="CSS" />
            <label htmlFor="css">CSS</label>
            <input
              id="javascript"
              name="fav_language"
              type="radio"
              value="JavaScript"
            />
            <label htmlFor="javascript">JavaScript</label>
          </RadioButtonGroup>
        </FieldSet>
      )
    }

    render(<PlainJaneRadios />)

    userEvent.click(screen.getByLabelText('CSS'))
    expect(
      screen.getByText('Radio Buttons - Current Value: CSS'),
    ).toBeInTheDocument()
  })
})
