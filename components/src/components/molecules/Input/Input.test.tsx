import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, fireEvent, render, screen, userEvent, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Input } from './Input'

describe('<Input />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Funding Goal" />
      </ThemeProvider>,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('receives user input', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Display Name" />
      </ThemeProvider>,
    )

    await userEvent.type(screen.getByRole('textbox'), 'Satoshi Nakamoto')
    expect(screen.getByRole('textbox')).toHaveValue('Satoshi Nakamoto')
  })

  describe('[type=text]', () => {
    it('maxLength', async () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <Input label="Short Name" maxLength={7} />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText('Short Name')
      await userEvent.type(element, 'Satoshi Nakamoto')
      expect(element).toHaveValue('Satoshi')
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Funding Goal" placeholder="10" ref={ref} units="ETH" />
      </ThemeProvider>,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  it('should fire onChange if clear button is pressed', async () => {
    const ref = { current: null } as React.RefObject<any>
    const handleOnChange = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Input
          clearable
          label="Funding Goal"
          name="testing"
          placeholder="10"
          ref={ref}
          units="ETH"
          onChange={handleOnChange}
        />
      </ThemeProvider>,
    )
    await userEvent.type(screen.getByRole('textbox'), 'Satoshi Nakamoto')
    fireEvent.click(screen.getByTestId('input-action-button'))
    expect(handleOnChange).toHaveBeenCalled()
  })
})
