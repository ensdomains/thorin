import * as React from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Textarea } from './Textarea'

describe('<Textarea />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Textarea label="Why are you entering $WRITE Race?" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('receives user input', () => {
    render(<Textarea label="Why are you entering $WRITE Race?" />)

    userEvent.type(screen.getByRole('textbox'), 'I love writing and crypto.')
    expect(screen.getByRole('textbox')).toHaveValue(
      'I love writing and crypto.',
    )
  })

  it('respects the maxLength parameter', () => {
    render(
      <Textarea label="Why are you entering $WRITE Race?" maxLength={14} />,
    )

    const element = screen.getByLabelText(/why/i)
    userEvent.type(element, 'I love writing and crypto.')
    expect(element).toHaveValue('I love writing')
  })

  it('does not allow typing when disabled', () => {
    render(
      <Textarea
        disabled
        label="Why are you entering $WRITE Race?"
        maxLength={14}
      />,
    )

    const element = screen.getByLabelText(/why/i)
    userEvent.type(element, 'I love writing and crypto.')
    expect(element).toHaveValue('')
  })

  it('shows error message', () => {
    render(<Textarea error="error" label="Why are you entering $WRITE Race?" />)

    expect(screen.getByText('error')).toBeInTheDocument()
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(<Textarea label="Why are you entering $WRITE Race?" ref={ref} />)
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })
  })
})
