import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Textarea } from './Textarea'

describe('<Textarea />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Textarea label="Why are you entering $WRITE Race?" />
      </ThemeProvider>,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('receives user input', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Textarea label="Why are you entering $WRITE Race?" />
      </ThemeProvider>,
    )

    userEvent.type(screen.getByRole('textbox'), 'I love writing and crypto.')
    expect(screen.getByRole('textbox')).toHaveValue(
      'I love writing and crypto.',
    )
  })

  it('respects the maxLength parameter', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Textarea label="Why are you entering $WRITE Race?" maxLength={14} />
      </ThemeProvider>,
    )

    const element = screen.getByLabelText(/why/i)
    userEvent.type(element, 'I love writing and crypto.')
    expect(element).toHaveValue('I love writing')
  })

  it('does not allow typing when disabled', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Textarea
          disabled
          label="Why are you entering $WRITE Race?"
          maxLength={14}
        />
      </ThemeProvider>,
    )

    const element = screen.getByLabelText(/why/i)
    userEvent.type(element, 'I love writing and crypto.')
    expect(element).toHaveValue('')
  })

  it('shows error message', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Textarea error="error" label="Why are you entering $WRITE Race?" />
      </ThemeProvider>,
    )

    expect(screen.getByText('error')).toBeInTheDocument()
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <ThemeProvider theme={lightTheme}>
        <Textarea label="Why are you entering $WRITE Race?" ref={ref} />
      </ThemeProvider>,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })
  })
})
