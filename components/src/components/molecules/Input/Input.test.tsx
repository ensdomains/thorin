import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Input } from './Input'
import { lightTheme } from '@/src/tokens'

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

  it('receives user input', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Display Name" />
      </ThemeProvider>,
    )

    userEvent.type(screen.getByRole('textbox'), 'Satoshi Nakamoto')
    expect(screen.getByRole('textbox')).toHaveValue('Satoshi Nakamoto')
  })

  describe('[type=text]', () => {
    it('maxLength', () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <Input label="Short Name" maxLength={7} />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/short/i)
      userEvent.type(element, 'Satoshi Nakamoto')
      expect(element).toHaveValue('Satoshi')
    })
  })

  describe('[type=number]', () => {
    it('filters invalid characters', () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <Input label="Funding Goal" type="number" />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/funding/i)
      userEvent.type(element, 'Ee+')
      expect(element).toHaveValue(null)
    })

    it('max', () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <Input label="Funding Goal" max={20} type="number" />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/funding/i)
      expect(element).toHaveValue(null)
    })

    it('units', () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <Input
            label="Funding Goal"
            placeholder="10"
            type="number"
            units="ETH"
          />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/funding/i) as HTMLInputElement
      expect(element.placeholder).toEqual('10 ETH')
      userEvent.type(element, '20')
      expect(element).toHaveValue(20)
      expect(screen.getByTestId('ghost')).toBeInTheDocument()
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <ThemeProvider theme={lightTheme}>
        <Input
          label="Funding Goal"
          placeholder="10"
          ref={ref}
          type="number"
          units="ETH"
        />
      </ThemeProvider>,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
