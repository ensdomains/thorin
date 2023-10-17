import * as React from 'react'
import { useState } from 'react'

import { act } from 'react-dom/test-utils'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { FieldSet, RadioButton } from '@/src'

import { Props, RadioButtonGroup } from './RadioButtonGroup'

const RadioButtonGroupWithState = (
  props: Omit<Props, 'onChange' | 'value'>,
) => {
  const [state, setState] = useState<string>('30')
  return (
    <FieldSet
      data-testid="radio-group"
      legend={`Radio Buttons - Current Value: ${state || '30'}`}
    >
      <RadioButtonGroup
        {...{
          ...props,
          value: state,
          onChange: (e) => {
            setState(e.target.value)
          },
        }}
      >
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

  it('should pass focus to checked radio', () => {
    render(<RadioButtonGroupWithState />)
    const group = screen.getByRole('radiogroup')
    expect(group).toBeInTheDocument()
    group.focus()
    waitFor(() => {
      expect(screen.getByLabelText('30')).toHaveFocus()
    })
  })

  it('should fire onBlur when losing focus ', async () => {
    const mockCallback = jest.fn()
    render(
      <>
        <div>outside</div>
        <RadioButtonGroupWithState onBlur={mockCallback} />
      </>,
    )
    const radio = screen.getByLabelText('20')
    const outside = screen.getByText('outside')
    expect(radio).toBeInTheDocument()
    expect(outside).toBeInTheDocument()
    act(() => {
      userEvent.click(radio)
    })
    act(() => {
      userEvent.click(outside)
    })
    waitFor(() => {
      expect(mockCallback.mock.results.length).toBe(1)
    })
  })

  it('should fire onChange when checked value does not match value', () => {
    const mockCallback = jest.fn((e: any) => {
      return e.target.value
    })
    render(
      <RadioButtonGroup onChange={mockCallback}>
        <RadioButton label="10" name="test" value="10" />
        <RadioButton label="20" name="test" value="20" />
        <RadioButton checked label="30" name="test" value="30" />
      </RadioButtonGroup>,
    )
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.results[0].value).toBe('30')
  })

  it('should work with plain radio buttons', () => {
    const PlainJaneRadios = () => {
      const [state, setState] = useState<string>('HTML')
      return (
        <FieldSet
          data-testid="radio-group"
          legend={`Radio Buttons - Current Value: ${state || '30'}`}
        >
          <RadioButtonGroup onChange={(e) => setState(e.target.value)}>
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
